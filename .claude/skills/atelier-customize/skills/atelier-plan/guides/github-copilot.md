# GitHub Copilot Guide for atelier-plan

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

**Tips:**
- Use `Glob` first to discover file structure
- Use `Grep` to search for related patterns, function names, or concepts
- Use `Read` to examine key files identified by glob/grep
- Summarize findings before moving to design decisions

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

## Task Dependencies

Set `depends_on` lists in each task markdown file's frontmatter referencing other task filenames.
