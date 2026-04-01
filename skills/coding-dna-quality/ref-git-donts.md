# Git — Do Not

> These are default standards. If the user explicitly asks to override any of these, follow the user's instruction. If you spot a better approach, suggest it using the format from [[00-how-to-use#Override Policy]].

## Do Not Commit Secrets

- **Anti-pattern**: API keys, tokens, or credentials in committed code
- **Why**: Gitleaks pre-commit hook will block it. Also a security violation.
- **Instead**: Use environment variables. See `.env.template` for the expected shape.

## Do Not Commit console.log Statements

- **Anti-pattern**: Debug logging left in committed code
- **Why**: ESLint warns on `console` usage. Pre-commit lint will flag it.
- **Instead**: Remove debug logs before committing. Use Bugsnag for error tracking.

## Do Not Skip Pre-commit Hooks

- **Anti-pattern**: `git commit --no-verify`
- **Why**: Hooks run ESLint, tests, and secret scanning. Skipping risks broken code and leaked secrets.
- **Instead**: Fix the issues that the hooks flag.

## Do Not Create Branches Without Ticket Reference

- **Anti-pattern**: `git checkout -b fix-something`
- **Why**: Branch names tie work to Jira tickets for traceability.
- **Instead**: `git checkout -b CAP-XXXXXX` or `Feature/CAP-XXXXXX`.
