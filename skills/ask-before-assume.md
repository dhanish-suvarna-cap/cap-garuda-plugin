# Ask-Before-Assume Protocol

> **Every agent in the GIX pipeline MUST follow this protocol.**
> Never silently assume when facing ambiguity. Ask the user first.

## Core Rule

**If you are less than 60% confident (C3 or below) about an irreversible decision, you MUST escalate to the user.** Do not guess. Do not pick a default. Write the query to `pending_queries.json` and continue working on parts that don't depend on the answer.

## When to Ask the User (MUST query — never assume)

| Category | Examples | Why |
|----------|----------|-----|
| **Requirements ambiguity** | "Should this field be editable or read-only?", "Does this list need pagination?", "Is this feature for all orgs or specific ones?" | Wrong assumption = wrong feature |
| **Architecture decisions** | "New organism or extend existing?", "Separate page or modal?", "One organism or split into two?" | Wrong structure = expensive rework |
| **API contract gaps** | "What's the error response shape?", "Is this endpoint paginated?", "What params does the API accept?" | Wrong API = broken integration |
| **Component choice** | "CapSelect or CapRadioGroup for 4 options?", "CapTable or card list for this data?" | Only if NOT specified in LLD/Figma |
| **Business logic** | "What happens on empty form submit?", "Default sort order?", "Max retries on failure?" | Wrong logic = bugs in production |
| **Scope boundaries** | "Handle this edge case?", "Include empty state?", "Support mobile?" | Over/under-scoping wastes effort |
| **Data assumptions** | "Is this field nullable?", "Max items in list?", "Date format?" | Wrong data shape = runtime errors |

## When NOT to Ask (agent decides autonomously)

| Category | Why Agent Decides |
|----------|-------------------|
| Code patterns (shared-rules) | Documented in `skills/shared-rules.md` |
| Cap UI component props | Documented in `skills/cap-ui-library/ref-*.md` |
| File structure (10-file anatomy) | Documented in `skills/atomic-design-rules.md` |
| Import order | Documented in `skills/shared-rules.md` Section 14 |
| Design tokens (spacing, colors) | Documented in `skills/coding-dna-styling/` |
| Redux patterns (ImmutableJS, saga) | Documented in `skills/coding-dna-state-and-api/` |
| Test patterns | Documented in `skills/coding-dna-testing/` |

**Rule**: If the answer exists in a skill file, config, PRD, LLD, or Figma decomposition — use it. Don't ask the user for something already documented.

## Decision Flow

```
Agent encounters a decision point
  |
  v
1. Check documented sources:
   PRD → LLD → Figma decomposition → shared-rules → config → coding-dna-*
   |
   ├─ Answer found → Use it. Log decision in approach_log.md. Confidence C5+.
   |
   └─ Answer NOT found → Assess confidence
       |
       ├─ C4+ (>60%) AND reversible → Agent decides. Log in approach_log.md.
       |
       ├─ C4+ (>60%) AND irreversible → Agent decides but marks as non-blocking query
       |   (user can review and correct)
       |
       ├─ C3 or below AND reversible → Agent makes provisional choice.
       |   Write non-blocking query. Continue working.
       |
       └─ C3 or below AND irreversible → MUST escalate.
           Write blocking query. Skip dependent work. Continue non-dependent work.
```

## How to Write a Query

Write to `{workspacePath}/pending_queries.json`. If the file already exists, read it first and append to the `queries` array.

```json
{
  "queries": [
    {
      "id": "q-<phase>-<sequential number>",
      "phase": "<current phase name>",
      "agent": "<agent name>",
      "category": "<requirements|architecture|api_contract|component_choice|business_logic|scope|data>",
      "question": "<Clear, specific question. Not 'What should I do?' but 'Should the tier list be paginated or show all items?'>",
      "context": "<Why this matters. What you've already checked. What the implications are.>",
      "options": [
        {
          "key": "A",
          "label": "<Short label>",
          "implication": "<What changes if this option is chosen>"
        },
        {
          "key": "B",
          "label": "<Short label>",
          "implication": "<What changes if this option is chosen>"
        }
      ],
      "default": null,
      "confidence": "<C1|C2|C3>",
      "blocking": true,
      "asked_at": "<ISO 8601 timestamp>"
    }
  ]
}
```

### Field Rules

- **`id`**: Format `q-<phase>-<N>`. E.g., `q-hld-001`, `q-codegen-003`
- **`question`**: Must be specific and answerable. Bad: "What should I do about the API?" Good: "The PRD mentions a 'tier benefits' API but doesn't specify the response shape. Should I assume { tiers: [{ id, name, benefits: [] }] } or ask the backend team?"
- **`options`**: 2-4 options. Each with a clear implication. If there's a natural default, set `default` to that option's key.
- **`blocking`**: Set `true` if you literally cannot proceed without the answer. Set `false` if you made a provisional choice but the user should review.
- **`confidence`**: Must be C3 or below (otherwise you should decide, not ask)

### Max Queries Per Phase

Do not exceed `max_queries_per_phase` from `skills/config.md` (default 5). If you have more than 5 ambiguities, group related ones into a single query with compound options. If ambiguity is systemic (e.g., entire PRD is vague), escalate as ONE blocking query: "The PRD lacks specific requirements. Please provide more detail on: [list]."

## How to Read Answers

Before starting work, check if `{workspacePath}/query_answers.json` exists. If yes, read it:

```json
{
  "answers": [
    {
      "query_id": "q-hld-001",
      "selected_option": "A",
      "user_note": "Yes, make it a separate organism. We'll need different permissions.",
      "answered_at": "<ISO 8601 timestamp>"
    }
  ]
}
```

If an answer exists for a query you were about to write — use the answer instead of re-asking.

## What the Orchestrator Does

After each agent completes, the orchestrator (`/gix`):
1. Reads `pending_queries.json`
2. Presents blocking queries to the user (with options)
3. Waits for answers
4. Writes answers to `query_answers.json`
5. If answers affect the just-completed phase: re-runs the agent
6. Presents non-blocking queries as reviewable assumptions
7. Clears resolved queries

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | Fix |
|---|---|---|
| "I'll just pick option A" | User might need B. Wrong assumption = rework. | Write a query. |
| "The PRD probably means X" | "Probably" = C3. Not certain. | Check sources. If not found, query. |
| "This is how it's usually done" | Usual != correct for THIS feature. | Query if it matters. |
| "I'll ask about everything" | Query flooding wastes user's time. | Only ask for C3-or-below + not-documented. |
| "I'll decide and not log it" | Invisible assumption = invisible risk. | Always log in approach_log.md. |
