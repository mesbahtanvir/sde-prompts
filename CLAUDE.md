# CLAUDE.md - PRD Driven Development

This repository contains the PRD Driven Development (PDD) prompt library and follows PDD for its own development.

## Core Principle

> **No PRD, No Code**

Every meaningful change must start with a PRD in `docs/prd/`.

## Repository Structure

```
docs/prd/           # All PRDs for this project
prompts/
├── core/           # PDD methodology and audit prompts
├── implement/      # Project setup, testing, code quality
└── reference/      # API design, infrastructure, production guides
```

## Development Workflow

### Before ANY Code Change

1. **Check existing PRDs** in `docs/prd/` - is there already a PRD for this?
2. **Create a PRD** if one doesn't exist:
   - Use next available number: `PRD-XXX-short-name.md`
   - Include: Problem, Solution, Acceptance Criteria
3. **Reference the PRD** in commits and PRs

### Git Workflow

> **Never push directly to main**

1. **One PR per PRD** — Each PR implements exactly one PRD
2. **Branch naming** — `feat/prd-XXX-short-name` (must include PRD number)
3. **PR title** — Must reference PRD: `feat(PRD-XXX): Description`
4. Push branch and create PR to merge into main

```bash
# Example workflow for PRD-005
git checkout -b feat/prd-005-user-export
# ... make changes ...
git commit -m "feat(PRD-005): Add user export functionality"
git push -u origin feat/prd-005-user-export
gh pr create --title "feat(PRD-005): Add user export functionality"
```

### Creating a New PRD

```markdown
# PRD-XXX: Title

**Status:** Draft | Ready | In Progress | Done | Abandoned
**Created:** YYYY-MM-DD

## Problem Statement
What problem are we solving? Why does it matter?

## Solution
How will we solve it?

## Acceptance Criteria
- [ ] AC1: Specific, testable criteria
- [ ] AC2: Another testable criteria
```

### Using the Prompts

| When you need to... | Use this prompt |
|---------------------|-----------------|
| Create a new PRD | `prompts/core/00-prd-creation.md` |
| Understand PDD methodology | `prompts/core/01-pdd-methodology.md` |
| Find unimplemented PRD features | `prompts/core/02-audit-features.md` |
| Find missing tests | `prompts/core/03-audit-tests.md` |
| Check PRD vs code alignment | `prompts/core/04-audit-alignment.md` |
| Audit UX and product gaps | `prompts/core/05-audit-ux.md` |
| Find bugs and quality issues | `prompts/core/06-audit-qa.md` |
| Bootstrap a new project | `prompts/implement/project-setup.md` |
| Improve code quality | `prompts/implement/clean-code.md` |
| Add comprehensive tests | `prompts/implement/testing.md` |
| Audit security/performance | `prompts/implement/security-performance.md` |

## Pre-Commit Checks

**Before committing**, always run markdown lint to catch formatting issues:

```bash
npx markdownlint-cli2 "**/*.md" "!node_modules/**" "!cli/node_modules/**"
```

Common issues to avoid:

- **MD029**: Ordered lists should restart at 1 after headings
- **MD012**: No multiple consecutive blank lines
- **MD009**: No trailing spaces
- **MD047**: Files should end with a single newline

## Commit Convention

Reference PRDs in commits:

```text
feat(PRD-001): Add PRD creation prompt

Implements the interactive PRD creation workflow.
Closes PRD-001 AC1, AC2.
```

## Current PRDs

- [PRD-000-foundation.md](docs/prd/PRD-000-foundation.md) - Project bootstrap and vision

## Quick Commands

```bash
# List all PRDs
ls docs/prd/

# Find PRD by keyword
grep -r "keyword" docs/prd/

# Check PRD status
grep "Status:" docs/prd/*.md
```
