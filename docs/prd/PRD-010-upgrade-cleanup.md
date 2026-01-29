# PRD-010: Upgrade Cleanup of Deprecated Commands

**Status:** Done
**Created:** 2026-01-29

---

## Problem Statement

When users upgrade PDD to a new version, deprecated commands remain in `~/.claude/commands/` alongside new commands. This causes confusion as users see obsolete commands (e.g., `pdd-new`) mixed with current ones (e.g., `pdd-prd-create`).

## Solution

Implement a "clean slate" approach in the upgrade process: before installing new command files, delete all existing `pdd-*` files from `~/.claude/commands/`. This ensures only the current version's commands are present after upgrade.

## Acceptance Criteria

- [x] AC1: Running `/pdd-upgrade` deletes all `pdd-*` files from `~/.claude/commands/` before installing new version
- [x] AC2: After upgrade, only commands from the current version exist (no deprecated commands like `pdd-new`)
- [x] AC3: Non-PDD files in `~/.claude/commands/` are NOT deleted during upgrade
- [x] AC4: User sees confirmation message indicating old commands were cleaned up

## Out of Scope

- Preserving user customizations to PDD commands
- Handling non-PDD commands in the same directory
- Rollback capability to previous version

## Technical Notes

- Target directory: `~/.claude/commands/`
- Pattern to delete: `pdd-*` (glob match)
- Must handle case where directory doesn't exist (fresh install)

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-29 | PRD created |
