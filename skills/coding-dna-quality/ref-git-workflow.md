# Git Workflow

## Branch Naming

| Pattern | Example | When |
|---|---|---|
| Ticket-based | `CAP-179373` | Feature or bug fix tied to Jira |
| Feature prefix | `Feature/CAP-179373` | New feature |
| Bug prefix | `Bug/CAP-102461` | Bug fix |
| Owner suffix | `CAP-179373/falanshS` | Developer attribution |
| Version branch | `37.10.0` | Release preparation |

## Commit Message Format

```
CAP-174901 | Phase 2 | loyalty-node-api-service CVE update (#2595)
Added thrift call for source tracking attribute (#2617)
Tag push 1 282 0 (#2616)
isAggregate and rounding strategy node changes (#2590)
```

### Conventions

- **Jira ticket** prefix when applicable: `CAP-XXXXXX |`
- **PR number** in parentheses at end: `(#2617)`
- **Descriptive subject line** — what was done
- Tag/release commits: `Tag push MAJOR MINOR PATCH`
- No strict conventional commits format (not `feat:`, `fix:`, etc.)

## Release Process

- Version tracked in root `version` file
- Format: `MAJOR.MINOR.PATCH` (e.g., `1.282.0`)
- Tag push commits create version entries
- Separate tag push PRs for version bumps

## Pre-commit Hooks

### Gitleaks (Root Level)

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.1
    hooks:
      - id: gitleaks
```

Scans for secrets in staged changes.

### Husky + lint-staged (Webapp)

```sh
# webapp/.husky/pre-commit
cd webapp
npm run test:staged
```

`test:staged` runs lint-staged which:
1. ESLint fix on `*.js` files
2. Prettier write on `*.json` files
3. Re-stage fixed files

### Husky (API)

```sh
# api/.husky/pre-commit
cd api
npm test
```

Runs full test suite before commit.

## CI/CD

### GitHub Actions

- **gitleaks_secret_scan.yml**: Runs on PR open/sync to main/master
- Uses Capillary's reusable workflow

### Dependabot

```yaml
# .github/dependabot.yml
- package-ecosystem: npm
  directory: /api
  schedule: weekly
  open-pull-requests-limit: 0  # Auto-close PRs
  commit-message:
    prefix: chore
  labels: [dependabot-open, dependencies]
```

Configured for both `/api` and `/webapp`. Auto-labels PRs, ignores major version bumps.

### AppVeyor (Webapp)

- Runs on: Node current + LTS
- Steps: npm ci → npm test → npm run build
- Caches `node_modules`

## Code Quality

### SonarQube

Both webapp and api have `sonar-project.properties` and `npm run sonar` scripts.

### Bundle Size

```json
[{ "path": "./dist/main.*.js", "limit": "2 MB" }]
```

Enforced via `size-limit` package.

## No PR Template or CODEOWNERS

- No `.github/PULL_REQUEST_TEMPLATE.md`
- No `CODEOWNERS` file
