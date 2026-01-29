# PRD-006: GitHub Actions Workflows

**Status:** In Progress
**Created:** 2026-01-29

---

## Problem Statement

The prd-driven-dev repository lacks essential CI/CD workflows. Currently:
- No automated linting or validation on PRs
- Manual npm publishing process (error-prone)
- No enforcement of PDD conventions (branch naming, PRD references)
- No validation that PRs actually include PRD changes (enforcing "No PRD, No Code")

This slows development and risks publishing broken packages or accepting PRs that don't follow the methodology.

## Solution

Add four GitHub Actions workflows:

### 1. CI/Lint (`ci.yml`)
Runs on PRs and pushes to main:
- Lint JavaScript files with ESLint
- Lint markdown files with markdownlint
- Validate JSON syntax

### 2. npm Publish (`publish.yml`)
Runs on GitHub release creation:
- Automatically publish package to npm
- Uses `NPM_TOKEN` secret for authentication

### 3. PR Validation (`pr-check.yml`)
Runs on PRs to main:
- Validate branch naming convention (`feat/prd-XXX-*`, `fix/prd-XXX-*`, or `docs/prd-*`)
- Validate PR title contains PRD reference
- **Require PR includes a change to a PRD file** (enforces "No PRD, No Code")
- Allow exceptions for specific PR types (CI, deps, docs-only)

### 4. PRD Quality Check (`prd-quality.yml`)
Runs on PRs that modify `docs/prd/*.md`:
- Validate PRD has required sections (Problem Statement, Solution, Acceptance Criteria)
- Validate PRD has valid status (Draft, In Progress, Done, Abandoned)
- Check acceptance criteria format (must be checkboxes `- [ ]` or `- [x]`)
- Warn if PRD is missing Out of Scope section

## Acceptance Criteria

**CI/Lint Workflow:**
- [ ] AC1: Workflow runs on every PR to main
- [ ] AC2: Workflow runs on every push to main
- [ ] AC3: JavaScript files in `cli/` are linted with ESLint
- [ ] AC4: Markdown files are linted with markdownlint
- [ ] AC5: PR is blocked if linting fails

**npm Publish Workflow:**
- [ ] AC6: Workflow triggers when a GitHub release is created
- [ ] AC7: Package is published to npm registry automatically
- [ ] AC8: Workflow uses `NPM_TOKEN` secret for authentication
- [ ] AC9: Publish only runs from `cli/` directory

**PR Validation Workflow:**
- [ ] AC10: Workflow runs on every PR to main
- [ ] AC11: Fails if branch name doesn't match `feat/prd-XXX-*`, `fix/prd-XXX-*`, or `docs/prd-*` pattern
- [ ] AC12: Fails if PR title doesn't contain `PRD-XXX` reference
- [ ] AC13: Fails if PR doesn't include a change to a file in `docs/prd/`
- [ ] AC14: Fails if PR changes more than one PRD file (one PRD per PR)
- [ ] AC15: Allows exceptions via `[skip-prd]` in PR title for CI/deps/docs-only changes

**PRD Quality Workflow:**
- [ ] AC16: Workflow runs on PRs that modify files in `docs/prd/`
- [ ] AC17: Validates PRD contains required sections: Problem Statement, Solution, Acceptance Criteria
- [ ] AC18: Validates PRD status is one of: Draft, In Progress, Done, Abandoned
- [ ] AC19: Validates acceptance criteria use checkbox format (`- [ ]` or `- [x]`)
- [ ] AC20: Warns (doesn't fail) if Out of Scope section is missing

## Out of Scope

- Unit test framework setup (no tests exist yet)
- Code coverage reporting
- Deployment workflows (library, not a service)
- Complex release automation (CHANGELOG generation, etc.)
- Auto-incrementing PRD numbers

## Technical Notes

- ESLint config should be minimal (standard JS rules)
- markdownlint should allow flexibility for prompt files
- `NPM_TOKEN` must be added as a repository secret
- PRD quality check uses grep/regex to validate markdown structure
- Exception pattern `[skip-prd]` allows bypassing PRD requirement for infrastructure PRs

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-29 | PRD created |
| 2026-01-29 | Added PRD quality workflow and PR change requirement |
