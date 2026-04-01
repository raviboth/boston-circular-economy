---
name: atelier-implement
description: Implementation skill that executes tasks according to their parent plan. Takes a file path (task or TODO) and plan path as arguments and implements the task faithfully following the documented decisions and acceptance criteria.
---

# Atelier Implement Skill

This skill implements tasks by following the documented plan exactly. It reads the plan to understand design decisions and acceptance criteria, then executes the implementation step by step.

## When to Use

Use this skill when:
- A plan has been approved and tasks have been created
- User wants to implement a specific task from the kanban board
- User mentions "implement", "build", or "code" a planned task

## Arguments

- `file` - Path to the item being implemented. May be a task file (`*.json` or `*.md`) or a TODO (`*.md#fragment`)
- `plan_path` - Path to the plan file (e.g., `~/.atelier/projects/{workspaceId}/plans/user-auth.md`)
- `task_dir` - Directory for creating task files (when input is a TODO). Points to Atelier's durable task storage.

## Phase 0: Create Task from TODO

If `file` points to a TODO (a `.md` path with a `#fragment`):

1. Read the TODO.md file at the path before the `#` fragment
2. Find the TODO item matching the fragment (slug after `#`)
3. Extract the TODO's **nested content** — any indented sub-bullets, notes, or description text beneath the TODO item line
4. Create a task markdown file in `task_dir` with YAML frontmatter and body:

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

5. Use the new task file as the working task for the remaining phases

**Determining the next task number:** Scan `task_dir` for existing `.md` files. The new task number is `max(existing numbers) + 1`. If no files exist, start at `1`.

**Example:** TODO with nested content:
```markdown
- [ ] Add dark mode toggle
  - Store theme preference in localStorage
  - Detect system preference on first visit
  - Add toggle to settings page
```

Becomes task file:
```markdown
---
status: in_progress
plan: ~/.atelier/projects/{workspaceId}/plans/dark-mode.md
todo: /path/to/TODO.md#add-dark-mode-toggle
---

# Add Dark Mode Toggle

- Store theme preference in localStorage
- Detect system preference on first visit
- Add toggle to settings page

## Acceptance Criteria

- [ ] Theme preference is persisted to localStorage and restored on reload
- [ ] System color scheme preference is detected on first visit when no saved preference exists
- [ ] Settings page has a toggle control that switches between light and dark themes
```

## Workflow

### Phase 1: Load Context

Read and understand both the plan and task:

**Actions:**
1. Read the plan file at `plan_path`
2. Read the task file (from Phase 0 or `file` argument)
3. Extract from the plan:
   - Design decisions relevant to this task
   - Acceptance criteria for this task
   - Technical considerations
4. Extract from the task:
   - Task scope and description
   - Dependencies (if any)
   - Current status
5. If the task file's frontmatter has `status: planning`, update it to `status: in_progress` using the Edit tool (this moves the kanban card to the In Progress column)

**Use TodoWrite** to create implementation checklist from acceptance criteria:
```
- [ ] [Acceptance criterion 1]
- [ ] [Acceptance criterion 2]
- [ ] [Acceptance criterion 3]
...
```

**If you discover intermediate subtasks** while implementing a criterion, add them to TodoWrite:
```json
[
  { "content": "Create ThemeStore class with save/load methods", "status": "completed", "activeForm": "Creating ThemeStore class" },
  { "content": "Add CSS variable mappings for dark theme", "status": "in_progress", "activeForm": "Adding CSS variable mappings" },
  { "content": "Wire toggle component to ThemeStore", "status": "pending", "activeForm": "Wiring toggle to ThemeStore" },
  { "content": "Detect system color-scheme preference on first visit", "status": "pending", "activeForm": "Detecting system preference" }
]
```

### Phase 2: Verify Prerequisites

Before implementing, verify any dependencies are met:

**Check:**
1. Are there dependent tasks that must complete first?
2. Do required files/modules exist?
3. Is the development environment ready?

**If prerequisites missing:**
- Inform user what's missing
- Ask if they want to proceed anyway or address prerequisites first

### Phase 3: Implement Step by Step

Execute the implementation following the plan exactly:

**For each acceptance criterion:**
1. Understand what needs to be done
2. Identify files to create or modify
3. Write the code following the plan's design decisions
4. Mark the criterion as complete in TodoWrite

**Implementation Principles:**
- Follow the documented design decisions exactly
- Don't deviate from the plan without user approval
- Keep changes focused and minimal
- Write clean, maintainable code
- Add appropriate error handling
- **NEVER modify the task file's Acceptance Criteria section** — only `/atelier-verify` may check off or update acceptance criteria

**As you work:**
- Update TodoWrite after completing each criterion
- Commit logical chunks of work (if appropriate)
- Document any issues or blockers encountered

### Phase 4: Verify Implementation

After implementation, verify the work:

**Self-check:**
1. Review all changes made
2. Ensure each acceptance criterion is addressed
3. Check for obvious bugs or issues
4. Verify code follows project conventions

**If tests exist:**
- Run relevant tests
- Fix any failures

**If tests don't exist but should:**
- Note this for the review phase

### Phase 5: Summarize for User

Present a summary of what was implemented. **Do NOT modify the task file's acceptance criteria or check off any criteria checkboxes** — verification is handled exclusively by `/atelier-verify`.

**Present to user:**
```
Implementation complete for: [Task Name]

Changes made:
- [File 1]: [What was done]
- [File 2]: [What was done]
...

Ready for verification. Run /atelier-verify to verify acceptance criteria.
```

**Update task status:** After implementation is complete, edit the task file directly using the `Edit` tool:
- For Atelier tasks (`.md`): set `status: in_review` in the YAML frontmatter
- For Claude Code tasks (`.json`): set `"status"` to `"completed"`
Do NOT use `TaskUpdate` for status changes — Claude Code may auto-delete completed task files.

## Best Practices

### Follow the Plan
- The plan documents decisions made with the user
- Don't make new design decisions during implementation
- If you encounter a situation the plan doesn't cover, ask the user

### Keep It Simple
- Implement exactly what's needed, nothing more
- Avoid over-engineering or premature optimization
- Don't add features not in the acceptance criteria

### Code Quality
- Follow existing project conventions
- Write self-documenting code
- Add comments only where logic isn't obvious
- Handle errors appropriately

### Progress Updates
- Update TodoWrite frequently
- Communicate blockers early
- Keep the user informed of progress

### Common Workarounds

**NextJS App Creation:**
If you need to create a NextJS app in a directory that already contains files (like TODO.md), create it in a subdirectory first and then copy it back. Otherwise you will get an error about the directory containing conflicting files.

```bash
pnpm create next-app@latest app-name --yes
rsync -a app-name/ .
rm -rf app-name
```

## Example Session

**User invokes:**
```
/atelier-implement file=~/.atelier/projects/.../tasks/myapp/1.md plan_path=~/.atelier/projects/.../plans/dark-mode.md
```

**Skill reads plan, finds design decisions:**
- Theme stored in localStorage
- CSS variables for colors
- System preference detection

**Skill reads task, finds acceptance criteria:**
- [ ] Create ThemeStore class
- [ ] Implement save/load from localStorage
- [ ] Add system preference detection

**Skill creates TodoWrite checklist and implements each criterion...**

**After completion:**
```
Implementation complete for: Theme Store Setup

Changes made:
- src/stores/theme.ts: Created ThemeStore class
- src/utils/system-theme.ts: Added system preference detection

Ready for verification. Run /atelier-verify to verify acceptance criteria.
```

## Tools Used

This skill relies on these Claude Code tools:
- `Read` - Read plan and task files
- `Write` - Create new source files, create Atelier task files from TODOs
- `Edit` - Modify existing files
- `TodoWrite` - Track implementation progress (ephemeral UI state for intermediate tasks)
- `Bash` - Run tests, builds, or other commands
- `Glob` / `Grep` - Find relevant code in the project

## Error Handling

**If plan file not found:**
- Inform user the plan doesn't exist
- Suggest running /atelier-plan first

**If task file not found:**
- Inform user the task doesn't exist
- Check if plan needs to be decomposed into tasks

**If TODO fragment not found:**
- Inform user the TODO item doesn't exist in the file

**If implementation blocked:**
- Clearly describe what's blocking
- Ask user how to proceed
- Document the issue for later resolution
