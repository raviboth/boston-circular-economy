---
name: atelier-brainstorm
description: Interactive brainstorming skill that explores a TODO item through guided questions and adds nested bullet points back to the TODO file under the specific item.
---

# Atelier Brainstorm Skill

This skill helps you think through a TODO item interactively. It asks clarifying questions to explore the idea from multiple angles, then adds nested bullet points back to the TODO file capturing the insights.

## When to Use

Use this skill when:
- You have a TODO item and want to think through solutions or approaches before planning
- You want to capture rough analysis notes inline in your TODO file
- You have a bug and want to explore root causes and potential fixes
- You have a feature idea and want to explore design options quickly

## Arguments

- `todo_path` - (REQUIRED) Absolute path to the TODO.md file containing the item to brainstorm.
- `todo` - (OPTIONAL) The exact text of the TODO item to brainstorm. If not provided, the skill will ask which item to brainstorm.

## Workflow

### Phase 1: Find the TODO Item

Read the TODO.md file and identify the item to brainstorm:

**Actions:**
1. Read the file at `todo_path`
2. If `todo` argument is provided, search for that exact text in the file
3. If `todo` argument is not provided, find all unchecked items (`- [ ] ...`) and use `AskUserQuestion` to let the user select which to brainstorm
4. Confirm which item you'll be brainstorming

**Use TodoWrite** to track your progress:
```
- [ ] Find the TODO item
- [ ] Determine brainstorm mode
- [ ] Ask brainstorming questions
- [ ] Synthesize bullet points
- [ ] ⛔ MANDATORY: Update TODO.md with nested bullets
```

### Phase 2: Determine Brainstorm Mode

Use `AskUserQuestion` to understand what kind of thinking the user wants:

```json
{
  "questions": [{
    "question": "What would you like to explore for this TODO?",
    "header": "Focus",
    "options": [
      {"label": "Root cause & fixes", "description": "Dig into why this is happening and explore what could fix it (best for bugs)"},
      {"label": "Approach & design", "description": "Explore how to implement or structure the solution (best for features)"},
      {"label": "Open exploration", "description": "Free-form brainstorm across any relevant angles"}
    ],
    "multiSelect": false
  }]
}
```

**Based on the user's choice**, adapt the questions in Phase 3.

### Phase 3: Ask Brainstorming Questions

Use `AskUserQuestion` to explore the idea. Tailor questions to the brainstorm mode. It is OK to do a quick codebase search (Grep, Glob, Read) between questions to make your suggestions more grounded.

**For "Root cause & fixes"**, ask questions like:

1. "What do you know about when or why this happens?"
   - Options: has specific reproduction steps, intermittent/not always, related to a recent change, unknown

2. "Where in the code is the issue most likely?"
   - Based on the TODO description, offer likely code areas as options (use Grep/Glob to find them first)

3. "What constraints apply to the fix?"
   - Options: must be minimal/targeted, open to refactoring, performance-sensitive, needs to be backwards compatible

**For "Approach & design"**, ask questions like:

1. "What's the primary design decision here?"
   - Offer 2-4 options based on the TODO description

2. "Are there known constraints?"
   - Options: must use existing APIs, new libraries are OK, needs to be fast, minimal surface area preferred

3. "How broad should the solution be?"
   - Options: minimal/targeted, moderate scope, comprehensive, explore multiple paths

**For "Open exploration"**, ask 2-3 open-ended questions to surface useful angles:

1. "What do you already know or have tried?"
2. "What's the most uncertain or risky part?"
3. "What would a great outcome look like?"

**IMPORTANT:** Use `AskUserQuestion` for every question. Do not proceed without user input. After each answer, briefly summarize what you've learned before asking the next question.

### Phase 4: Synthesize Bullet Points

After gathering input, reason through the problem and generate bullet points that capture the key insights.

**Format:**
- One insight per bullet — concise and scannable
- Use prefixes to make bullets easy to parse: `Root cause:`, `Fix:`, `Consider:`, `Nice-to-have:`
- Be specific: reference file names, component names, or CSS classes when known
- Distinguish between confirmed facts and hypotheses
- Use sub-bullets only for tightly related details

**Example for a bug:**
```
- Root cause: flex containers without `min-w-0` prevent `truncate` from working
- Fix: add `min-w-0` to the card content wrapper in `ItemCard.tsx`
- Fix: add `overflow-hidden` to the card wrapper to contain content
- Consider: add `overflow-x: hidden` to the column as a belt-and-suspenders guard
- Nice-to-have: middle-truncation for filenames to preserve the extension
```

**Example for a feature:**
```
- Approach: use a `useSearch` hook that filters the item list reactively on each keystroke
- Add 300ms debounce to avoid re-filtering on every keystroke
- Filter on: title, filename, tags
- Consider: highlight matching text in results
- Consider: persist last search query in VS Code workspace state across sessions
```

Before writing to the file, show the user what you will add:

> "Here are the bullet points I'll nest under your TODO item — writing them now."

### Phase 5: Update TODO.md (⛔ MANDATORY)

**⛔ THIS PHASE IS MANDATORY. DO NOT END THE SKILL WITHOUT COMPLETING IT.**

Use the `Edit` tool to add nested bullet points under the specific TODO item.

**Rules:**
- Find the EXACT line of the TODO item in the file (match the text precisely)
- Add the bullets as **indented sub-items** (2-space indent) immediately after that line
- If nested bullets already exist under the item, append your new bullets after the existing ones
- Do NOT modify the parent TODO item line itself — do not check it off, do not change its text
- Do NOT add a blank line between the parent todo and the first nested bullet

**Before:**
```markdown
- [ ] BUG: Long filenames in todos causes column to scroll horizontally
```

**After:**
```markdown
- [ ] BUG: Long filenames in todos causes column to scroll horizontally
  - Root cause: flex containers without `min-w-0` prevent `truncate` from working
  - Fix: add `min-w-0` to the card content wrapper in `ItemCard.tsx`
  - Fix: add `overflow-hidden` to the card wrapper to contain content
```

**⛔ VERIFICATION REQUIRED:** After calling Edit, confirm the change was applied. If Edit fails, tell the user and show them the bullets as text they can paste manually, then end gracefully.

## Error Handling

- **TODO item not found**: If the `todo` argument text doesn't match any line in the file, show the user a list of unchecked items and ask which one to target.
- **Multiple matches**: If the TODO text appears more than once, show context around each match and ask the user which one to update.
- **Edit fails**: Tell the user, display the bullets as copyable text, and end gracefully.

## Tools Used

- `Read` - Read TODO.md to find the item
- `AskUserQuestion` - Guide the brainstorm interactively (⛔ MANDATORY)
- `Edit` - Add nested bullets under the TODO item (⛔ MANDATORY in Phase 5)
- `Grep` / `Glob` / `Read` - Optional codebase searches to ground suggestions in real code
- `TodoWrite` - Track skill progress within the session (ephemeral only)

---

## ⛔ FINAL CHECKLIST

Before ending, verify ALL of these are complete:

1. ✅ Brainstorm mode chosen via AskUserQuestion
2. ✅ 2-4 brainstorming questions asked and answered
3. ✅ Bullet points synthesized and shown to user
4. ✅ TODO.md updated with nested bullets under the correct item

**If item 4 is not complete, GO BACK and complete it before ending.**
