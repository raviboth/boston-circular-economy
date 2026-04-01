# OpenAI Codex Configuration Guide

## Overview

OpenAI Codex CLI is OpenAI's command-line coding agent. It supports SKILL.md skills and can discover them from multiple locations. Codex does not have a native `AskUserQuestion` tool, so questions are presented as plain text with numbered options.

**Key capabilities:**
- SKILL.md skill discovery from multiple directories
- Approval modes for controlling autonomy (`suggest`, `auto-edit`, `full-auto`)
- Suggest mode is useful for planning (read-only)
- No native `AskUserQuestion` — use plain-text questions

## Skills Directories

### User-level (Recommended)
```
~/.codex/skills
```
Skills installed here are available across all workspaces.

### Project-level
```
.codex/skills
```
Skills installed here are scoped to this repository and can be committed with the code.

**Note:** Codex also discovers skills from `~/.claude/skills/`. If you already have skills installed at `~/.claude/skills/`, Codex will find them automatically.

## Question Catalog

This section defines every customization question for OpenAI Codex, with plain-text presentation examples. Since Codex does not have `AskUserQuestion`, present each question as text with numbered options and ask the user to choose.

---

### Q_AGENT — Agent Detection

**Purpose:** Confirm or select the AI coding agent.

**Detection logic:** Check `atelier.commands.plan` and `atelier.commands.implement` for the string `codex`. If found, auto-detect and confirm.

**Settings affected:** Determines which guide to load.

#### When auto-detected:

> I detected that you're using **OpenAI Codex** based on your current command settings. Is that correct?
>
> 1. **Yes, that's correct** — Continue with OpenAI Codex configuration
> 2. **Claude Code** — Switch to Anthropic's Claude Code CLI
> 3. **GitHub Copilot** — Switch to GitHub Copilot CLI
> 4. **Cursor** — Switch to Cursor editor

#### When no settings exist (fresh install):

> Which AI coding agent do you use?
>
> 1. **Claude Code** — Anthropic's Claude Code CLI (deepest Atelier integration)
> 2. **OpenAI Codex** — OpenAI's Codex CLI
> 3. **GitHub Copilot** — GitHub Copilot CLI
> 4. **Cursor** — Cursor editor's built-in AI

---

### Q_AGENT_FEATURES — Agent-Specific Features

**OpenAI Codex has no agent-specific features to configure.** Skip this question for Codex.

Agent Teams is not supported by OpenAI Codex.

---

### Q_SKILLS_DIR — Skills Directory

**Purpose:** Choose where Atelier skills are installed.

**Settings affected:** `atelier.skillsDirectory`

> Where should Atelier skills be installed?
>
> 1. **User directory (Recommended)** — `~/.codex/skills` — available across all workspaces
> 2. **Project directory** — `.codex/skills` — scoped to this repo, committed with code
> 3. **Custom directory** — specify a different path
>
> Codex also discovers skills from `~/.claude/skills/`, so if you already have skills there, they'll be found automatically.

**If "Custom directory" is chosen**, ask:

> Enter the path for your skills directory (or choose a suggestion):
>
> 1. `~/.codex/skills` — standard Codex location
> 2. `.codex/skills` — project-level directory

---

### Q_SKILLS_MODE — Built-in vs Custom Skills

**Purpose:** Decide whether to use the bundled Atelier skills or provide custom skill names.

**Settings affected:** Gates the Q_CUSTOM_* questions.

> Would you like to use the built-in Atelier skills or configure custom skills?
>
> 1. **Built-in Atelier skills (Recommended)** — Uses atelier-plan, atelier-implement, atelier-verify, and atelier-brainstorm
> 2. **Custom skills** — Specify your own skill names, prompt templates, and command templates

---

### Q_CUSTOM_SKILL_NAME(action) — Custom Skill Name

**Purpose:** Set the skill name for a specific action when using custom skills.

**Settings affected:** Used to construct the Q_CUSTOM_PROMPT suggestion.

**Asked once per action.** The 6 actions are: `plan`, `implement`, `verifyTask`, `verifyPlan`, `verifyManual`, `brainstorm`.

Example for the `plan` action:

> What is the name of your planning skill? (default: `atelier-plan`)

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

> What prompt template should be used for planning?
>
> Available variables: `{{title}}`, `{{file}}`, `{{planDir}}`, `{{taskDir}}`
>
> 1. **Use suggested template** — `Plan {{title}} using /my-planner todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}`
> 2. **Customize** — enter your own prompt template

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

**How to construct the suggestion:** Use the Codex CLI with the `{{prompt}}` placeholder. Note that for planning, `--approval-mode suggest` is recommended.

Example for `plan`:

> What command should run for planning?
>
> 1. **Use suggested command** — `codex --approval-mode suggest "{{prompt}}"` (suggest mode — read-only for planning)
> 2. **Customize** — enter your own command template

**Suggested commands by action:**

| Action | Suggested Command | Notes |
|--------|------------------|-------|
| plan | `codex --approval-mode suggest "{{prompt}}"` | Suggest mode for read-only planning |
| implement | `codex "{{prompt}}"` | Default approval mode |
| verifyTask | `codex "{{prompt}}"` | |
| verifyPlan | `codex "{{prompt}}"` | |
| verifyManual | `codex "{{prompt}}"` | |
| brainstorm | `codex "{{prompt}}"` | |

**Available command variables:** `{{prompt}}`, `{{workspaceDir}}`, `{{file}}`

---

### Q_TODO_PATH — TODO File Pattern

**Purpose:** Set the glob pattern for discovering TODO files.

**Settings affected:** `atelier.todoFilePattern`

> Where should Atelier look for TODO files?
>
> 1. **Workspace (Recommended)** — `{{workspaceFolder}}/**/TODO.md` — finds TODOs anywhere in the project
> 2. **Root only** — `{{workspaceFolder}}/TODO.md` — only the root TODO file
> 3. **Custom pattern** — specify a different glob pattern

---

### Q_TASK_PATH — Task File Pattern

**Purpose:** Set the glob pattern for task file storage.

**Settings affected:** `atelier.taskFilePattern`

> Where should task files be stored?
>
> 1. **System directory (Recommended)** — `{{userHome}}/.claude/tasks/{{taskListId}}/**/*.json` — standard Claude Code location
> 2. **Workspace directory** — `{{workspaceFolder}}/.atelier/tasks/**/*.json` — stored within the project
> 3. **Custom pattern** — specify a different glob pattern

---

### Q_PLAN_PATH — Plan File Pattern

**Purpose:** Set the glob pattern for plan file discovery.

**Settings affected:** `atelier.planFilePattern`

> How should Atelier discover plan files?
>
> 1. **Linked from TODOs (Recommended)** — leave empty — plans are discovered via links in TODO.md files
> 2. **Workspace glob** — `{{workspaceFolder}}/**/plans/**/*.md` — also scan for unlinked plans
> 3. **Custom pattern** — specify a different glob pattern

---

### Q_TASK_VERIFY_PATH — Task Verification File Pattern

**Purpose:** Set where task verification reports are stored.

**Settings affected:** `atelier.taskVerificationFilePattern`

> Where should task verification reports be stored?
>
> 1. **System directory (Recommended)** — `{{userHome}}/.atelier/projects/{{workspaceId}}/verification/tasks/**/*.md`
> 2. **Workspace directory** — `{{workspaceFolder}}/.atelier/verification/tasks/**/*.md` — stored within the project
> 3. **Custom pattern** — specify a different glob pattern

---

### Q_PLAN_VERIFY_PATH — Plan Verification File Pattern

**Purpose:** Set where plan verification reports are stored.

**Settings affected:** `atelier.planVerificationFilePattern`

> Where should plan verification reports be stored?
>
> 1. **System directory (Recommended)** — `{{userHome}}/.atelier/projects/{{workspaceId}}/verification/plans/**/*.md`
> 2. **Workspace directory** — `{{workspaceFolder}}/.atelier/verification/plans/**/*.md` — stored within the project
> 3. **Custom pattern** — specify a different glob pattern

---

## Command Templates

| Action | Command | Notes |
|--------|---------|-------|
| plan | `codex --approval-mode suggest "{{prompt}}"` | Suggest mode for read-only planning |
| implement | `codex "{{prompt}}"` | Default approval mode |
| verifyTask | `codex "{{prompt}}"` | |
| verifyPlan | `codex "{{prompt}}"` | |
| verifyManual | `codex "{{prompt}}"` | |
| brainstorm | `codex "{{prompt}}"` | |

## Prompt Templates

### Skill-based (with skills installed)

| Action | Template |
|--------|----------|
| plan | `Plan {{title}} using /atelier-plan todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}` |
| implement | `Implement '{{title}}' using /atelier-implement file={{file}} plan_path={{planPath}} task_dir={{taskDir}}` |
| verifyTask | `Verify '{{title}}' using /atelier-verify mode=task file={{file}} plan_path={{planPath}} subtasks={{subtasks}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}}` |
| verifyPlan | `Verify '{{title}}' using /atelier-verify mode=plan file={{file}} subtasks={{subtasks}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}` |
| verifyManual | `Mark '{{title}}' as done using /atelier-verify mode=manual file={{file}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}` |
| brainstorm | `Brainstorm {{title}} using /atelier-brainstorm file={{file}}` |

### Inline (no skills required)

| Action | Template |
|--------|----------|
| plan | `Plan {{title}}. Read the TODO at {{file}} and create a plan document in {{planDir}}. Walk through design decisions with the user before writing the plan.` |
| implement | `Implement the task described in {{file}}. Follow the plan's design decisions and acceptance criteria.` |
| verifyTask | `Verify the implementation in {{file}} against the plan at {{planPath}}. Check subtasks: {{subtasks}}.` |
| verifyPlan | `Verify the plan at {{file}} by checking all subtasks: {{subtasks}}.` |
| verifyManual | `Mark {{file}} as done. Create a manual approval verification report.` |
| brainstorm | `Brainstorm {{title}}. Read the TODO at {{file}} and explore the idea through guided questions, then add notes back to the TODO.` |

## Task Management

Codex does not have native `TaskCreate`/`TaskUpdate` tools. The atelier-plan skill automatically detects this and writes task JSON files directly to the `taskDir` path provided in the prompt. No additional configuration is needed.

The task file format follows the same JSON structure that Claude Code uses:
```json
{
  "id": "1",
  "subject": "Task name",
  "description": "Task description with acceptance criteria",
  "status": "pending",
  "blockedBy": []
}
```

Tasks should be written to the configured `atelier.taskFilePattern` location.

## Agent Teams

Not supported by OpenAI Codex at this time.

## Upgrade Template Questions (Path B)

When Path B detects that a derived template differs from the user's current setting, present the change as a plain-text question. Each question should:

1. **Describe the change in natural language** — what the updated skill now does differently
2. **Keep the question short** — focus on the "what" and "why", not the raw template strings
3. **Show the full template in option descriptions** — for users who want details
4. **Preserve user customizations** — if the user has a custom skill name or extra arguments, incorporate those into the suggested update

### Prompt template changed — new argument added

> The updated atelier-verify skill now passes the task verification directory to improve report linking. Update your verifyTask prompt template?
>
> 1. **Update template** — adds `task_verification_dir={{taskVerificationReportDir}}` to your existing template
> 2. **Keep current** — no change

### Prompt template changed — argument removed or renamed

> The updated atelier-plan skill renamed 'planDir' to 'plan_dir' for consistency. Update your plan prompt template?
>
> 1. **Update template** — renames `planDir` to `plan_dir` in your template
> 2. **Keep current** — no change

### Command template changed — new flag added

> The recommended command template now includes `--model {{model}}` for per-action model selection. Update your plan command?
>
> 1. **Update command** — adds `--model {{model}}`
> 2. **Keep current** — no change

### Multiple templates changed

Present each template change as a separate numbered question, one after the other. The user answers each individually.

### All templates match — no questions needed

When all derived templates match the current settings, just report:

> All prompt and command templates are up to date — no changes needed.

### Writing natural language descriptions

| Change type | Good description | Avoid |
|---|---|---|
| New argument | "now passes the task verification directory" | "adds `task_verification_dir={{taskVerificationReportDir}}`" |
| Renamed argument | "renamed 'planDir' to 'plan_dir' for consistency" | "changed planDir to plan_dir" |
| New CLI flag | "now includes model selection per action" | "adds `--model {{model}}`" |
| Restructured template | "reorganized arguments to match the updated skill API" | "changed the template format" |

## CLI Flags Reference

| Flag | Description |
|------|-------------|
| `--approval-mode suggest` | Suggest-only mode (good for planning) |
| `--approval-mode auto-edit` | Auto-apply file edits |
| `--approval-mode full-auto` | Fully autonomous |
| `--model` | Specify the model to use |
