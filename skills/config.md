# Pipeline Configuration — Single Source of Truth

> All agents and commands MUST read values from this file.
> NEVER hardcode these values in agent or command files.

## Application Config

| Key | Value | Used By |
|-----|-------|---------|
| `app_name` | (target repo name) | All agents |
| `dev_port` | 8000 | visual-qa, dev-execute |
| `url_prefix` | /loyalty/ui/v3 | visual-qa, dev-execute |
| `dev_url` | http://localhost:8000/loyalty/ui/v3 | visual-qa |
| `figma_access_token_env_var` | FIGMA_ACCESS_TOKEN | visual-qa (pixel diff mode) |

## Authentication Config

| Key | Value | Used By |
|-----|-------|---------|
| `auth_browser_login_url` | /auth/login | visual-qa (browser login page URL) |
| `auth_api_endpoint_path` | /arya/api/v1/auth/login | visual-qa login.js (API endpoint) |
| `auth_username_env_var` | GARUDA_USERNAME | visual-qa login.js |
| `auth_password_env_var` | GARUDA_PASSWORD | visual-qa login.js |
| `auth_base_url_env_var` | GARUDA_INTOUCH_BASE_URL | visual-qa login.js |
| `auth_org_id_env_var` | GARUDA_ORG_ID | visual-qa login.js (optional override) |
| `auth_default_base_url` | nightly.intouch.capillarytech.com | visual-qa login.js (fallback) |
| `runtime_context_file` | runtime_context.json | Orchestrator writes this to workspace with route_params, query_params, full_url_override. Read by build-verifier + visual-qa. |

## Confluence Config

| Key | Value | Used By |
|-----|-------|---------|
| `default_confluence_space` | LOYALTY | pre-dev, generate-hld, generate-lld |
| `hld_page_title_format` | [HLD] {feature_name} - {jira_id} | hld-generator |
| `lld_page_title_format` | [LLD] {feature_name} - {jira_id} | lld-generator |
| `testcase_sheet_title_format` | [Test Cases] {feature_name} - {jira_id} | testcase-generator |

## Google Drive Config

| Key | Value | Used By |
|-----|-------|---------|
| `google_drive_folder_id` | (user-configured, optional) | testcase-generator — folder to create test case sheets in |
| `testcase_template_sheet_id` | 1OafzdLCJzGPtlUY2XGwDcOmaDrPw2cdzwImQB33ooF4 | testcase-generator — master Google Sheet file ID. Template structure is pre-extracted in `skills/testcase-template.md`. Pipeline skips asking and uses this directly. |

## Pipeline Limits

| Key | Value | Used By |
|-----|-------|---------|
| `qa_circuit_breaker_stale_limit` | 5 | visual-qa — stop loop if no improvement for this many consecutive iterations |
| `max_code_gen_retries` | 3 | dev-execute |
| `max_organisms_per_lld` | 3 | lld-generator |
| `dev_server_startup_wait_seconds` | 60 | visual-qa |
| `visual_qa_mismatch_threshold` | 5 | visual-qa (exit loop when mismatch < this %) |
| `visual_qa_viewport_width` | 1280 | visual-qa (Playwright viewport) |
| `visual_qa_viewport_height` | 800 | visual-qa (Playwright viewport) |
| `visual_qa_page_load_wait_ms` | 3000 | visual-qa (wait after page load before screenshot) |
| `visual_qa_pixelmatch_threshold` | 0.1 | visual-qa (per-pixel tolerance for pixelmatch) |
| `figma_decompose_max_depth` | 2 | figma-decomposer (max recursive decomposition depth) |
| `figma_decompose_max_sections` | 20 | figma-decomposer (max sub-frames to fetch per frame) |
| `confluence_max_page_size_kb` | 50 | hld-generator, lld-generator, confluence-publisher (chunk if content exceeds this) |
| `max_queries_per_phase` | 5 | All agents (prevent query flooding — group related queries) |
| `auto_resolve_confidence_threshold` | C4 | All agents (below this = must query user if not documented) |

## Transcript Processing

| Key | Value | Used By |
|-----|-------|---------|
| `transcript_chunk_threshold_words` | 20000 | prd-ingestion |
| `transcript_chunk_size_words` | 5000 | prd-ingestion |
| `transcript_max_summary_words` | 3000 | prd-ingestion |

## Coverage Targets

| Key | Value | Used By |
|-----|-------|---------|
| `coverage_line_target` | 90 | testcase-generator, test-writer, test-evaluator, dev-execute |
| `coverage_branch_reducer_target` | 100 | testcase-generator, test-writer |
| `coverage_worker_saga_target` | 100 | testcase-generator, test-writer |
| `coverage_component_target` | 80 | testcase-generator, test-writer |
| `coverage_partial_threshold` | 70 | test-evaluator |

## Codebase Scout Limits

| Key | Value | Used By |
|-----|-------|---------|
| `scout_max_lines_per_file` | 50 | codebase-scout |
| `scout_max_lines_endpoints` | 200 | codebase-scout |
| `scout_max_grep_results` | 50 | codebase-scout, codebase-comprehension |
| `scout_target_seconds` | 30 | codebase-scout |

## Bandwidth Estimate Defaults

| Key | Value | Used By |
|-----|-------|---------|
| `bandwidth_simple_organism_days` | 2-3 | hld-generator |
| `bandwidth_medium_organism_days` | 4-5 | hld-generator |
| `bandwidth_complex_organism_days` | 6-8 | hld-generator |
| `bandwidth_page_days` | 1-2 | hld-generator |
| `bandwidth_buffer_percent` | 20 | hld-generator |
| `bandwidth_test_buffer_percent` | 30 | hld-generator |

## Workspace Paths

| Key | Value | Used By |
|-----|-------|---------|
| `workspace` | .claude/workspace/{jiraTicketId}/ | /gix (all modes) |

## Reference Organisms (for CREATE intent)

| Key | Value | Used By |
|-----|-------|---------|
| `reference_organism_1` | app/components/organisms/AudienceList | codebase-comprehension |
| `reference_organism_2` | app/components/organisms/EnrolmentConfig | codebase-comprehension |
