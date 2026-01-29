# PRD-009: Rename Commands for Clarity

**Status:** In Progress
**Created:** 2026-01-29

---

## Problem Statement

Current PDD command names are unintuitive and confusing:
- `/pdd-new` — unclear if it's for bugs or features
- `/pdd-status` — what status?
- `/pdd-update` — updating what?
- `/pdd-features` — what features? feels like PDD features
- `/pdd-tests` — feels like testing PDD itself
- `/pdd-ux` — UX for PDD?
- `/pdd-qa` — not clear what it does

Users can't understand what commands do without reading documentation.

## Solution

Rename commands to clearly indicate what they do:

### PRD Management
| Old | New | Description |
|-----|-----|-------------|
| `/pdd-new` | `/pdd-prd-create` | Create a new PRD |
| `/pdd-status` | `/pdd-prd-list` | List all PRDs with status |

### Find Gaps (each outputs a PRD)
| Old | New | Description |
|-----|-----|-------------|
| `/pdd-features` | `/pdd-find-unimplemented` | Find PRD features not coded |
| `/pdd-tests` | `/pdd-find-untested` | Find code without tests |
| `/pdd-alignment` | `/pdd-find-drift` | Find code that doesn't match PRD |
| `/pdd-ux` | `/pdd-find-ux-issues` | Find UX problems |
| `/pdd-qa` | `/pdd-find-bugs` | Find bugs/quality issues |

### Tooling
| Old | New | Description |
|-----|-----|-------------|
| `/pdd-update` | `/pdd-upgrade` | Upgrade CLI tool |
| `/pdd-init` | `/pdd-init` | No change |
| `/pdd-help` | `/pdd-help` | No change |

### Naming Pattern
- `/pdd-prd-*` — operations on PRD documents
- `/pdd-find-*` — discover gaps (each outputs a PRD)
- `/pdd-*` — tooling commands

## Acceptance Criteria

- [ ] AC1: `/pdd-prd-create` command exists and creates PRDs
- [ ] AC2: `/pdd-prd-list` command exists and lists PRDs with status
- [ ] AC3: `/pdd-find-unimplemented` finds missing features and outputs a PRD
- [ ] AC4: `/pdd-find-untested` finds untested code and outputs a PRD
- [ ] AC5: `/pdd-find-drift` finds code/PRD mismatches and outputs a PRD
- [ ] AC6: `/pdd-find-ux-issues` finds UX problems and outputs a PRD
- [ ] AC7: `/pdd-find-bugs` finds bugs and outputs a PRD
- [ ] AC8: `/pdd-upgrade` command exists and updates CLI
- [ ] AC9: Old command names are removed
- [ ] AC10: README.md updated with new command names
- [ ] AC11: `/pdd-help` displays new command names

## Out of Scope

- Adding new commands (only renaming existing ones)
- Changing command behavior (only names change)
- Backward compatibility aliases (clean break)

## Technical Notes

- Rename files in `cli/commands/` directory
- Update `lib/commands.js` to reference new filenames
- Update all documentation referencing old names
- Bump version to indicate breaking change

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-29 | PRD created |
