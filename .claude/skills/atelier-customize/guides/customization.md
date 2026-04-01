
Atelier provides extensive configuration options through VS Code settings. This reference covers file patterns for locating your workflow files, prompt templates for customizing how Claude receives instructions, model selection for each action type, and command settings for controlling how Claude Code is invoked.

## Substitution Variables

All file pattern, prompt, and command settings support variable substitution. Variables are enclosed in double curly braces and replaced at runtime.

### Path Variables

These variables are available in file pattern settings:

| Variable | Description |
|----------|-------------|
| `{{workspaceFolder}}` | Absolute path to the current VS Code workspace root |
| `{{userHome}}` | User's home directory (e.g., `/Users/jane` or `C:\Users\jane`) |
| `{{workspaceId}}` | Encoded workspace path for per-project isolation (e.g., `-Users-jane-my--project` for `/Users/jane/my-project`) |
| `{{taskListId}}` | Identifier extracted from matched TODO file paths, enabling task organization per TODO file |

### Prompt Placeholders

These placeholders are available in prompt template settings:

| Placeholder | Description |
|-------------|-------------|
| `{{path}}` | Full file path to the item being processed |
| `{{file}}` | File path (alias for path in some contexts) |
| `{{title}}` | Title of the todo, plan, or task |
| `{{description}}` | Description content of the item |
| `{{status}}` | Current status of the item |
| `{{planPath}}` | Path to the parent plan (for task implementation and verification) |
| `{{subtasks}}` | List of subtask identifiers (for verification prompts) |
| `{{taskDir}}` | Absolute path to task files directory for current workspace |
| `{{planDir}}` | Absolute path to plans directory |
| `{{taskVerificationReportDir}}` | Absolute path to task verification report directory |
| `{{planVerificationReportDir}}` | Absolute path to plan verification report directory |

### Command Placeholders

These placeholders are available in command settings:

| Placeholder | Description |
|-------------|-------------|
| `{{prompt}}` | The fully-rendered prompt text after template substitution |
| `{{model}}` | The model alias resolved from the corresponding `atelier.models.*` setting |
| `{{workspaceDir}}` | Working directory for command execution |
| `{{file}}` | Path to the relevant file |

## File Pattern Settings

File patterns use glob syntax with substitution variables to locate workflow files.

### atelier.skillsDirectory

Directory containing Claude Code skills.

- **Default:** `{{userHome}}/.claude/skills`
- **Example:** `{{workspaceFolder}}/.atelier/skills`

### atelier.todoFilePattern

Glob pattern for TODO files. Atelier watches these files for changes and displays their items on the kanban board.

- **Default:** `{{workspaceFolder}}/{{taskListId}}/TODO.md`
- **Example:** `{{workspaceFolder}}/docs/TODO.md`

The `{{taskListId}}` variable is extracted from matched paths and can be used in other patterns to organize tasks per TODO file.

### atelier.planFilePattern

Glob pattern for plan files to always show on the kanban. Leave empty to only show plans linked from TODOs.

- **Default:** (empty)
- **Example:** `{{workspaceFolder}}/.atelier/plans/*.md`

### atelier.atelierTaskFilePattern

Glob pattern for Atelier-owned task files (durable markdown).

- **Default:** `{{userHome}}/.atelier/projects/{{workspaceId}}/tasks/{{taskListId}}/**/*.md`
- **Example:** `{{workspaceFolder}}/.atelier/tasks/**/*.md`

### atelier.claudeTaskFilePattern

Glob pattern for Claude Code task files (ephemeral JSON).

- **Default:** `{{userHome}}/.claude/tasks/{{taskListId}}/**/*.json`
- **Example:** `{{workspaceFolder}}/.atelier/claude-tasks/**/*.json`

### atelier.taskVerificationFilePattern

Glob pattern for task verification report files.

- **Default:** `{{userHome}}/.atelier/projects/{{workspaceId}}/verification/tasks/**/*.md`

### atelier.planVerificationFilePattern

Glob pattern for plan verification report files.

- **Default:** `{{userHome}}/.atelier/projects/{{workspaceId}}/verification/plans/**/*.md`

## Model Settings

Model settings control which Claude model is used for each action type. Values can be model aliases (e.g., `opus`, `sonnet`, `haiku`) or full model names (e.g., `claude-opus-4-6`).

### atelier.models.plan

Model for planning tasks.

- **Default:** `opus`

### atelier.models.implement

Model for implementation tasks.

- **Default:** `sonnet`

### atelier.models.verifyTask

Model for task verification.

- **Default:** `haiku`

### atelier.models.verifyPlan

Model for plan verification.

- **Default:** `haiku`

### atelier.models.verifyManual

Model for manual approval.

- **Default:** `haiku`

## Prompt Template Settings

Prompt templates define the text sent to Claude Code when you trigger actions from the kanban board.

### atelier.promptTemplates.plan

Template for the planning prompt when promoting a todo to a plan. See [Planning Skill](/skills/plan/) for details.

- **Default:** `Plan {{title}} using /atelier-plan todo_path={{file}} planDir={{planDir}} taskDir={{taskDir}}`

### atelier.promptTemplates.implement

Template for the implementation prompt when starting work on a task. See [Implement Skill](/skills/implement/) for details.

- **Default:** `Implement '{{title}}' using /atelier-implement file={{file}} plan_path={{planPath}} task_dir={{taskDir}}`

### atelier.promptTemplates.verifyTask

Template for the task verification prompt. See [Verify Skill](/skills/verify/) for details.

- **Default:** `Verify '{{title}}' using /atelier-verify mode=task file={{file}} plan_path={{planPath}} subtasks={{subtasks}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}}`

### atelier.promptTemplates.verifyPlan

Template for the plan verification prompt. See [Verify Skill](/skills/verify/) for details.

- **Default:** `Verify '{{title}}' using /atelier-verify mode=plan file={{file}} subtasks={{subtasks}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}`

### atelier.promptTemplates.verifyManual

Template for the manual approval prompt.

- **Default:** `Mark '{{title}}' as done using /atelier-verify mode=manual file={{file}} task_dir={{taskDir}} task_verification_dir={{taskVerificationReportDir}} plan_verification_dir={{planVerificationReportDir}}`

## Command Settings

Command settings control how Claude Code is invoked. These wrap the rendered prompt in a shell command. The `{{model}}` placeholder is resolved from the corresponding model setting for each action type.

### atelier.commands.plan

Command for planning tasks.

- **Default:** `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate`

### atelier.commands.implement

Command for implementation tasks.

- **Default:** `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate`

### atelier.commands.verifyTask

Command for task verification.

- **Default:** `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate`

### atelier.commands.verifyPlan

Command for plan verification.

- **Default:** `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate`

### atelier.commands.verifyManual

Command for manual approval.

- **Default:** `claude "{{prompt}}" --model {{model}} --permission-mode acceptEdits --disallowedTools TaskCreate TaskUpdate`

## Examples

### Project-Local Task Storage

Store all Atelier files within your project instead of the home directory:

```jsonc
// .vscode/settings.json
{
  "atelier.atelierTaskFilePattern": "{{workspaceFolder}}/.atelier/tasks/**/*.md",
  "atelier.claudeTaskFilePattern": "{{workspaceFolder}}/.atelier/claude-tasks/**/*.json",
  "atelier.taskVerificationFilePattern": "{{workspaceFolder}}/.atelier/verification/tasks/**/*.md",
  "atelier.planVerificationFilePattern": "{{workspaceFolder}}/.atelier/verification/plans/**/*.md"
}
```

### Custom Model Selection

Use different models for different action types:

```jsonc
// .vscode/settings.json
{
  "atelier.models.plan": "opus",
  "atelier.models.implement": "sonnet",
  "atelier.models.verifyTask": "haiku",
  "atelier.models.verifyPlan": "haiku"
}
```

### Custom Claude Invocation

Use a wrapper script or different Claude configuration:

```jsonc
// .vscode/settings.json
{
  "atelier.commands.implement": "my-claude-wrapper --project={{workspaceDir}} \"{{prompt}}\"",
  "atelier.commands.plan": "claude \"{{prompt}}\" --model {{model}} --permission-mode plan"
}
```

### Multiple TODO Files

If your project has multiple TODO files (e.g., per-package in a monorepo), the default pattern already supports this:

```jsonc
// .vscode/settings.json
{
  "atelier.todoFilePattern": "{{workspaceFolder}}/{{taskListId}}/TODO.md",
  "atelier.atelierTaskFilePattern": "{{userHome}}/.atelier/projects/{{workspaceId}}/tasks/{{taskListId}}/**/*.md",
  "atelier.claudeTaskFilePattern": "{{userHome}}/.claude/tasks/{{taskListId}}/**/*.json"
}
```

Each TODO file gets its own `taskListId`, keeping tasks organized separately.
