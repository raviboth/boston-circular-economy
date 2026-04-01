---
name: atelier-verify
description: Unified verification skill with three modes — task (evidence-based verification against acceptance criteria), plan (aggregation of task results), and manual (approval without analysis). Creates backing tasks from TODOs when needed.
---

# Atelier Verify Skill

This skill verifies items using one of three modes: task-level evidence-based verification, plan-level aggregation, or manual approval.

## Reference Guides

This skill includes agent-specific guides in the `guides/` subdirectory installed alongside this SKILL.md. These guides contain capability flags and instructions for agent-specific behavior.

**Guide files** (relative to this SKILL.md):
- `guides/claude-code.md` - Claude Code: Explore subagents for parallel evidence gathering

## When to Use

Use this skill when:
- A task implementation is complete and ready for verification (`mode=task`)
- All tasks implementing a plan have been verified (`mode=plan`)
- User wants to mark an item as done without verification (`mode=manual`)

## Arguments

- `mode` — `task` | `plan` | `manual` (determines workflow)
- `file` — Path to the item being verified (may be `TODO.md#fragment`, `task.md`, `task.json`, or `plan.md`)
- `plan_path` — Path to parent plan (task mode)
- `subtasks` — Comma-separated task paths (plan mode)
- `task_dir` — Directory for creating task files (when input is a TODO)
- `task_verification_dir` — Report output directory
- `plan_verification_dir` — Report output directory (plan mode)

## Phase 0: Create Task from TODO (all modes)

If `file` points to a TODO (a `.md` path with a `#fragment`, not a task file):

1. Read the TODO.md file at the path before the `#` fragment
2. Find the TODO item matching the fragment (slug after `#`)
3. Extract the TODO's **nested content** — any indented sub-bullets, notes, or description text beneath the TODO item line
4. Create an Atelier markdown task file in `task_dir` with frontmatter and body:

```markdown
---
status: in_progress
plan: {plan_path}
todo: {todoPath}
---

# {TODO item title}

{Nested content from TODO, if any}

## Acceptance Criteria

- [ ] {Criterion 1 — specific and verifiable}
- [ ] {Criterion 2}
```

   For `mode=manual`, set `status: done` and **skip the `## Acceptance Criteria` section**.
5. Use the new task file as the working task for remaining phases

**Determining the next task number:** Scan `task_dir` for existing `*.md` files. The new task number is `max(existing numbers) + 1`. If no files exist, start at `1`.

## Detect Agent and Load Guide (all modes)

Before starting the mode-specific workflow, detect which agent you're running under and load the appropriate guide.

1. Read `.vscode/settings.json` from the workspace root
2. Find the `atelier.commands.verifyTask` value
3. Match the agent from the command string:
   - Contains `claude` → Read `guides/claude-code.md`
   - Not found / no settings → Use direct tools (no guide needed)
4. Parse the `## Capabilities` section to understand what tools are available
5. Follow the guide's instructions for agent-specific phases throughout the rest of this workflow

## Task Verification Workflow (`mode=task`)

### Phase 1: Load Context

Read and understand the plan and task:

1. Read the plan file at `plan_path`
2. Read the task file (from Phase 0 or `file` argument)
3. Extract acceptance criteria from the plan's "## Acceptance Criteria" section
4. Number criteria for reference (Criterion 1, Criterion 2, etc.)

### Phase 2: Analyze Git Changes

Get uncommitted changes to analyze:

```bash
git diff HEAD
```

- Identify changed files
- For each file, extract added/removed lines with line numbers
- Build a change summary

If no changes found, offer to check recent commits instead.

### Phase 3: Verify Each Criterion

**Follow your agent guide's evidence gathering instructions for this phase.** If your guide specifies using Explore subagents, delegate evidence collection to them. Otherwise, use direct tools as described below.

For each acceptance criterion:

1. **Keyword Extraction** — Extract technical terms from the criterion
2. **Search Changed Files** — Use Grep to find matches in changed files
3. **Semantic Analysis** — Read relevant sections and assess satisfaction
4. **Collect Evidence** — Gather specific `file:line` references
5. **Determine Status**:
   - **Met (✅)** — Strong evidence, all aspects addressed
   - **Partial (⚠️)** — Some evidence, clear gaps
   - **Not Met (❌)** — No evidence or contradictory evidence

### Phase 4: Generate Verification Report

Save report to: `{task_verification_dir}/{task-id}.md`

Report includes frontmatter (`verifies`, `plan`, `verified_at`), summary statistics, changed files list, and per-criterion analysis with evidence and status.

### Phase 5: Update Task File

Update the task JSON's `description` field with an Acceptance Criteria section using markdown task list format. **Each criterion MUST include an inline markdown link to the verification report** — this is how the indexer associates criteria with their report:
- `- [x] Criterion text [report]({task_verification_dir}/{task-id}.md)` — Met
- `- [/] Criterion text [report]({task_verification_dir}/{task-id}.md)` — Partial
- `- [ ] Criterion text [report]({task_verification_dir}/{task-id}.md)` — Not Met

The `[report](path)` link on each line is **required** — without it, the criterion won't be recognized as verified by the indexer.

### Phase 6: Evaluate Completion

- **100% Met**: Offer to mark task as Done
- **90%+ Met**: Note minor gaps, offer to mark as Done
- **Significant gaps**: Task remains in progress, offer to help

**When updating task status:** For `.md` tasks, set `status: done` in YAML frontmatter. For `.json` tasks, edit the file directly using the `Edit` tool to set `"status": "completed"`. Do NOT use `TaskUpdate` — Claude Code may auto-delete completed task files. Update status **before** adding report links to acceptance criteria, so re-indexing picks up the new status.

## Plan Verification Workflow (`mode=plan`)

### Phase 1: Load Plan Context

1. Read the plan file at `file`
2. Extract acceptance criteria
3. Number criteria for reference

### Phase 2: Load Task Results

For each task in `subtasks`:
1. Read the task JSON file
2. Parse the "## Acceptance Criteria" section from `description`
3. Extract checkbox states: `[x]`, `[/]`, `[ ]`

If a task has no AC section, check for a verification report at `{task_verification_dir}/{task-id}.md`.

### Phase 3: Aggregate Results

Apply the weakest-link rule for each plan criterion:
1. **Not Met** — If ANY task has `[ ]`
2. **Partial** — If ANY task has `[/]` and no task has `[ ]`
3. **Met** — If ALL tasks have `[x]`

### Phase 4: Generate Plan Verification Report

Save report to: `{plan_verification_dir}/{plan-id}.md`

Report includes frontmatter, summary, per-task breakdown, per-criterion aggregation with task results, and recommendations.

### Phase 5: Update Plan File

Append or update a "## Verification Status" section in the plan with a criterion status table and link to the full report.

### Phase 6: Evaluate Completion

Same logic as task verification — offer to mark plan as Done if criteria are met. Set `status: done` in the plan's YAML frontmatter (creates frontmatter if absent).

## Manual Approval Workflow (`mode=manual`)

**Do not read the plan file. Do not extract or generate acceptance criteria. Do not analyze code or git changes.** Manual mode is a fast-path: create the report, update the status, done.

1. If `file` is a task file (`.md` or `.json`), skip Phase 0 entirely — go straight to step 3
2. If `file` is a TODO (`*.md#fragment`), run Phase 0 to create a backing task, but **skip the `## Acceptance Criteria` section** — set `status: done` in frontmatter
3. Write the verification report to `{task_verification_dir}/{task-id}.md`
4. Update task status: for `.md` tasks set `status: done` in frontmatter; for `.json` tasks set `"status": "completed"`

**Report template**:
```markdown
---
verifies: [source_path]/[task_file]
verified_at: [ISO timestamp]
---

# Verification Report: [Task Name]

## 👍 Manually Approved

Marked as done by user.
```

**When updating task status:** For `.md` tasks, set `status: done` in YAML frontmatter. For `.json` tasks, edit the file directly using the `Edit` tool to set `"status": "completed"`. Do NOT use `TaskUpdate`.

## Core Principles

### Evidence-Based Verification (task mode)
- Verification is grounded in actual code changes, not assumptions
- Each criterion status is supported by concrete `file:line` references
- Reports use emoji status headings: ✅ (Met), ⚠️ (Partial), ❌ (Not Met)

### Aggregation-Based Verification (plan mode)
- Plan status is derived from task-level verification results
- Uses the "weakest link" principle
- Does not re-analyze code changes

### Task File Updates
- Updates the task's description field with an Acceptance Criteria section
- Uses markdown task list format: `[x]` met, `[/]` partial, `[ ]` not met

## Best Practices

- Reference exact `file:line`, not just filenames
- Show 1-3 lines of code so user can verify interpretation
- When unsure, mark "Partial" and explain uncertainty
- Make recommendations actionable with specific files and patterns
- Handle missing data gracefully — note it and continue

> **Important:** Criteria in verification reports must be top-level H2 headings (`## ✅ ...`), not H3 under a parent section. The `VerificationReportIndexer` only parses H2 headings.

## Tools Used

### Core Tools (all agents)
- `Read` — Read plan, task, and TODO files
- `Write` — Save verification reports, create task files
- `Edit` — Update task/plan file descriptions and status
- `Bash` — Run git commands
- `Grep` — Search for evidence in changed files
- `Glob` — Find relevant files

### Agent-Specific Tools
See your agent guide (loaded during agent detection) for additional tools:
- `Agent` with Explore subagents for parallel evidence gathering (Claude Code)

## Error Handling

- **Plan file not found**: Inform user, cannot verify without acceptance criteria
- **Task file not found**: Inform user, check if correct path was provided
- **No git repository**: Inform user git is required for task verification
- **TODO fragment not found**: Inform user the TODO item doesn't exist in the file
- **No tasks provided** (plan mode): Ask user to provide task paths
