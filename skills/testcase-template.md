---
name: testcase-template
description: "Test case Google Sheet template structure extracted from the team's master sheet. Used by testcase-generator to produce correctly formatted output."
---

# Test Case Sheet Template

> **Source**: Extracted from the team's master test case Google Sheet.
> The testcase-generator agent MUST follow this structure exactly when generating test cases.

## Sheet Structure

Each ticket gets its own section in the sheet with TWO parts:

### Part 1: Ticket Metadata Block (top of each section)

| Row | Column A | Column B |
|-----|----------|----------|
| 1 | Ticket | `https://capillarytech.atlassian.net/browse/<TICKET-ID>` |
| 2 | Description | `<ticket summary>` |
| 3 | Module | `Garuda - UI` |
| 4 | Developer/ Owner | `<developer name>` |
| 5 | Sprint | `<sprint name>` |
| 6 | Reviwer, Date | `<reviewer names and date>` |
| 7 | Pull request | `<PR URL — leave empty, filled later>` |
| 8 | Hotswaps detailing | `N/A` |
| 9 | Pre-conditions | `N/A` |
| 10 | Security Impact | `N/A` |

### Part 2: Test Case Table (below metadata)

| Column | Header | Description | Fill Rules |
|--------|--------|-------------|-----------|
| A | Test Case Description | Category label OR specific test description | First row of a category = category name (e.g. "Main Use cases", "Edge case", "Test cases"). Subsequent rows = individual test descriptions. |
| B | Test Steps | What the test does / step-by-step description | Detailed test steps or behavior being tested |
| C | Type | Test type — **DROPDOWN** | Values: `UT`, `Use Case` |
| D | Priority | Priority level — **DROPDOWN** | Values: `P0`, `P1`, `P2` |
| E | Expected Result | What should happen | Leave empty if obvious from test steps |
| F | Actual Result | What actually happened | Leave empty — filled during testing |
| G | Assignee | Who runs the test | Leave empty — filled by QA |
| H | ETA | When test will be run | Leave empty — filled by QA |
| I | Dev Env | Pass/Fail in dev | Leave empty — filled during testing. Values: `PASS`, `FAIL`, empty |
| J | Nightly Env | Pass/Fail in nightly | Leave empty — same values |
| K | Staging Env | Pass/Fail in staging | Leave empty — same values |
| L | Prod Env | Pass/Fail in prod | Leave empty — same values |
| M | Comments | Additional notes | Optional — add source traceability here |

## Dropdown Values (STRICT — only use these)

| Column | Allowed Values |
|--------|---------------|
| Type (C) | `UT`, `Use Case` |
| Priority (D) | `P0`, `P1`, `P2` |
| Env columns (I-L) | `PASS`, `FAIL`, or empty |

## Test Case Categories

Test cases are grouped under category label rows:

| Category Label | What Goes Here |
|---------------|---------------|
| **Main Use cases** | Primary happy-path scenarios — P0/P1 Use Case type |
| **Edge case** | Boundary conditions, error scenarios — P1/P2 |
| **Test cases** | Unit test specifications — UT type, testing specific functions/components |

## Row Format Rules

1. **Category row**: Column A = category name (e.g., "Main Use cases"), columns B-M empty
2. **Test case row**: Column A = empty or sub-description, Column B = test steps, C = Type, D = Priority
3. **Blank row**: Between sections or after the last test case in a category
4. **Agent-filled columns**: A, B, C, D, E, M (Description, Steps, Type, Priority, Expected Result, Comments)
5. **Human-filled columns**: F, G, H, I, J, K, L (Actual Result, Assignee, ETA, all Env columns)

## Mapping: Knowledge Artifact → Test Case

| Knowledge Source | Type | Priority | Category |
|-----------------|------|----------|----------|
| LLD State Design (reducer cases) | UT | P0 | Test cases |
| LLD Saga Workers (success/failure/error paths) | UT | P0 | Test cases |
| LLD Selectors | UT | P1 | Test cases |
| LLD User Interactions (happy path) | Use Case | P0 | Main Use cases |
| Jira Acceptance Criteria | Use Case | P0 | Main Use cases |
| Figma component render verification | UT | P1 | Test cases |
| Prototype interaction flows | Use Case | P0/P1 | Main Use cases |
| ProductEx conflicts (negative tests) | Use Case | P1 | Edge case |
| Product docs business rules | Use Case | P1 | Edge case |
| Boundary/error scenarios | UT | P2 | Edge case |

## Example Output (CSV format)

```csv
Ticket,https://capillarytech.atlassian.net/browse/CAP-12345
Description,Tier Benefits Configuration
Module,Garuda - UI
Developer/ Owner,<from Jira>
Sprint,<from Jira>
"Reviwer, Date",
Pull request,
Hotswaps detailing,N/A
Pre-conditions,N/A
Security Impact,N/A

Test Case Description,Test Steps,Type,Priority,Expected Result,Actual Result,Assignee,ETA,Dev Env,Nightly Env,Staging Env,Prod Env,Comments
Main Use cases,"User can view tier list — page loads and CapTable renders with data",Use Case,P0,"CapTable shows tier rows with Name, Min Points, Max Points, Status columns",,,,,,,,Source: Jira AC-001
,"Search filters tiers — user types in CapInput.Search and table re-fetches with search param",Use Case,P0,"Table shows filtered results matching search text",,,,,,,,Source: Prototype interaction flow
,"Create tier — user clicks Create button, modal opens, fills form, submits",Use Case,P0,"Modal opens with CapInput fields, submission creates new tier",,,,,,,,Source: Jira AC-002
Edge case,"Cannot edit system-managed tier dates — no date picker rendered for start/end dates",Use Case,P1,"Date fields are read-only or not shown",,,,,,,,Source: ProductEx conflict
,"Empty tier list — when no tiers exist, shows empty state",Use Case,P2,"CapRow with empty state message shown instead of CapTable",,,,,,,,Source: Product docs
Test cases,"Reducer returns initial state when no action dispatched",UT,P0,"state equals initialState with tiers=[], loading=false, error=null",,,,,,,,Source: LLD State Design
,"fetchTiersWorker success — API returns success:true with tier data",UT,P0,"dispatches FETCH_TIERS_SUCCESS with data array",,,,,,,,Source: LLD Saga Workers
,"fetchTiersWorker failure — API returns success:false",UT,P0,"dispatches FETCH_TIERS_FAILURE, calls notifyHandledException",,,,,,,,Source: LLD Saga Workers
,"fetchTiersWorker error — API throws exception",UT,P0,"catches error, calls notifyHandledException, dispatches FAILURE",,,,,,,,Source: LLD Saga Workers
,"makeSelectTiers returns tiers.toJS()",UT,P1,"Returns plain JS array, not Immutable List",,,,,,,,Source: LLD Selectors
,"Renders CapTable with correct columns (Name, Min, Max, Status)",UT,P1,"4 columns rendered with correct dataIndex values",,,,,,,,Source: Figma component inventory
```
