---
name: fe-guardrails
description: "Frontend development guardrails for Capillary UI projects. 12 categories (FG-01 through FG-12) with CRITICAL and HIGH severity. Referenced by all code-producing agents and the guardrail-checker agent."
---

# Frontend Development Guardrails

> **Scope**: Every agent that reads, analyses, designs, or writes frontend code MUST follow these guardrails. This includes hld-generator, lld-generator, dev-planner, code-generator, build-verifier, visual-qa, test-writer, and guardrail-checker.
>
> **Enforcement**: Each agent reads this file at phase start. Violations are raised as blockers (CRITICAL) or warnings (HIGH).

## Quick Reference

| ID | Category | Priority | Key Rule |
|----|----------|----------|----------|
| FG-01 | Cap UI Import Rules | CRITICAL | Individual file imports only — never barrel imports |
| FG-02 | Organism Anatomy | CRITICAL | Exactly 10 files per organism in dependency order |
| FG-03 | ImmutableJS Patterns | CRITICAL | fromJS/set/get/merge only — no direct mutation |
| FG-04 | Saga Error Handling | CRITICAL | Every catch has notifyHandledException |
| FG-05 | Banned Packages | CRITICAL | No TypeScript, Redux Toolkit, Zustand, Tailwind, axios, Enzyme |
| FG-06 | Auth Headers | HIGH | Never manual — injected by requestConstructor.js |
| FG-07 | Compose Chain | HIGH | Exact order: withSaga → withReducer → withConnect |
| FG-08 | Test Imports | HIGH | From app/utils/test-utils.js only |
| FG-09 | Action Type Naming | HIGH | garuda/OrganismName/VERB_NOUN_REQUEST\|SUCCESS\|FAILURE |
| FG-10 | i18n | HIGH | All user-facing text via formatMessage, no hardcoded strings |
| FG-11 | CSS Naming | HIGH | kebab-case, component-prefixed, Cap UI tokens |
| FG-12 | AI-Specific | CRITICAL | Read before write, follow existing patterns, verify imports |

**CRITICAL** = Violation is an automatic blocker — cannot proceed without fixing.
**HIGH** = Violation is flagged in review — must justify if deviating.

## How Agents Use This File

| Agent | How It Uses Guardrails |
|-------|----------------------|
| **hld-generator** | Designs solutions respecting these guardrails. Flags when a proposed approach would violate one. |
| **lld-generator** | Ensures organism designs specify correct 10-file anatomy and import patterns. |
| **dev-planner** | Plans file generation in correct dependency order. Verifies compose chain in plan. |
| **code-generator** | Checks every generated file against applicable guardrails before writing to disk. |
| **build-verifier** | Categorizes build errors by guardrail category (e.g., import errors → FG-01). |
| **visual-qa** | Uses Cap UI tokens for fixes (FG-11). Never hardcodes pixel values. |
| **test-writer** | Uses correct test imports (FG-08). Mocks bugsnag (FG-04). |
| **guardrail-checker** | Scans all generated files against every guardrail rule. Reports violations. |

## Detailed Rules

See `ref-guardrails.md` for complete rules with code examples for each category.
