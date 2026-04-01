# Default Guide for atelier-plan

This is the conservative fallback guide used when the agent cannot be detected from `.vscode/settings.json`. It assumes no agent-specific tools are available.

## Capabilities

- subagents: false
- taskCreate: false
- preserveTaskFiles: false

## Exploration (Phase 3)

Use `Glob`, `Grep`, and `Read` tools directly to explore the codebase. Keep exploration focused on files relevant to the idea being planned.

**What to look for:**
- Similar existing features that could serve as patterns
- Relevant data models, types, or interfaces
- API boundaries and integration points
- Configuration patterns and conventions
- Test patterns used in the project

## Plan Generation (Phase 6)

Generate the plan document directly in the current context. Use the exploration findings from Phase 3 and the user decisions from Phase 5 to write the plan following the template.

## Task Creation (Phase 10)

Write Atelier markdown task files to `taskDir` using the `Write` tool.

**File format:**
```markdown
---
status: planning
plan: {planPath}
todo: {todoPath}
depends_on:
  - {previous task filename if dependent}
---

# {Task Title}

{Description}

## Acceptance Criteria

- [ ] {Criterion 1}
- [ ] {Criterion 2}
```

**File naming:** Tasks are numbered sequentially (`1.md`, `2.md`, etc.). Scan `taskDir` for existing `*.md` files to find the next available number.

**Prerequisites:** The `taskDir` argument must have been provided when the skill was invoked. If `taskDir` was not provided, inform the user: "Task creation requires a taskDir argument. Please re-run with taskDir=<path> or create tasks manually."

## Task Dependencies

Set `depends_on` lists in each task markdown file's frontmatter referencing other task filenames.
