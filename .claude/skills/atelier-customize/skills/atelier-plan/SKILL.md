---
name: atelier-plan
description: Interactive planning skill that creates comprehensive plans from TODO items. Uses AskUserQuestion to verify every design decision, links plans back to TODO.md, and creates implementation tasks. Works across multiple AI coding agents via agent-specific guides.
---

# Atelier Plan Skill

This skill helps you create comprehensive implementation plans by analyzing ideas from TODO.md, asking clarifying questions for each design decision, and generating structured plan documents.

## CRITICAL BEHAVIORAL REQUIREMENTS

**READ THIS FIRST - MANDATORY RULES:**

1. **Do NOT call ExitPlanMode** - This skill manages its own lifecycle. Never call ExitPlanMode at any point.
2. **DO NOT start implementing** - This skill creates PLANS, not code. Never write implementation code. Only plan documents (.md in planDir) and task files (.md in taskDir) should be written.
3. **ALWAYS update TODO.md** - After writing the plan file, you MUST update the TODO.md to link to it BEFORE doing anything else.
4. **ALWAYS ask for approval** - After updating TODO.md, you MUST use AskUserQuestion to ask what the user wants to do next.
5. **Follow phases in order** - Do not skip phases. Each phase has a gate that must be passed.
6. **Load your agent guide first** - Phase 1 detects your agent and loads the appropriate guide. Follow the guide's instructions for agent-specific phases.

## When to Use

Use this skill when:
- User wants to plan an item from their TODO.md
- User has an idea that needs a formal implementation plan
- User mentions needing to "plan", "design", or "spec out" something
- User wants help structuring implementation decisions

## Arguments

- `todo_path` - (REQUIRED) Absolute path to the TODO.md file. This file will be read to find items to plan, and will be updated with a link to the generated plan.
- `planDir` - (REQUIRED) Directory where plan files should be saved (e.g., `~/.atelier/projects/{workspaceId}/plans/`).
- `taskDir` - (OPTIONAL) Directory where task files should be saved. Required for task creation on agents without native TaskCreate (e.g., Cursor, Copilot). When provided, the skill writes Atelier markdown task files directly to this directory.

## Reference Guides

This skill includes agent-specific guides in the `guides/` subdirectory installed alongside this SKILL.md. These guides contain capability flags and instructions for agent-specific behavior.

**Agent guide files** (relative to this SKILL.md):
- `guides/claude-code.md` - Claude Code: subagents, TaskCreate, Agent Teams
- `guides/cursor.md` - Cursor: direct file operations
- `guides/github-copilot.md` - GitHub Copilot: direct file operations
- `guides/openai-codex.md` - OpenAI Codex: direct file operations
- `guides/default.md` - Conservative fallback for unknown agents

**Diagram guide files** (loaded on-demand during Phase 6):
- `guides/diagrams/flowchart.md` - Decision trees, process flows, state machines
- `guides/diagrams/sequence.md` - API interactions, multi-service communication, user-system flows
- `guides/diagrams/entity-relationship.md` - Data models, database schemas, domain modeling
- `guides/diagrams/class.md` - Class hierarchies, interfaces, design patterns

## Workflow

### Phase 1: Detect Agent and Load Guide

Before anything else, detect which agent you're running under and load the appropriate guide.

**Actions:**
1. Read `.vscode/settings.json` from the workspace root
2. Find the `atelier.commands.plan` value
3. Match the agent from the command string:
   - Contains `claude` → Read `guides/claude-code.md`
   - Contains `cursor` → Read `guides/cursor.md`
   - Contains `copilot` → Read `guides/github-copilot.md`
   - Contains `codex` → Read `guides/openai-codex.md`
   - Not found / no settings → Read `guides/default.md`
4. Read the guide file using the `Read` tool
5. Parse the `## Capabilities` section to understand what tools are available
6. Follow the guide's instructions for agent-specific phases throughout the rest of this workflow

**Use TodoWrite** to track your progress through this skill:
```
- [ ] Detect agent and load guide
- [ ] Read TODO.md and select item to plan
- [ ] Explore codebase for relevant patterns
- [ ] Identify design decisions to make
- [ ] Gather user input on each decision
- [ ] Generate plan document
- [ ] Save plan document
- [ ] MANDATORY: Update TODO.md with plan link
- [ ] MANDATORY: Ask user for approval and workflow choice
- [ ] If chosen: Create tasks and hand off
```

### Phase 2: Read and Understand the Idea

Read the TODO.md file and identify the item to plan:

**Actions:**
1. Read the TODO.md file at the provided `todo_path`
2. Parse the markdown to find unchecked items (`- [ ] ...`)
3. If multiple items exist, use `AskUserQuestion` to let user select which to plan
4. Read and understand the selected idea

### Phase 3: Explore the Codebase

Before identifying design decisions, explore the relevant parts of the codebase to understand the current architecture, existing patterns, and constraints.

**Follow your agent guide's "Exploration" instructions for this phase.**

**What to look for:**
- Similar existing features that could serve as patterns
- Relevant data models, types, or interfaces
- API boundaries and integration points
- Configuration patterns and conventions
- Test patterns used in the project

**After exploration, summarize findings:**
"I've explored the codebase and found: [key findings]. These will inform the design decisions we discuss next."

**IMPORTANT:** You are exploring to INFORM the plan, not to START implementing. Do not create or modify any files during this phase.

### Phase 4: Identify Design Decisions

Analyze the idea to identify all key design decisions that need to be made:

**Categories of decisions to consider:**
- **Scope decisions**: What's included vs excluded?
- **Architectural decisions**: How should it be structured?
- **Technology decisions**: What tools/libraries/frameworks?
- **Interface decisions**: How will users interact with it?
- **Data decisions**: What data structures or storage?
- **Integration decisions**: How does it connect to existing code?

**Present to user:**
"I've analyzed your idea for [concept name]. I've identified [N] design decisions we need to make. Let me walk through each one with you."

### Phase 5: Interactive Decision Gathering

For EACH design decision identified, use `AskUserQuestion` to get user input:

**CRITICAL**: Every single design decision must be verified with the user. Do not make assumptions.

**For each decision:**
1. Explain what the decision is about
2. Present 2-4 options with pros/cons
3. Use `AskUserQuestion` to get user's choice
4. Record the decision and rationale

**Example interaction flow:**
```
Decision 1 of 5: Project Structure

This decision determines how we organize the codebase.

[Use AskUserQuestion with options like:]
- Monorepo with packages/
- Single package with src/
- Feature-based folders
```

**After each answer:**
- Update TodoWrite to mark decision as complete
- Record the decision in your running notes
- Move to next decision

### Phase 6: Generate the Plan Document

Once all decisions are gathered, generate a comprehensive plan.

**Follow your agent guide's "Plan Generation" instructions for this phase.** If your guide specifies using a Plan subagent, delegate the plan generation to it. Otherwise, generate the plan directly.

#### 6a: Select Diagrams (before writing the plan)

Before generating the plan document, determine whether one or more mermaid diagrams would clarify the design. Not every plan needs a diagram — only include one when visual structure adds clarity that prose alone cannot.

**Decision table:**

| The plan involves... | Diagram type | Load guide |
|---|---|---|
| Branching logic, multi-step workflows, state transitions | Flowchart | `guides/diagrams/flowchart.md` |
| Request/response flows, multi-service or user-system interactions | Sequence | `guides/diagrams/sequence.md` |
| Data models, schemas, entity relationships | ER Diagram | `guides/diagrams/entity-relationship.md` |
| Class hierarchies, interfaces, design patterns | Class | `guides/diagrams/class.md` |

**Actions:**
1. Review the gathered design decisions and implementation approach
2. If the plan matches one or more rows in the table above, use `Read` to load the corresponding guide(s)
3. Follow the guide's syntax and tips to create the diagram
4. Embed the diagram in the relevant section of the plan (see template below)

**When to skip diagrams:**
- Simple config changes, copy updates, or single-file modifications
- Plans where the implementation approach is a flat list of steps with no branching or relationships

**Multiple diagrams:** A plan may include more than one diagram if it spans multiple concerns (e.g., an ER diagram for the data model AND a sequence diagram for the API flow). Use one diagram per concern — do not combine unrelated structures into a single diagram.

#### 6b: Plan Template

**Plan Template:**

```markdown
# [Project Name]

## Overview

[1-2 paragraph summary of what this implements and the problem it solves]

## Goals

- [Primary goal 1]
- [Primary goal 2]
...

## Non-Goals

- [What this explicitly won't do]
...

## Design Decisions

### [Decision Category 1]

#### [Decision Name]
- **Decision**: [What was chosen]
- **Rationale**: [Why this was selected]
- **Alternatives Considered**: [Other options evaluated]

[Repeat for each decision]

## Implementation Approach

### [Descriptive Section Name]
- [Step 1]
- [Step 2]
...

[Include mermaid diagrams here when they clarify the approach.
Place each diagram in the section it illustrates — e.g., a sequence
diagram in the API section, an ER diagram in the data model section.]

### [Another Section Name]
...

## Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
...

## Technical Considerations

[Any technical notes, constraints, or dependencies]

---
*Generated with atelier-plan skill*
```

### Phase 7: Save the Plan

Save the generated plan:

1. Create filename from project name (kebab-case)
2. Save to `{planDir}/{plan-name}.md`
3. Confirm location to user

---

## STOP GATE 1: You have just written the plan file. DO NOT PROCEED to Phase 9 until Phase 8 is complete.

---

### Phase 8: Update TODO.md (MANDATORY - CANNOT SKIP)

**THIS PHASE IS MANDATORY. YOU MUST COMPLETE THIS BEFORE DOING ANYTHING ELSE.**

The plan is NOT complete until the TODO.md is updated. This creates the traceability link.

**What to do:**
1. Use the `Edit` tool to modify the TODO.md at `todo_path`
2. Find the line with the item you just planned
3. Wrap the item text in a markdown link to the plan file

**Before:**
```markdown
- [ ] Implement user authentication
```

**After:**
```markdown
- [ ] [Implement user authentication]({planDir}/user-authentication.md)
```

**Use the provided `planDir` path** for the link.

**VERIFICATION REQUIRED:**
After calling Edit, confirm the TODO.md was updated successfully. If Edit fails:
1. Tell the user the link could not be added
2. DO NOT proceed to Phase 9
3. Ask the user how to proceed

---

## STOP GATE 2: TODO.md MUST be updated before proceeding. Verify the Edit succeeded.

---

### Phase 9: Get Plan Approval and Choose Workflow (MANDATORY)

**YOU MUST ASK THE USER WHAT TO DO NEXT. DO NOT SKIP THIS PHASE.**

Present the plan summary and use `AskUserQuestion` to let the user choose:

**Use AskUserQuestion with these exact options:**

```json
{
  "questions": [{
    "question": "Your plan is ready. How would you like to proceed?",
    "header": "Next Step",
    "options": [
      {"label": "Create implementation tasks", "description": "Decompose the plan into tasks with dependencies, then hand off to implementation"},
      {"label": "Plan complete (no tasks)", "description": "Keep just the plan document; use atelier-verify-plan for verification later"},
      {"label": "Let me review first", "description": "Pause here so you can review the plan; run /atelier-plan again to continue"},
      {"label": "Make changes", "description": "Revise the plan based on feedback"}
    ],
    "multiSelect": false
  }]
}
```

**WAIT for the user's response before proceeding.**

**Based on user's choice:**
- **"Create implementation tasks"** → Proceed to Phase 10
- **"Plan complete (no tasks)"** → End with message: "Plan saved at {planDir}/{name}.md. Run `/atelier-verify-plan` when ready to verify."
- **"Let me review first"** → End with message: "Plan saved. Review it and run `/atelier-plan` to continue when ready."
- **"Make changes"** → Ask what changes they want and go back to Phase 6

### Phase 10: Decompose into Tasks (ONLY WHEN USER CHOOSES)

**ONLY execute this phase if the user explicitly chose "Create implementation tasks" in Phase 9.**

**Follow your agent guide's "Task Creation" and "Task Dependencies" instructions for this phase.**

**For each implementation section in the plan, create a task with:**
- A clear, descriptive subject (no phase/number prefixes)
- An activeForm in present continuous tense
- A description containing:
  - **First line**: `Implements: {planDir}/{plan-name}.md` to link task back to plan
  - **Context paragraph**: Brief explanation of what the task accomplishes and WHY (reference relevant design decisions from the plan)
  - **Acceptance Criteria**: Use `## Acceptance Criteria` heading with markdown task list (`- [ ]` items). These must be specific and verifiable.

**After creating all tasks, present to user:**
```
Created [N] implementation tasks:

1. [task subject]
2. [task subject] (blocked by #1)
...

These tasks are now visible in the Atelier kanban board.
```

**Then proceed to Phase 11.**

### Phase 11: Hand Off to Implementation (DO NOT IMPLEMENT)

**THIS SKILL DOES NOT IMPLEMENT. IT ONLY CREATES PLANS AND TASKS.**

After creating tasks, present the handoff information and END.

**Follow your agent guide's instructions if it has an "Agent Teams" section** — if Agent Teams are available, present the teams-based handoff option alongside the sequential option.

**Default handoff (no Agent Teams):**
```
Your plan has been decomposed into [N] tasks with dependencies.
These tasks are now visible in the Atelier kanban board.

To start implementing, open the kanban board and click "Implement" on a task.
```

**DO NOT start writing implementation code yourself. The atelier-implement skill handles implementation.**

## Best Practices

### Naming Guidelines

Use clear, descriptive names without prefixes or numbering schemes:

**Plan names:**
- `User Authentication` — clear and descriptive
- `Dark Mode Toggle` — describes the feature

**Task names:**
- `Set up theme store` — action-oriented, clear
- `Add toggle to settings page` — specific and descriptive

**Why this matters:**
- Task dependencies already encode ordering — prefixes are redundant
- Clean names are easier to scan and search
- The kanban board and task views handle sequencing visually

### Conversational Approach
- Ask 1-2 questions at a time to avoid overwhelming the user
- Adapt based on what the user shares
- Validate your understanding by summarizing periodically
- Build understanding incrementally

### Decision Documentation
- Capture the "why" behind every decision
- Document alternatives that were considered
- Be explicit about trade-offs
- Make assumptions explicit

### Efficiency
- If user has already provided comprehensive information, skip redundant questions
- Focus questions on areas with the most uncertainty
- Present the generated plan proactively for review

## Example Session

**User invokes:** `/atelier-plan todo_path=./TODO.md planDir=~/.atelier/projects/myproject/plans/ taskDir=~/.atelier/projects/myproject/tasks/myproject/`

**Phase 1:** Skill reads `.vscode/settings.json`, detects Claude Code, loads `guides/claude-code.md`

**Phase 2:** Skill reads TODO.md, finds:
```
- [ ] Add dark mode toggle to settings
- [ ] Improve search performance
```

**Skill asks:** "Which item would you like to plan?"

**User selects:** "Add dark mode toggle"

**Phase 3:** Skill launches Explore subagents (Claude Code) or searches directly (other agents)

**Phase 4-5:** Skill identifies and asks about design decisions:
1. Theme storage approach
2. Toggle UI placement
3. CSS implementation strategy
4. Default theme behavior

**Phase 6:** Skill generates plan (via Plan subagent on Claude Code, or directly)

**Phase 7-8:** Skill saves plan and updates TODO.md with link

**Phase 9:** Skill asks user to choose workflow

**User chooses "Create implementation tasks":**

**Phase 10-11:** Skill creates tasks and presents handoff

## Tools Used

### Core Tools (all agents)
- `Read` - Read TODO.md, `.vscode/settings.json`, agent guides, explore codebase
- `Write` - Save plan documents to planDir
- `Edit` - Update TODO.md with plan links (MANDATORY in Phase 8)
- `Glob` / `Grep` - Find relevant code patterns during exploration
- `AskUserQuestion` - Get user input on design decisions (MANDATORY in Phase 9)
- `TodoWrite` - Track skill progress only (ephemeral UI state)

### Agent-Specific Tools
See your agent guide (loaded in Phase 1) for additional tools:
- Subagents for exploration and plan generation (Claude Code)
- TaskCreate / TaskUpdate for task management (Claude Code)
- Agent Teams for parallel implementation handoff (Claude Code, when enabled)

**IMPORTANT Distinction:**
- `TodoWrite` = UI progress tracking within current session (ephemeral, not persisted). Use this for any intermediate tasks you need to keep track of during skill execution.
- Task files = Persisted tasks (permanent, supports dependencies). **Only create tasks when the user explicitly chooses "Create implementation tasks" in Phase 9.** Do not create tasks for tracking your own progress.

**TOOLS NOT TO USE:**
- Do NOT write implementation code - this skill creates plans only
- Do NOT call ExitPlanMode - this skill manages its own lifecycle

---

## FINAL CHECKLIST - VERIFY BEFORE ENDING

Before ending this skill, verify you have completed ALL of these:

1. Plan document written to `{planDir}/{name}.md`
2. TODO.md updated with link to plan (Phase 8 - MANDATORY)
3. User asked what they want to do next (Phase 9 - MANDATORY)
4. If user chose tasks: Tasks created per agent guide instructions
5. If user chose tasks: Dependencies set per agent guide instructions
6. If user chose tasks: Handoff message presented (do NOT auto-implement)

**If any of items 1-3 are not complete, GO BACK and complete them before ending.**
