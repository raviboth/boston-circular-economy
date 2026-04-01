# Claude Code Guide for atelier-verify

## Capabilities

- subagents: true (Explore for evidence gathering)

## Evidence Gathering (Phase 3)

Use the `Agent` tool with `subagent_type="Explore"` to launch parallel evidence-gathering agents. For task verification with multiple acceptance criteria, launch one Explore agent per criterion (or batch 2-3 related criteria) to search changed files for evidence.

Each agent receives:
- The criterion text to verify
- The list of changed files from Phase 2 (git diff)
- Instructions to return `file:line` references and short code snippets as evidence

**Example:**
```
Agent(subagent_type="Explore", prompt="Search for evidence that criterion 'Theme preference is persisted to localStorage' is satisfied. Changed files: [list]. Return file:line references and code snippets showing localStorage usage for theme storage.")
```

This keeps deep code analysis out of the main context and allows parallel evidence collection across criteria.

**When to use subagents vs direct tools:**
- **3+ criteria**: Launch parallel Explore agents (one per criterion or batch related ones)
- **1-2 criteria**: Use direct Grep/Read in the main context — subagent overhead isn't worth it
- **Plan mode** (`mode=plan`): Do NOT use subagents — plan verification aggregates existing task results without analyzing code

**After agents return**, synthesize their findings in the main context:
1. Collect evidence summaries from each agent
2. Determine status per criterion (Met/Partial/Not Met)
3. Continue to Phase 4 (Generate Verification Report)
