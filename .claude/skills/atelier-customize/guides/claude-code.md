# Claude Code Configuration Guide

## Overview

Claude Code is Anthropic's CLI for Claude. It is the default agent for Atelier and has the deepest integration, including subagents for parallel exploration and Agent Teams.

**Key capabilities:**
- Native `AskUserQuestion` tool for interactive decision-making
- Agent Teams for parallel multi-agent execution
- Skill auto-discovery from `~/.claude/skills`

## Skills Directories

### User-level (Recommended)
```
~/.claude/skills
```
Skills installed here are available across all workspaces. This is the standard Claude Code skills location.

### Project-level
```
.claude/skills
```
Skills installed here are scoped to this repository and can be committed with the code.

## Question Catalog

This section defines every customization question for Claude Code, including the exact `AskUserQuestion` tool call to present it.

---

### Q_AGENT — Agent Detection

**Purpose:** Confirm or select the AI coding agent.

**Detection logic:** Check `atelier.commands.plan` and `atelier.commands.implement` for the string `claude`. If found, auto-detect and confirm. If no command settings exist, ask directly.

**Settings affected:** Determines which guide to load.

#### When auto-detected:

```json
{
  "questions": [{
    "question": "I detected that you're using Claude Code based on your current command settings. Is that correct?",
    "header": "Agent",
    "options": [
      {"label": "Yes, that's correct", "description": "Continue with Claude Code configuration"},
      {"label": "OpenAI Codex", "description": "Switch to OpenAI Codex CLI"},
      {"label": "GitHub Copilot", "description": "Switch to GitHub Copilot CLI"},
      {"label": "Cursor", "description": "Switch to Cursor editor"}
    ],
    "multiSelect": false
  }]
}
```

#### When no settings exist (fresh install):

```json
{
  "questions": [{
    "question": "Which AI coding agent do you use?",
    "header": "Agent",
    "options": [
      {"label": "Claude Code (Recommended)", "description": "Anthropic's Claude Code CLI — deepest Atelier integration"},
      {"label": "OpenAI Codex", "description": "OpenAI's Codex CLI"},
      {"label": "GitHub Copilot", "description": "GitHub Copilot CLI"},
      {"label": "Cursor", "description": "Cursor editor's built-in AI"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_AGENT_FEATURES — Agent Teams

**Purpose:** Enable or disable Agent Teams for parallel multi-agent planning.

**Settings affected:** `atelier.promptTemplates.plan` (adds `teams=true` argument)

**Only shown for Claude Code.** Other agents do not support Agent Teams.

```json
{
  "questions": [{
    "question": "Would you like to enable Agent Teams? This uses multiple Claude instances working in parallel during planning.",
    "header": "Agent Teams",
    "options": [
      {"label": "Yes, enable Agent Teams", "description": "Adds teams=true to the planning prompt for parallel task execution"},
      {"label": "No, single agent", "description": "Keep the standard single-agent workflow"}
    ],
    "multiSelect": false
  }]
}
```

**When enabled**, the plan prompt template becomes:
```
Plan {{title}} using /atelier-plan teams=true todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}
```

**Prerequisites:** Agent Teams requires the environment variable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. See the [Agent Teams](#agent-teams) section below for setup details.

---

### Q_AUTO_ACCEPT_EDITS — Auto-Accept Edits

**Purpose:** Choose whether Claude auto-accepts file edits during plan, implement, and verify commands.

**Settings affected:** `atelier.commands.plan`, `atelier.commands.implement`, `atelier.commands.verifyTask`, `atelier.commands.verifyPlan`, `atelier.commands.verifyManual` (adds `--permission-mode acceptEdits`)

**Only shown for Claude Code.** Other agents do not have a `--permission-mode` flag.

```json
{
  "questions": [{
    "question": "Should Claude automatically accept file edits? This skips the manual approval step for each edit during planning, implementation, and verification.",
    "header": "Auto-Edits",
    "options": [
      {"label": "Yes, auto-accept edits (Recommended)", "description": "Adds --permission-mode acceptEdits to plan, implement, and verify commands — faster workflow, still read-only for non-edit actions"},
      {"label": "No, require approval", "description": "Uses default permissions — Claude will ask before each file edit"}
    ],
    "multiSelect": false
  }]
}
```

**When enabled** (default), commands include `--permission-mode acceptEdits`:
```
claude "{{prompt}}" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate
```

**When disabled**, commands omit the flag:
```
claude "{{prompt}}" --disallowedTools TaskCreate TaskUpdate
```

> `--disallowedTools TaskCreate TaskUpdate` prevents the model from using task management tools. Skills should only use `TodoWrite` for progress tracking — `TaskCreate` creates kanban board cards, which is handled by the plan skill.

---

### Q_MODEL — Model Selection

**Purpose:** Choose which Claude model to use for each action.

**Settings affected:** `atelier.models.plan`, `atelier.models.implement`, `atelier.models.verifyTask`, `atelier.models.verifyPlan`, `atelier.models.verifyManual`

**Only shown for Claude Code.** The `--model` flag accepts aliases (`opus`, `sonnet`) or full model names (`claude-opus-4-6`).

```json
{
  "questions": [{
    "question": "Which Claude model should be used for Atelier commands?",
    "header": "Model",
    "options": [
      {"label": "Opus plan, Sonnet implement, Haiku verify (Recommended)", "description": "Uses opus for planning, sonnet for implementation, haiku for verification"},
      {"label": "Opus for everything", "description": "Uses opus for all commands — most capable model"},
      {"label": "Sonnet for everything", "description": "Uses sonnet for all commands — faster and lower cost"},
      {"label": "Custom", "description": "Choose the model for each action group individually"}
    ],
    "multiSelect": false
  }]
}
```

**Preset → settings mapping:**

| Preset | `models.plan` | `models.implement` | `models.verifyTask` | `models.verifyPlan` | `models.verifyManual` |
|--------|--------------|--------------------|--------------------|--------------------|-----------------------|
| Opus for everything | `opus` | `opus` | `opus` | `opus` | `opus` |
| Sonnet for everything | `sonnet` | `sonnet` | `sonnet` | `sonnet` | `sonnet` |
| Opus plan / Sonnet impl / Haiku verify | `opus` | `sonnet` | `haiku` | `haiku` | `haiku` |

**Custom follow-up** — If "Custom" is chosen, ask 3 grouped questions (plan / implement / verify):

```json
{
  "questions": [{
    "question": "Which model for planning?",
    "header": "Plan Model",
    "options": [
      {"label": "Opus", "description": "Sets atelier.models.plan to opus"},
      {"label": "Sonnet", "description": "Sets atelier.models.plan to sonnet"}
    ],
    "multiSelect": false
  }]
}
```

```json
{
  "questions": [{
    "question": "Which model for implementation?",
    "header": "Impl Model",
    "options": [
      {"label": "Opus", "description": "Sets atelier.models.implement to opus"},
      {"label": "Sonnet", "description": "Sets atelier.models.implement to sonnet"}
    ],
    "multiSelect": false
  }]
}
```

```json
{
  "questions": [{
    "question": "Which model for verification (task, plan, and manual)?",
    "header": "Verify Model",
    "options": [
      {"label": "Opus", "description": "Sets atelier.models.verifyTask/verifyPlan/verifyManual to opus"},
      {"label": "Sonnet", "description": "Sets atelier.models.verifyTask/verifyPlan/verifyManual to sonnet"},
      {"label": "Haiku", "description": "Sets atelier.models.verifyTask/verifyPlan/verifyManual to haiku"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_SKILLS_DIR — Skills Directory

**Purpose:** Choose where Atelier skills are installed.

**Settings affected:** `atelier.skillsDirectory`

```json
{
  "questions": [{
    "question": "Where should Atelier skills be installed?",
    "header": "Skills Dir",
    "options": [
      {"label": "User directory (Recommended)", "description": "~/.claude/skills — available across all workspaces"},
      {"label": "Project directory", "description": ".claude/skills — scoped to this repo, committed with code"},
      {"label": "Custom directory", "description": "Specify a different path"}
    ],
    "multiSelect": false
  }]
}
```

**If "Custom directory" is chosen**, follow up:

```json
{
  "questions": [{
    "question": "Enter the path for your skills directory:",
    "header": "Custom Path",
    "options": [
      {"label": "~/.claude/skills", "description": "Standard Claude Code location"},
      {"label": ".claude/skills", "description": "Project-level directory"}
    ],
    "multiSelect": false
  }]
}
```

The user can type a fully custom path via the "Other" option.

---

### Q_SKILLS_MODE — Built-in vs Custom Skills

**Purpose:** Decide whether to use the bundled Atelier skills or provide custom skill names.

**Settings affected:** Gates the Q_CUSTOM_* questions. If built-in, prompt/command templates use Atelier defaults.

```json
{
  "questions": [{
    "question": "Would you like to use the built-in Atelier skills or configure custom skills?",
    "header": "Skills",
    "options": [
      {"label": "Built-in Atelier skills (Recommended)", "description": "Uses atelier-plan, atelier-implement, atelier-verify, and atelier-brainstorm"},
      {"label": "Custom skills", "description": "Specify your own skill names, prompt templates, and command templates"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_CUSTOM_SKILL_NAME(action) — Custom Skill Name

**Purpose:** Set the skill name for a specific action when using custom skills.

**Settings affected:** Used to construct the Q_CUSTOM_PROMPT suggestion.

**Asked once per action.** The 6 actions are: `plan`, `implement`, `verifyTask`, `verifyPlan`, `verifyManual`, `brainstorm`.

Example for the `plan` action:

```json
{
  "questions": [{
    "question": "What is the name of your planning skill?",
    "header": "Plan Skill",
    "options": [
      {"label": "atelier-plan", "description": "Default Atelier planning skill"},
      {"label": "my-plan", "description": "Example custom name"}
    ],
    "multiSelect": false
  }]
}
```

The user types their custom name via "Other".

**Default skill names per action:**

| Action | Default Skill Name |
|--------|-------------------|
| plan | `atelier-plan` |
| implement | `atelier-implement` |
| verifyTask | `atelier-verify` |
| verifyPlan | `atelier-verify` |
| verifyManual | `atelier-verify` |
| brainstorm | `atelier-brainstorm` |

---

### Q_CUSTOM_PROMPT(action) — Custom Prompt Template

**Purpose:** Set the prompt template for a specific action.

**Settings affected:** `atelier.promptTemplates.{action}`

**How to construct the suggestion:** Combine the user's custom skill name with the action-specific template variables.

**Available template variables per action:**

| Action | Variables |
|--------|-----------|
| plan | `{{title}}`, `{{file}}`, `{{planDir}}`, `{{taskDir}}` |
| implement | `{{title}}`, `{{file}}`, `{{planPath}}`, `{{taskDir}}` |
| verifyTask | `{{title}}`, `{{file}}`, `{{planPath}}`, `{{subtasks}}`, `{{taskDir}}`, `{{taskVerificationReportDir}}` |
| verifyPlan | `{{title}}`, `{{file}}`, `{{subtasks}}`, `{{taskVerificationReportDir}}`, `{{planVerificationReportDir}}` |
| verifyManual | `{{title}}`, `{{file}}`, `{{taskDir}}`, `{{taskVerificationReportDir}}`, `{{planVerificationReportDir}}` |
| brainstorm | `{{title}}`, `{{file}}` |

Example for `plan` with a custom skill named `my-planner`:

```json
{
  "questions": [{
    "question": "What prompt template should be used for planning? Here are the available variables: {{title}}, {{file}}, {{planDir}}, {{taskDir}}",
    "header": "Plan Prompt",
    "options": [
      {"label": "Use suggested template", "description": "Plan {{title}} using /my-planner todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}"},
      {"label": "Customize", "description": "Enter your own prompt template"}
    ],
    "multiSelect": false
  }]
}
```

**Suggested prompt templates by action:**

| Action | Suggested Template |
|--------|-------------------|
| plan | `Plan {{title}} using /{skill} todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}` |
| implement | `Implement '{{title}}' using /{skill} file={{file}} plan_path={{planPath}} task_dir={{taskDir}}` |
| verifyTask | `Verify '{{title}}' using /{skill} mode=task file={{file}} plan_path={{planPath}} subtasks={{subtasks}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}}` |
| verifyPlan | `Verify '{{title}}' using /{skill} mode=plan file={{file}} subtasks={{subtasks}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}` |
| verifyManual | `Mark '{{title}}' as done using /{skill} mode=manual file={{file}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}` |
| brainstorm | `Brainstorm {{title}} using /{skill} file={{file}}` |

---

### Q_CUSTOM_COMMAND(action) — Custom Command Template

**Purpose:** Set the shell command template for a specific action.

**Settings affected:** `atelier.commands.{action}`

**How to construct the suggestion:** Use the Claude CLI with the `{{prompt}}` placeholder, plus any recommended flags.

Example for `plan`:

```json
{
  "questions": [{
    "question": "What command should run for planning?",
    "header": "Plan Command",
    "options": [
      {"label": "Use suggested command", "description": "claude \"{{prompt}}\""},
      {"label": "Customize", "description": "Enter your own command template"}
    ],
    "multiSelect": false
  }]
}
```

**Suggested commands by action:**

| Action | Suggested Command | Notes |
|--------|------------------|-------|
| plan | `claude "{{prompt}}" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | Auto-accept file edits (see Q_AUTO_ACCEPT_EDITS); blocks task management tools |
| implement | `claude "{{prompt}}" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | Auto-accept file edits (see Q_AUTO_ACCEPT_EDITS); blocks task management tools |
| verifyTask | `claude "{{prompt}}" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | Auto-accept file edits (see Q_AUTO_ACCEPT_EDITS); blocks task management tools |
| verifyPlan | `claude "{{prompt}}" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | Auto-accept file edits (see Q_AUTO_ACCEPT_EDITS); blocks task management tools |
| verifyManual | `claude "{{prompt}}" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | Auto-accept file edits; blocks task management tools |
| brainstorm | `claude "{{prompt}}"` | |

**Available command variables:** `{{prompt}}`, `{{workspaceDir}}`, `{{file}}`

---

### Q_TODO_PATH — TODO File Pattern

**Purpose:** Set the glob pattern for discovering TODO files.

**Settings affected:** `atelier.todoFilePattern`

```json
{
  "questions": [{
    "question": "Where should Atelier look for TODO files?",
    "header": "TODOs",
    "options": [
      {"label": "Workspace (Recommended)", "description": "{{workspaceFolder}}/**/TODO.md — finds TODOs anywhere in the project"},
      {"label": "Root only", "description": "{{workspaceFolder}}/TODO.md — only the root TODO file"},
      {"label": "Custom pattern", "description": "Specify a different glob pattern"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_TASK_PATH — Task File Pattern

**Purpose:** Set the glob pattern for task file storage.

**Settings affected:** `atelier.taskFilePattern`

```json
{
  "questions": [{
    "question": "Where should task files be stored?",
    "header": "Tasks",
    "options": [
      {"label": "System directory (Recommended)", "description": "{{userHome}}/.claude/tasks/{{taskListId}}/**/*.json — standard Claude Code location"},
      {"label": "Workspace directory", "description": "{{workspaceFolder}}/.atelier/tasks/**/*.json — stored within the project"},
      {"label": "Custom pattern", "description": "Specify a different glob pattern"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_PLAN_PATH — Plan File Pattern

**Purpose:** Set the glob pattern for plan file discovery.

**Settings affected:** `atelier.planFilePattern`

```json
{
  "questions": [{
    "question": "How should Atelier discover plan files?",
    "header": "Plans",
    "options": [
      {"label": "Linked from TODOs (Recommended)", "description": "Leave empty — plans are discovered via links in TODO.md files"},
      {"label": "Workspace glob", "description": "{{workspaceFolder}}/**/plans/**/*.md — also scan for unlinked plans"},
      {"label": "Custom pattern", "description": "Specify a different glob pattern"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_TASK_VERIFY_PATH — Task Verification File Pattern

**Purpose:** Set where task verification reports are stored.

**Settings affected:** `atelier.taskVerificationFilePattern`

```json
{
  "questions": [{
    "question": "Where should task verification reports be stored?",
    "header": "Task Reports",
    "options": [
      {"label": "System directory (Recommended)", "description": "{{userHome}}/.atelier/projects/{{workspaceId}}/verification/tasks/**/*.md"},
      {"label": "Workspace directory", "description": "{{workspaceFolder}}/.atelier/verification/tasks/**/*.md — stored within the project"},
      {"label": "Custom pattern", "description": "Specify a different glob pattern"}
    ],
    "multiSelect": false
  }]
}
```

---

### Q_PLAN_VERIFY_PATH — Plan Verification File Pattern

**Purpose:** Set where plan verification reports are stored.

**Settings affected:** `atelier.planVerificationFilePattern`

```json
{
  "questions": [{
    "question": "Where should plan verification reports be stored?",
    "header": "Plan Reports",
    "options": [
      {"label": "System directory (Recommended)", "description": "{{userHome}}/.atelier/projects/{{workspaceId}}/verification/plans/**/*.md"},
      {"label": "Workspace directory", "description": "{{workspaceFolder}}/.atelier/verification/plans/**/*.md — stored within the project"},
      {"label": "Custom pattern", "description": "Specify a different glob pattern"}
    ],
    "multiSelect": false
  }]
}
```

---

## Agent Teams

Claude Code supports Agent Teams (experimental), where multiple Claude instances work in parallel. Each teammate has its own context window and they communicate via a shared task list and mailbox.

**To enable Agent Teams**, add this to your settings.json:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

The atelier-plan skill detects this setting automatically and adjusts its behavior:
- Task decomposition groups independent tasks for parallel execution
- Handoff suggests spawning an agent team with delegate mode

**Key concepts:**
- **Delegate mode** (Shift+Tab): keeps the lead in coordination-only role
- **Shared task list**: teammates self-claim unblocked tasks from `~/.claude/tasks/{team-name}/`
- **Plan approval**: you can require teammates to plan before implementing
- Each teammate loads CLAUDE.md, MCP servers, and skills automatically

## Command Templates

`{{model}}` is resolved from the corresponding `atelier.models.*` setting for each action (see Q_MODEL).

| Action | Command | Notes |
|--------|---------|-------|
| plan | `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | `{{model}}` from `atelier.models.plan` (depends on Q_AUTO_ACCEPT_EDITS) |
| implement | `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | `{{model}}` from `atelier.models.implement` (depends on Q_AUTO_ACCEPT_EDITS) |
| verifyTask | `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | `{{model}}` from `atelier.models.verifyTask` (depends on Q_AUTO_ACCEPT_EDITS) |
| verifyPlan | `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | `{{model}}` from `atelier.models.verifyPlan` (depends on Q_AUTO_ACCEPT_EDITS) |
| verifyManual | `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate` | `{{model}}` from `atelier.models.verifyManual` |
| brainstorm | `claude "{{prompt}}"` | |

## Prompt Templates

### Skill-based (default)

| Action | Template |
|--------|----------|
| plan | `Plan {{title}} using /atelier-plan todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}` |
| plan (with teams) | `Plan {{title}} using /atelier-plan teams=true todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}` |
| implement | `Implement '{{title}}' using /atelier-implement file={{file}} plan_path={{planPath}} task_dir={{taskDir}}` |
| verifyTask | `Verify '{{title}}' using /atelier-verify mode=task file={{file}} plan_path={{planPath}} subtasks={{subtasks}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}}` |
| verifyPlan | `Verify '{{title}}' using /atelier-verify mode=plan file={{file}} subtasks={{subtasks}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}` |
| verifyManual | `Mark '{{title}}' as done using /atelier-verify mode=manual file={{file}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}` |
| brainstorm | `Brainstorm {{title}} using /atelier-brainstorm file={{file}}` |

### Inline (no skills required)

| Action | Template |
|--------|----------|
| plan | `Plan {{title}}. Read the TODO at {{file}} and create a plan document in {{planDir}}. Walk through design decisions with the user using AskUserQuestion before writing the plan.` |
| implement | `Implement the task described in {{file}}. Follow the plan's design decisions and acceptance criteria.` |
| verifyTask | `Verify the implementation in {{file}} against the plan at {{planPath}}. Check subtasks: {{subtasks}}.` |
| verifyPlan | `Verify the plan at {{file}} by checking all subtasks: {{subtasks}}.` |
| verifyManual | `Mark {{file}} as done. Create a manual approval verification report.` |
| brainstorm | `Brainstorm {{title}}. Read the TODO at {{file}} and explore the idea through guided questions, then add notes back to the TODO.` |

## Task Management

Claude Code has native `TaskCreate` and `TaskUpdate` tools for creating and managing tasks. The atelier-plan skill uses these tools directly — no additional configuration needed.

**Important:** Claude Code auto-deletes completed task JSON files, which breaks the kanban board. The atelier skills instruct Claude to edit task files directly (setting `status: "completed"`) instead of using `TaskUpdate` for status changes.

**Important:** The atelier-customize skill MUST NOT use `TaskCreate` or `TaskUpdate`. These tools create task JSON files that get indexed as kanban board cards. Use `TodoWrite` for progress tracking instead.

## Claude Permissions

Phase 11b writes `permissions.allow` entries into `.claude/settings.local.json`. This file is workspace-local and not committed to version control. (Hooks are installed automatically by the extension's `HooksService` — do not install hooks here.)

### Permissions Configuration

Permissions are added to the `permissions.allow` array. Each entry uses parenthetical format: `"Tool(glob pattern)"`.

| Tool | Paths | Purpose |
|------|-------|---------|
| `Read` | Skills dir, plans dir | Read skill files and plan documents |
| `Glob` | Skills dir, plans dir | Discover skill and plan files |
| `Read` | Tasks dir, task verification dir, plan verification dir | Read task and verification files |
| `Write` | Tasks dir, task verification dir, plan verification dir | Create/update task and verification files |
| `Edit` | Tasks dir, task verification dir, plan verification dir | Edit task and verification files |

**Path resolution:**
- `{{userHome}}` → `~` (tilde shorthand)
- `{{taskListId}}` → `*` (wildcard — applies to all task lists)
- `{{workspaceId}}` → `*` (wildcard — applies to all workspaces)

**Example permissions entry:**
```json
{
  "permissions": {
    "allow": [
      "Read(~/.claude/skills/**)",
      "Glob(~/.claude/skills/**)",
      "Read(~/.claude/tasks/*/**)",
      "Write(~/.claude/tasks/*/**)",
      "Edit(~/.claude/tasks/*/**)",
      "Read(~/.atelier/projects/*/verification/**)",
      "Write(~/.atelier/projects/*/verification/**)",
      "Edit(~/.atelier/projects/*/verification/**)"
    ]
  }
}
```

### Merge Rules

1. **Deduplicate** permissions — don't add entries that already exist in the `permissions.allow` array
2. **Preserve** all other settings in the file (hooks, non-permissions settings, etc.)

## Upgrade Template Questions (Path B)

When Path B detects that a derived template differs from the user's current setting, present the change using `AskUserQuestion`. Each question should:

1. **Describe the change in natural language** — what the updated skill now does differently
2. **Keep the question short** — focus on the "what" and "why", not the raw template strings
3. **Put the full template in option descriptions** — for users who want to see the details
4. **Preserve user customizations in the "Update" option** — if the user has a custom skill name or extra arguments, incorporate those into the suggested update

### Prompt template changed — new argument added

Use when the upgraded skill expects a new argument that the user's current template doesn't include.

```json
{
  "questions": [{
    "question": "The updated atelier-verify skill now passes the task verification directory to improve report linking. Update your verifyTask prompt template?",
    "header": "verifyTask",
    "options": [
      {
        "label": "Update template",
        "description": "Adds task_verification_dir={{taskVerificationReportDir}} — new template: Verify '{{title}}' using /atelier-verify mode=task file={{file}} plan_path={{planPath}} subtasks={{subtasks}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}}"
      },
      {
        "label": "Keep current",
        "description": "No change — current template: Verify '{{title}}' using /atelier-verify mode=task file={{file}} plan_path={{planPath}} subtasks={{subtasks}} task_dir={{taskDir}}"
      }
    ],
    "multiSelect": false
  }]
}
```

### Prompt template changed — argument removed or renamed

Use when the upgraded skill no longer uses an argument, or it was renamed.

```json
{
  "questions": [{
    "question": "The updated atelier-plan skill renamed 'planDir' to 'plan_dir' for consistency. Update your plan prompt template?",
    "header": "plan",
    "options": [
      {
        "label": "Update template",
        "description": "Renames planDir to plan_dir — new template: Plan {{title}} using /atelier-plan todo_path={{file}} plan_dir={{planDir}} taskDir={{taskDir}}"
      },
      {
        "label": "Keep current",
        "description": "No change — your template still uses the old argument name"
      }
    ],
    "multiSelect": false
  }]
}
```

### Command template changed — new flag added

Use when the recommended command template has changed (e.g., new CLI flag).

```json
{
  "questions": [{
    "question": "The recommended command template now includes --model {{model}} for per-action model selection. Update your plan command?",
    "header": "plan cmd",
    "options": [
      {
        "label": "Update command",
        "description": "Adds --model {{model}} — new command: claude \"{{prompt}}\" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate"
      },
      {
        "label": "Keep current",
        "description": "No change — current command: claude \"{{prompt}}\" --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate"
      }
    ],
    "multiSelect": false
  }]
}
```

### Multiple templates changed — batched question

When 2–4 templates need updating, batch them into a single `AskUserQuestion` call. Each question covers one action's template.

```json
{
  "questions": [
    {
      "question": "The updated atelier-verify skill now passes the verification directory. Update your verifyTask prompt template?",
      "header": "verifyTask",
      "options": [
        {"label": "Update template", "description": "Adds task_verification_dir={{taskVerificationReportDir}}"},
        {"label": "Keep current", "description": "No change to verifyTask template"}
      ],
      "multiSelect": false
    },
    {
      "question": "Same change for verifyPlan — now passes both verification directories. Update your verifyPlan prompt template?",
      "header": "verifyPlan",
      "options": [
        {"label": "Update template", "description": "Adds task_verification_dir and plan_verification_dir"},
        {"label": "Keep current", "description": "No change to verifyPlan template"}
      ],
      "multiSelect": false
    }
  ]
}
```

### All templates match — no questions needed

When every derived template matches the user's current settings (or the user has no custom settings), skip the questions entirely and just report:

```
All prompt and command templates are up to date — no changes needed.
```

### Writing natural language descriptions

The question text should describe the change in terms the user understands:

| Change type | Good description | Avoid |
|---|---|---|
| New argument | "now passes the task verification directory" | "adds `task_verification_dir={{taskVerificationReportDir}}`" |
| Renamed argument | "renamed 'planDir' to 'plan_dir' for consistency" | "changed planDir to plan_dir" |
| New CLI flag | "now includes model selection per action" | "adds `--model {{model}}`" |
| Restructured template | "reorganized arguments to match the updated skill API" | "changed the template format" |

## CLI Flags Reference

| Flag | Description |
|------|-------------|
| `--permission-mode plan` | Read-only mode (not recommended for atelier-plan; blocks TODO.md edits and task creation) |
| `--permission-mode acceptEdits` | Auto-accept file edits (recommended for implementation) |
| `--permission-mode full` | Full permissions (default when omitted) |
| `--resume` | Resume a previous session |
| `--model` | Specify the model to use — accepts aliases (`opus`, `sonnet`) or full names (`claude-opus-4-6`) |
| `--disallowedTools` | Remove tools from the model's context entirely (e.g., `--disallowedTools TaskCreate TaskUpdate`) |
| `--teammate-mode` | Agent Teams display mode: `in-process` (default) or `tmux` |
