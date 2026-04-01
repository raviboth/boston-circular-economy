---
name: atelier-customize
description: Interactive customization skill that helps configure Atelier for your preferred AI coding agent. Detects your current agent from settings, walks you through customization options, and generates .vscode/settings.json entries for command templates, prompt templates, file patterns, and agent-specific features like Claude Code Agent Teams.
---

# Atelier Customize Skill

This skill helps you configure Atelier for your AI coding agent and workspace. It reads your current settings, identifies your agent, loads the agent-specific guide, and walks you through available customizations — then generates the appropriate `.vscode/settings.json` entries.

## CRITICAL BEHAVIORAL REQUIREMENTS

**READ THIS FIRST — MANDATORY RULES:**

1. **DO NOT modify settings directly** — This skill generates settings for the user to review. It writes to `.vscode/settings.json` only after user approval.
2. **ALWAYS detect agent first** — Before offering customizations, determine which CLI agent the user is using.
3. **ALWAYS read the agent guide** — Load the appropriate guide from `guides/` for the confirmed agent. The guide contains the question catalog with concrete options, suggested answers, and presentation examples.
4. **Follow the question catalog from the guide** — The agent guide defines every question's text, options, and how to present them (e.g., `AskUserQuestion` JSON for Claude Code, plain text for other agents).
5. **Use TodoWrite to track progress** — Update the todo list after each question is answered, showing both the step and the user's choice.

## When to Use

Use this skill when:
- User wants to configure Atelier for their AI coding agent
- User wants to customize command templates, prompt templates, or file patterns
- User mentions "customize", "configure", "setup", or "settings"
- User wants to enable Agent Teams for Claude Code
- User is switching from one AI agent to another
- User asks about any Atelier configuration option
- User wants to change a specific setting (direct access)

## Arguments

This skill accepts optional arguments:

- `agent` — Skip detection and use this agent directly. Values: `claude`, `codex`, `copilot`, `cursor`
- `defaults` — When `true`, skip all interactive questions and apply recommended defaults. Installs bundled skills to the user-level directory, uses built-in prompt templates, and writes standard file path settings. See Path D below.
- `upgrade_skills` — Comma-separated list of skill names to upgrade. Copies only the listed skills from the bundled `skills/` directory, reports what was updated, and exits.
- `todo_path` — Absolute path to the TODO.md file containing the system TODO. After writing settings or completing an upgrade, check off the system TODO at this path.

Additionally, the skill accepts **free-form natural language** to jump directly to specific settings. Examples:
- "customize the task folder path"
- "change my agent to cursor"
- "enable agent teams"
- "set up custom skills"
- "change where verification reports go"

## Reference Guides

After determining the agent, read the corresponding guide file. The guide provides the **question catalog** — concrete question text, options, default values, and presentation examples tailored to that agent.

**Guide files** (relative to this SKILL.md):
- `guides/claude-code.md` — Claude Code CLI (uses `AskUserQuestion` tool for questions)
- `guides/openai-codex.md` — OpenAI Codex CLI (uses plain-text questions)
- `guides/github-copilot.md` — GitHub Copilot CLI (uses plain-text questions)
- `guides/cursor.md` — Cursor editor (uses plain-text questions)

**How to find the guides:**
```
Glob: guides/*.md (relative to this file's directory)
```

## Question Registry

Every user-facing decision has a question ID. The base skill defines the purpose, settings affected, and dependencies. The agent guide provides the concrete question text, options, and presentation format.

| ID | Purpose | Settings Affected | Depends On |
|----|---------|-------------------|------------|
| `Q_AGENT` | Determine which agent CLI to configure for | (loads guide) | — |
| `Q_AGENT_FEATURES` | Agent-specific features (e.g., Agent Teams for Claude Code) | varies by agent | Q_AGENT |
| `Q_AUTO_ACCEPT_EDITS` | Auto-accept file edits during implementation (Claude Code only) | `atelier.commands.implement` | Q_AGENT=Claude |
| `Q_MODEL` | Choose which Claude model to use per action | `atelier.models.*` | Q_AGENT=Claude |
| `Q_SKILLS_DIR` | Where to install skills (user-level, project-level, or custom) | `atelier.skillsDirectory` | Q_AGENT |
| `Q_SKILLS_MODE` | Built-in Atelier skills vs custom skills | (gates Q_CUSTOM_*) | Q_SKILLS_DIR |
| `Q_CUSTOM_SKILL_NAME(action)` | Name of custom skill for each action | (constructs prompt suggestion) | Q_SKILLS_MODE=custom |
| `Q_CUSTOM_PROMPT(action)` | Prompt template for each action | `atelier.promptTemplates.{action}` | Q_CUSTOM_SKILL_NAME |
| `Q_CUSTOM_COMMAND(action)` | Command template for each action | `atelier.commands.{action}` | Q_CUSTOM_PROMPT |
| `Q_TODO_PATH` | TODO file discovery pattern | `atelier.todoFilePattern` | Q_AGENT |
| `Q_TASK_PATH` | Task file storage location | `atelier.taskFilePattern` | Q_AGENT |
| `Q_PLAN_PATH` | Plan file discovery pattern | `atelier.planFilePattern` | Q_AGENT |
| `Q_TASK_VERIFY_PATH` | Task verification report location | `atelier.taskVerificationFilePattern` | Q_AGENT |
| `Q_PLAN_VERIFY_PATH` | Plan verification report location | `atelier.planVerificationFilePattern` | Q_AGENT |

The 6 actions for custom skills: **plan**, **implement**, **verifyTask**, **verifyPlan**, **verifyManual**, **brainstorm**.

## Workflow Paths

### Path A: Full Setup

Triggered when the skill is invoked with no special arguments (or only `agent`).

**Phase 1: Read Current Settings**
1. Check if `.vscode/settings.json` exists in the workspace root
2. If it exists, read it and extract all `atelier.*` settings
3. Initialize TodoWrite:

```
⬜ Detect agent
⬜ Agent-specific features
⬜ Skills directory
⬜ Skills mode
⬜ File paths
⬜ Review & confirm
```

**Phase 2: Detect Agent (Q_AGENT)**
1. If `agent` argument was provided, use it directly
2. Otherwise, examine `atelier.commands.plan` and `atelier.commands.implement`:
   - Contains `claude` → Claude Code
   - Contains `codex` → OpenAI Codex
   - Contains `copilot` → GitHub Copilot
   - Contains `cursor` → Cursor
   - Unset / default → Claude Code (default)
3. If auto-detected, confirm with the user using the Q_AGENT question from the guide
4. If no command settings exist, ask directly using the Q_AGENT question from the guide
5. Update TodoWrite: `✅ Detect agent → {Agent Name}`

**Phase 3: Load Agent Guide**
1. Read the corresponding guide file based on the confirmed agent
2. The guide provides all remaining question definitions with presentation examples

**Phase 4: Agent-Specific Features (Q_AGENT_FEATURES, Q_AUTO_ACCEPT_EDITS, Q_MODEL)**
1. Check the guide for agent-specific features
2. For Claude Code: present the Agent Teams question (Q_AGENT_FEATURES), then the auto-accept edits question (Q_AUTO_ACCEPT_EDITS), then the model selection question (Q_MODEL). If the user selects "Custom" for Q_MODEL, ask a follow-up for each action group (plan, implement, verify).
3. For other agents: skip this phase (no agent-specific features currently)
4. Update TodoWrite: `✅ Agent features → {choices}`

**Phase 5: Skills Directory (Q_SKILLS_DIR)**
1. Present the skills directory question from the guide
2. Options include user-level (recommended), project-level, and custom
3. Update TodoWrite: `✅ Skills directory → {path}`

**Phase 6: Install Skills**
1. Use Glob to find the bundled skills: `skills/*/SKILL.md` relative to this SKILL.md's directory. The glob results give you the absolute source path (e.g., `/path/to/.claude/skills/atelier-customize/skills/atelier-plan/SKILL.md`). Derive the source parent directory from these paths (the `skills/` directory containing all bundled skill folders).
2. Copy all bundled skills to the chosen skills directory using a single `cp -R` command:
   ```bash
   cp -R <source_skills_dir>/atelier-brainstorm <source_skills_dir>/atelier-plan <source_skills_dir>/atelier-implement <source_skills_dir>/atelier-verify <destination_skills_dir>/
   ```
   This copies each skill folder (including nested `guides/` subdirectories) in one operation. The destination directory must already exist — create it with `mkdir -p` first if needed.

**Phase 7: Skills Mode (Q_SKILLS_MODE)**
1. Present the built-in vs custom skills question from the guide
2. If **built-in**: skip prompt/command customization (Phases 8a–8c)
3. If **custom**: proceed through Phases 8a–8c for all 6 actions
4. Update TodoWrite: `✅ Skills mode → {Built-in / Custom}`

**Phase 8a: Custom Skill Names (Q_CUSTOM_SKILL_NAME — custom only)**
For each of the 6 actions, ask the user for the skill name. The guide provides the default name and presentation format.

**Phase 8b: Custom Prompt Templates (Q_CUSTOM_PROMPT — custom only)**
For each action, construct a suggested prompt template using:
- The user's custom skill name from Phase 8a
- The action-specific template variables from the guide
Present the suggestion and let the user accept or customize.

**Phase 8c: Custom Command Templates (Q_CUSTOM_COMMAND — custom only)**
For each action, construct a suggested command using:
- The agent's CLI command from the guide
- The `{{prompt}}` placeholder
- Any agent-specific flags (e.g., `--approval-mode suggest` for Codex planning)
Present the suggestion and let the user accept or customize.

**Phase 9: File Paths (Q_TODO_PATH, Q_TASK_PATH, Q_PLAN_PATH, Q_TASK_VERIFY_PATH, Q_PLAN_VERIFY_PATH)**
Present each file path question from the guide sequentially. Each offers:
- System-level path (recommended) — stores data outside the workspace
- Workspace-level path — stores data within the project
- Custom path — user specifies their own glob pattern

Update TodoWrite after each: `✅ File paths → (all configured)`

**Phase 10: Review**
Present a human-readable summary of all choices (NOT raw JSON):

```
Here's a summary of your Atelier configuration:

  Agent:        Claude Code
  Agent Teams:  Enabled
  Model:        Opus for planning, Sonnet for rest

  Skills:
    Directory:  ~/.claude/skills
    Mode:       Built-in Atelier skills

  File Locations:
    TODOs:               {workspaceFolder}/**/TODO.md
    Tasks:               ~/.claude/tasks/{taskListId}/**/*.json
    Task verification:   ~/.atelier/projects/{workspaceId}/verification/tasks/**/*.md
    Plan verification:   ~/.atelier/projects/{workspaceId}/verification/plans/**/*.md
```

If the user chose custom skills, also show:
```
  Custom Skills:
    plan:         /my-planner → claude "{{prompt}}"
    implement:    /my-impl → claude "{{prompt}}" --permission-mode acceptEdits
    verifyTask:   /my-verify → claude "{{prompt}}"
    ...
```

Ask the user to confirm with options: **Save settings** / **Make changes** / **Cancel**

- **Save settings** → proceed to Phase 11
- **Make changes** → loop back to the relevant phase
- **Cancel** → exit without writing

**Phase 11: Write Settings**
1. Build the settings JSON from all gathered preferences
2. Only include settings that differ from the extension's built-in defaults
3. If `.vscode/settings.json` exists: merge atelier.* settings with existing content (preserve non-atelier settings)
4. If `.vscode/settings.json` does not exist: create `.vscode/` directory and write new file
5. Display post-write message:

```
Settings saved to .vscode/settings.json

You can run /atelier-customize at any time to revisit these settings.
```

**Phase 11b: Write Claude Permissions**

Write `permissions.allow` entries into `.claude/settings.local.json`. This grants the agent read/write access to Atelier-managed files. (Hooks are installed automatically by the extension's `HooksService` before each terminal launch — do not install hooks here.)

1. Read `.claude/settings.local.json` (or start with `{}` if it doesn't exist)
2. Merge permissions — add entries to the `permissions.allow` array based on the chosen file paths:
   - **Read + Glob**: skills directory, plans directory
   - **Read + Write + Edit**: tasks directory, task verification directory, plan verification directory
3. Use the parenthetical format: `"Read(~/.claude/skills/**)"`, `"Write(~/.claude/tasks/*/**)"`, etc.
4. Resolve `{{userHome}}` → `~` (tilde); `{{taskListId}}`/`{{workspaceId}}` → `*` (wildcard for all task lists/workspaces)
5. Preserve all existing entries in the file; write back with `JSON.stringify(settings, null, 2)`

**Runs for Paths A, C, D.** Not Path B (upgrade only copies skills).

**Phase 12: Mark System TODO Complete**
1. If `todo_path` was provided, read the file at that path
2. Use the Edit tool to change `- [ ] Setup Atelier #atelier` to `- [x] Setup Atelier #atelier`
3. If the checkbox text is not found in the file, skip silently
4. Do NOT run this phase if the user cancelled in Phase 10

### Path B: Upgrade Skills

Triggered when `upgrade_skills` argument is present.

**Phase B1: Read Current Settings**
1. Read `.vscode/settings.json` for all `atelier.*` settings (prompt templates, command templates, models, file paths, skills mode, etc.)
2. Identify the agent from `atelier.commands.plan` (same detection logic as Path A Phase 2)

**Phase B2: Load Agent Guide**
1. Read the agent-specific guide file (e.g., `guides/claude-code.md`)
2. The guide provides the template derivation tables and upgrade question examples

**Phase B3: Copy Skills**
1. Read `atelier.skillsDirectory` from `.vscode/settings.json` (or fall back to agent default)
2. Parse the comma-separated skill names from the `upgrade_skills` argument
3. For each listed skill, copy it from the bundled `skills/` directory to the target skills directory (overwrite existing)
4. Report which skills were updated and their new locations

**Phase B4: Re-derive Templates**

Using the user's existing settings as inputs (agent, skills mode, custom skill names, auto-accept, model, Agent Teams, etc.), derive what each prompt template and command template *should* be for the upgraded skills:

1. For each action (`plan`, `implement`, `verifyTask`, `verifyPlan`, `verifyManual`, `brainstorm`):
   a. Read the NEW (just-copied) skill's SKILL.md to understand its current expected arguments
   b. Construct the expected prompt template using the same logic as Path A Phases 4–8 — incorporate the user's existing configuration choices (e.g., if they use Agent Teams, include `teams=true`; if they use custom skill names, use those names)
   c. Construct the expected command template using the agent's CLI format and flags from the guide
2. Use the "Suggested prompt templates by action" and "Suggested commands by action" tables in the guide as the baseline, adjusted for the user's settings

**Phase B5: Diff and Prompt Per Template**

For each action, compare the derived template against the current value in settings:
- **If they match** — skip silently (template is already correct)
- **If the setting is absent** (user is on extension defaults) — skip, noting "using extension defaults"
- **If they differ** — present the change to the user via the guide's upgrade question format

When presenting differences:
1. Identify what specifically changed in natural language (e.g., "now passes the task verification directory", "adds model selection flag")
2. Use `AskUserQuestion` (Claude Code) or plain-text questions (other agents) as shown in the guide's **Upgrade Template Questions** section
3. Batch up to 4 template questions per `AskUserQuestion` call
4. The "Update" option should incorporate the user's existing customizations where possible (keep their skill name, keep their extra arguments) while adding/changing what's needed

**Phase B6: Apply Approved Changes**
1. For each template the user chose to update, merge the new value into `.vscode/settings.json`
2. Preserve all non-atelier settings and non-affected atelier settings

**Phase B7: Check Permissions**
1. Run the same permissions logic as Phase 11b in Path A — check `.claude/settings.local.json` for missing `permissions.allow` entries
2. If new permissions are needed (e.g., the upgraded skills reference new directories), suggest adding them

**Phase B8: Mark System TODO Complete**
1. If `todo_path` was provided, use the Edit tool to change `- [ ] Update Atelier Skills #atelier` to `- [x] Update Atelier Skills #atelier`

### Path C: Direct Access

Triggered when a natural language request is provided (e.g., "customize the task folder path").

1. Parse the request to identify which question(s) are relevant
2. Read current `.vscode/settings.json` to get existing settings
3. Resolve the agent from existing command settings, or ask (Q_AGENT) if unknown
4. Load the agent guide
5. Jump directly to the matching question(s) — skip all unrelated questions
6. After answering, show a focused review summary of only the changed settings
7. Write settings and display the post-write message

**Natural language → Question mapping examples:**
- "task folder", "task path", "where tasks are stored" → Q_TASK_PATH
- "todo path", "todo files", "where to find TODOs" → Q_TODO_PATH
- "verification reports", "where reports go" → Q_TASK_VERIFY_PATH + Q_PLAN_VERIFY_PATH
- "skills directory", "where to install skills" → Q_SKILLS_DIR
- "custom skills", "my own skills" → Q_SKILLS_MODE + Q_CUSTOM_* loop
- "agent teams", "parallel agents" → Q_AGENT_FEATURES
- "auto accept", "permission mode", "accept edits" → Q_AUTO_ACCEPT_EDITS
- "model", "which model", "opus", "sonnet" → Q_MODEL
- "change agent", "switch to cursor" → Q_AGENT (then re-derive dependent settings)
- "plan command", "planning command" → Q_CUSTOM_COMMAND(plan)
- "plan prompt", "planning prompt" → Q_CUSTOM_PROMPT(plan)

### Path D: Quick Setup

Triggered when `defaults=true` argument is present.

1. Read current `.vscode/settings.json` to get existing settings (if any)
2. Resolve the agent: use `agent` argument if provided, otherwise detect from existing settings, otherwise default to Claude Code
3. Load the agent guide to determine default values
4. Install bundled skills to the user-level skills directory (e.g., `~/.claude/skills` for Claude Code)
5. Build settings JSON using all default/recommended values — **do not ask any questions**:
   - Agent Teams: Disabled (default)
   - Auto-accept edits: No (default)
   - Model: Opus for planning, Sonnet for implementation, Haiku for verification (see Q_MODEL preset table in the agent guide)
   - Skills directory: User-level (e.g., `~/.claude/skills`)
   - Skills mode: Built-in
   - File paths: All system-level defaults from the agent guide
6. Merge settings into `.vscode/settings.json` (preserving non-atelier settings)
7. Display a summary of the applied settings (same format as Phase 10 review in Path A)
8. If `todo_path` was provided, check off the system TODO
9. **Exit immediately** — do not proceed to the interactive workflow

## Settings Key Mapping

| Configuration | Settings Key |
|---------------|-------------|
| Plan model | `atelier.models.plan` |
| Implement model | `atelier.models.implement` |
| Verify task model | `atelier.models.verifyTask` |
| Verify plan model | `atelier.models.verifyPlan` |
| Verify manual model | `atelier.models.verifyManual` |
| Plan command | `atelier.commands.plan` |
| Implement command | `atelier.commands.implement` |
| Verify task command | `atelier.commands.verifyTask` |
| Verify plan command | `atelier.commands.verifyPlan` |
| Verify manual command | `atelier.commands.verifyManual` |
| Brainstorm command | `atelier.commands.brainstorm` |
| Plan prompt template | `atelier.promptTemplates.plan` |
| Implement prompt template | `atelier.promptTemplates.implement` |
| Verify task prompt template | `atelier.promptTemplates.verifyTask` |
| Verify plan prompt template | `atelier.promptTemplates.verifyPlan` |
| Verify manual prompt template | `atelier.promptTemplates.verifyManual` |
| Brainstorm prompt template | `atelier.promptTemplates.brainstorm` |
| Skills directory | `atelier.skillsDirectory` |
| TODO file pattern | `atelier.todoFilePattern` |
| Plan file pattern | `atelier.planFilePattern` |
| Task file pattern | `atelier.taskFilePattern` |
| Task verification pattern | `atelier.taskVerificationFilePattern` |
| Plan verification pattern | `atelier.planVerificationFilePattern` |

## Substitution Variables

These variables are available in Atelier settings. The agent guide provides agent-specific defaults that use these variables.

### Path Variables (for file patterns and directory settings)
- `{{workspaceFolder}}` — Absolute path to the VS Code workspace root
- `{{userHome}}` — User's home directory
- `{{workspaceId}}` — Encoded workspace identifier for project-specific storage
- `{{taskListId}}` — Task list identifier extracted from TODO file paths

### Prompt Placeholders (for prompt templates)
- `{{title}}` — Title of the item being acted on
- `{{description}}` — Description of the item
- `{{path}}` / `{{file}}` — Path to the item's file
- `{{planPath}}` — Path to the plan file
- `{{planDir}}` — Directory where plans are stored
- `{{taskDir}}` — Directory where tasks are stored
- `{{subtasks}}` — Comma-separated list of subtask paths
- `{{taskVerificationReportDir}}` / `{{planVerificationReportDir}}` — Verification report directories

### Command Placeholders (for command templates)
- `{{prompt}}` — The fully-resolved prompt text
- `{{workspaceDir}}` — Workspace directory path
- `{{file}}` — File path context
- `{{model}}` — The model alias from `atelier.models.*` for the current action (e.g., `opus`, `sonnet`)

## Error Handling

**If reference guide not found:**
- Warn user that the agent guide is missing
- Fall back to showing the default Claude Code settings
- Suggest reinstalling the atelier-customize skill

**If .vscode/settings.json has syntax errors:**
- Inform user the file has invalid JSON
- Offer to create a backup and write fresh settings
- Or ask user to fix the file manually first

**If workspace folder not available:**
- Inform user that a workspace must be open
- Cannot write settings without a workspace

## Tools Used

This skill relies on these tools:
- `Read` — Read current `.vscode/settings.json` and reference guides
- `Write` — Write updated `.vscode/settings.json`
- `Edit` — Merge settings into existing settings file
- `Glob` — Find reference guide files and bundled skills
- `Bash` — Create `.vscode/` directory if needed, copy skill files
- `AskUserQuestion` — Gather user preferences (Claude Code only — other agents use plain text)
- `TodoWrite` — Track skill progress and accumulated decisions

**TOOLS NOT TO USE:**
- Do NOT use TaskCreate or TaskUpdate — these create task JSON files that appear as cards on the kanban board. Use TodoWrite for progress tracking instead (status bar only, no board cards).
- Do NOT modify any source code files — this skill only writes settings and checks off system TODOs
