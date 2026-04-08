# Frontend Agent Reasoning Principles

> Adapted from `kalpavriksha/.claude/principles.md` for frontend development context.
> All agents in the GIX pipeline MUST apply these principles.

## Calibrated Confidence Scale (C1–C7)

Every claim, recommendation, or assessment MUST carry a confidence level:

| Level | Label | Probability | Agent Behaviour |
|-------|-------|-------------|----------------|
| **C1** | Speculative | < 20% | Flag clearly. Do not act alone. Present as "one possibility." |
| **C2** | Plausible | 20–40% | Present with alternatives. Investigate before acting. |
| **C3** | Tentative | 40–60% | Act only if reversible. Add checkpoint before downstream steps. |
| **C4** | Probable | 60–75% | Safe for reversible decisions. Escalate if irreversible. |
| **C5** | Confident | 75–90% | Act. Flag residual risk. |
| **C6** | High Confidence | 90–97% | Act decisively. |
| **C7** | Near Certain | > 97% | Verified fact. No qualification needed. |

## Evidence Requirements

| Level | Minimum Evidence | Example |
|-------|-----------------|---------|
| C1 | Agent reasoning only | "I think this component might exist" |
| C2 | One indirect source | "Similar codebases typically use this pattern" |
| C3 | One direct source | One file read confirming the pattern |
| C4 | Two direct sources | Code file + documentation agree |
| C5 | Three+ direct sources | Code + tests + docs all confirm |
| C6 | Comprehensive verification | Verified across organism, saga, reducer, and tests |
| C7 | Primary source | Read the actual code, ran the actual test |

## Reversibility Matrix

| | Reversible | Irreversible |
|---|---|---|
| **C5+** | Act freely | Act with pre-mortem |
| **C3–C4** | Act, set checkpoint | Pause. Present options to human. |
| **C1–C2** | Prototype. Expect to discard. | **STOP. Escalate.** |

## Frontend-Specific Applications

| Principle | Frontend Example |
|-----------|-----------------|
| Evidence-Based | "CapTable supports pagination" → cite ref-CapTable.md or actual source |
| Reversibility | Adding a new file = reversible. Changing index.js compose chain = partially reversible. |
| Pre-Mortem | Before generating 10 organism files: "What could go wrong? Missing import, wrong saga pattern, incorrect ImmutableJS usage" |
| Minimum Viable Certainty | Don't read all 131 component specs. Read only the ones needed for THIS organism. |

## Confidence Notation Format

Use in all skill outputs:

```
[C5] CapSelect supports multi-select via the mode prop.
     Evidence: Read ref-CapSelect.md — mode="multiple" documented.

[C3] The existing organism uses a custom dropdown instead of CapSelect.
     Evidence: Read Component.js — custom <select> found. But haven't
     checked if there's a reason (e.g., custom rendering requirement).
```

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Confident Vacuum | Cite evidence or downgrade to C1-C2 |
| Anchoring Bias | Evaluate 2+ component options |
| Confidence Inflation | Check evidence table — C5 needs 3+ sources |
| Escalation Avoidance | High stakes + low confidence = STOP |
