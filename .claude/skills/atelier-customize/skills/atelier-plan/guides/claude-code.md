# Claude Code Guide for atelier-plan

## Capabilities

- subagents: true (Explore for codebase search, Plan for plan generation)
- taskCreate: true (Phase 10 ONLY — never for progress tracking)
- preserveTaskFiles: false
- agentTeams: check settings.json for CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS

## Progress Tracking

Use `TodoWrite` to track your progress through this skill's phases. Do NOT use `TaskCreate` for progress tracking — that creates persistent cards on the kanban board.

**Base example** — adapt items based on enabled features (e.g., add Agent Teams coordination steps if available):

```
TodoWrite({
  todos: [
    { content: "Detect agent and load guide", status: "in_progress", activeForm: "Detecting agent and loading guide" },
    { content: "Read TODO.md and select item to plan", status: "pending", activeForm: "Reading TODO.md and selecting item" },
    { content: "Explore codebase for relevant patterns", status: "pending", activeForm: "Exploring codebase" },
    { content: "Identify design decisions", status: "pending", activeForm: "Identifying design decisions" },
    { content: "Gather user input on each decision", status: "pending", activeForm: "Gathering user input" },
    { content: "Generate plan document", status: "pending", activeForm: "Generating plan document" },
    { content: "Save plan and update TODO.md", status: "pending", activeForm: "Saving plan and updating TODO.md" },
    { content: "Get user approval and next steps", status: "pending", activeForm: "Getting user approval" },
    { content: "Create implementation tasks (if chosen)", status: "pending", activeForm: "Creating implementation tasks" }
  ]
})
```

Update each item's status to `in_progress` as you begin it and `completed` as you finish.

## Exploration (Phase 3)

### Pre-check: detect greenfield projects

Before launching Explore subagents, run a quick `Glob` to see if there is meaningful source code to explore:

```
Glob(pattern="**/*.{ts,tsx,js,jsx,py,go,rs,java,swift,kt,rb,cs,vue,svelte}", excludePatterns=[".vscode/**", ".atelier/**", "node_modules/**", ".git/**"])
```

**If the glob returns ≤ 5 files** (or only config/scaffold files like `package.json`, `tsconfig.json`, `CLAUDE.md`), this is a greenfield project. Skip subagent exploration and note:

> "This is a greenfield project with no existing source code to explore. Design decisions will be unconstrained by existing patterns."

Proceed directly to Phase 4.

### Full exploration (non-greenfield)

Use the `Agent` tool with `subagent_type="Explore"` to launch 2-3 parallel exploration agents. Each agent should target a specific area of the codebase:

- **Agent 1**: Search for existing features similar to the idea being planned
- **Agent 2**: Explore relevant data models, types, and interfaces
- **Agent 3**: Examine integration points and API boundaries

This preserves context window space by keeping deep code analysis out of the main context. Each agent returns a summary of findings.

**Example:**
```
Agent(subagent_type="Explore", prompt="Search the codebase for existing theme-related code, CSS variable usage, and any dark mode patterns. Report file paths and key findings.")
```

## Plan Generation (Phase 6)

Use the `Agent` tool with `subagent_type="Plan"` to generate the plan document. Provide the Plan subagent with:

- Exploration findings from Phase 3
- All user decisions gathered in Phase 5
- The TODO item description and context
- The plan document template (Overview, Goals, Non-Goals, Design Decisions, Implementation Approach, Acceptance Criteria, Technical Considerations)

The Plan subagent is read-only — it can search code (Glob, Grep, Read) to ground its plan in the actual codebase, but cannot write files. It returns the plan content to the main agent, which saves it in Phase 7.

This keeps the main agent's context clean: it holds exploration summaries and user decisions, while the Plan subagent does the deep synthesis work.

**Example:**
```
Agent(subagent_type="Plan", prompt="Generate a plan document for [feature]. User decisions: [list]. Exploration findings: [summary]. Use the plan template: [template]. Ground the plan in the actual codebase by searching for relevant files.")
```

## Task Creation (Phase 10)

Write Atelier markdown task files to `taskDir` using the `Write` tool. Do NOT use `TaskCreate`/`TaskUpdate` — they create ephemeral JSON that Claude Code auto-deletes.

**File naming:** Tasks are numbered sequentially (`1.md`, `2.md`, etc.). Scan `taskDir` for existing `*.md` files to find the next available number.

**Example:**
```markdown
---
status: planning
plan: {planPath}
todo: {todoPath}
---

# Set Up Theme Store

[Description of what this task involves]

## Acceptance Criteria

- [ ] [criterion 1]
- [ ] [criterion 2]
```

## Task Dependencies

Set `depends_on` lists in each task markdown file's frontmatter referencing other task filenames:
```yaml
depends_on:
  - 1.md
```

## Agent Teams

Agent Teams let you coordinate multiple Claude Code instances working in parallel. Each teammate has its own context window and they communicate via a shared task list and mailbox.

**Detection:** Check `.vscode/settings.json` for:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```
If this env var is set, Agent Teams are available.

**When teams are enabled, adjust task decomposition (Phase 10):**
- Group tasks by independence — tasks that can run in parallel should NOT have dependencies between them
- Mark cross-cutting dependencies explicitly via `blockedBy`
- Aim for 5-6 tasks per anticipated teammate for good throughput
- Ensure each task owns distinct files to avoid edit conflicts

**When teams are enabled, adjust handoff (Phase 11):**
Instead of suggesting `/atelier-implement` for a single task, present:

```
Your plan has been decomposed into [N] tasks, [M] of which can run in parallel.

**Recommended: Use Agent Teams for parallel implementation**
Tell Claude: "Create an agent team to implement these tasks. Spawn [M]
teammates, one per independent task group. Use delegate mode so the lead
coordinates without implementing."

**Alternative: Sequential implementation**
Run: /atelier-implement plan_path={plan-path} task_path={first-task-path}
```

**Key Agent Teams concepts for the handoff:**
- **Delegate mode** (Shift+Tab): keeps the lead in coordination-only role
- **Shared task list**: teammates self-claim unblocked tasks from `~/.claude/tasks/{team-name}/`
- **Plan approval**: you can require teammates to plan before implementing by saying "require plan approval before they make changes"
- Each teammate loads CLAUDE.md, MCP servers, and skills automatically
- Teammates do NOT inherit the lead's conversation history — include context in spawn prompts
