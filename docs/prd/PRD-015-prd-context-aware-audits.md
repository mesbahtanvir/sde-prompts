# PRD-015: PRD Context-Aware Audit Prompts

**Status:** Draft
**Created:** 2026-01-31

---

## Problem Statement

Current audit prompts operate in isolation without building a complete picture of the project. Each prompt analyzes code independently without first aggregating all PRDs to understand the full "desired state" of the project.

The PDD framework's power lies in its deterministic view — combining all PRDs chronologically to understand exactly what features exist, their specifications, and their acceptance criteria. Without this holistic view, audits:

- Miss cross-PRD feature dependencies
- Lack context about the complete project vision
- Cannot accurately compare "what is" vs "what should be"
- Report findings without referencing specific PRD requirements

## Solution

### 1. Create a Shared "PRD Context Builder" Section

Define a reusable section that all audit prompts include as their first step. This section instructs the agent to:

1. Read ALL PRDs from `docs/prd/` directory
2. Parse each PRD to extract:
   - Features and their descriptions
   - Acceptance criteria (with status)
   - PRD status (Draft/Ready/In Progress/Done)
   - Dependencies and relationships between PRDs
3. Build a "Project Feature Map" — the deterministic view of desired state
4. Use this aggregated context for all subsequent audit operations

### 2. Update Each Audit Prompt

Integrate the PRD Context Builder into each audit prompt:

| Prompt | How It Uses PRD Context |
|--------|------------------------|
| `02-audit-features.md` | Compare feature map vs implemented code to find gaps |
| `03-audit-tests.md` | Logical reasoning about critical test cases based on PRD features and business logic |
| `04-audit-alignment.md` | Detect code drift from PRD specifications |
| `05-audit-ux.md` | Audit UX against PRD-defined user experiences |
| `06-audit-qa.md` | Check quality against PRD requirements |

### 3. Improve Audit Output

All audit findings must reference specific PRDs:

- "PRD-005 AC2: User export to CSV — NOT IMPLEMENTED"
- "PRD-003 feature drift: README says X but code does Y"

## Acceptance Criteria

- [ ] AC1: A shared "PRD Context Builder" section exists that can be referenced by all audit prompts
- [ ] AC2: The PRD Context Builder instructs the agent to read ALL PRDs from `docs/prd/` before auditing
- [ ] AC3: The PRD Context Builder extracts: features, acceptance criteria, status, and PRD relationships
- [ ] AC4: Each audit prompt includes the PRD Context Builder as its first step
- [ ] AC5: `02-audit-features.md` uses aggregated PRD context to identify unimplemented features
- [ ] AC6: `03-audit-tests.md` uses aggregated PRD context to perform logical reasoning about testing — identifying critical test cases based on PRD features, business logic, and acceptance criteria (not just code coverage)
- [ ] AC7: `04-audit-alignment.md` uses aggregated PRD context to detect code drift from PRD specifications
- [ ] AC8: `05-audit-ux.md` uses aggregated PRD context to audit UX against PRD-defined experiences
- [ ] AC9: `06-audit-qa.md` uses aggregated PRD context to check quality against PRD requirements
- [ ] AC10: All audit outputs reference specific PRD numbers (e.g., "PRD-005 AC2 not implemented")
- [ ] AC11: Audits report against the "desired state" derived from combined PRDs, not individual PRDs in isolation

## Out of Scope

- Creating new audit prompts (only updating existing ones)
- Changing PRD format or structure
- Automated tooling or scripts (this is prompt updates only)
- Updating non-audit prompts (e.g., `00-prd-creation.md`, `01-pdd-methodology.md`)

## Technical Notes

- The PRD Context Builder should be designed for easy copy-paste or reference across prompts
- Consider using a consistent format for the "Project Feature Map" output
- PRDs should be processed in numerical order (PRD-000, PRD-001, ...) to maintain chronological context
- Prompts should handle edge cases: empty `docs/prd/`, malformed PRDs, PRDs with status "Abandoned"

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-31 | PRD created |
