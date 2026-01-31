# PRD-018: PRD Export Command

**Status:** Draft
**Created:** 2026-01-31

---

## Problem Statement

When an LLM starts a new session with a codebase using PDD, it must:

1. Read all PRDs individually to understand the project
2. Re-discover solutions to problems already solved in bugfix PRDs
3. Manually piece together the "final state" of features across multiple PRDs
4. Resolve conflicting specifications (when later PRDs override earlier ones)

This wastes context tokens and risks the LLM making the same mistakes that were already fixed. Developers need a way to export a consolidated "project state" document that can be fed to new LLM sessions as context.

## Solution

Add a `/pdd-export` command that generates a consolidated project state document from all PRDs.

### Key Features

**Feature Consolidation**

- Scans all `docs/prd/PRD-*.md` files in numerical order
- Groups information by feature (not by PRD)
- Later PRDs override earlier ones (PRD-007 beats PRD-002)
- Abandoned PRDs are excluded entirely

**Bugfix Knowledge Preservation**

- For bugfix PRDs, extracts:
  - What the bug was
  - Root cause analysis
  - How it was fixed
  - Prevention hints for future LLMs
- Bugfix hints are placed inline with the feature they fixed

**Output Format**

- Saved to `docs/export/PRD_EXPORT_UNTIL_PRD_XXX.md`
- XXX is the highest PRD number included
- Creates versioned snapshots (multiple exports can coexist)

### Output Structure

```markdown
# Project State Export

**Generated:** YYYY-MM-DD HH:MM
**PRDs Included:** PRD-000 through PRD-XXX
**Excluded:** [list of abandoned PRDs]

---

## Feature: [Feature Name]

**Source PRDs:** PRD-002, PRD-007 (final)
**Status:** Implemented | Partial | Not Started

### Desired State

[Consolidated description of what this feature should do]

### Acceptance Criteria

- [x] AC1: [Criterion from PRD-002]
- [x] AC2: [Criterion from PRD-007, overrides PRD-002]
- [ ] AC3: [Pending criterion]

### Technical Specifications

[Any technical details from the PRDs]

### Bugfix Notes

> **BUG: [Bug title]** (PRD-009)
> - **Problem:** [What was broken]
> - **Root Cause:** [Why it happened]
> - **Fix:** [How it was fixed]
> - **LLM Hint:** [What to watch out for when working on this feature]

---

## Feature: [Next Feature]

...

---

## Global Technical Decisions

[Architectural decisions that span multiple features]

---

## Out of Scope (Project-Wide)

[Aggregated list of what's explicitly NOT being built]
```

## Acceptance Criteria

### Phase 1: Core Export

- [ ] AC1: `/pdd-export` command reads all PRDs from `docs/prd/`
- [ ] AC2: PRDs are processed in numerical order (PRD-001, PRD-002, ...)
- [ ] AC3: Output saved to `docs/export/PRD_EXPORT_UNTIL_PRD_XXX.md`
- [ ] AC4: Creates `docs/export/` directory if it doesn't exist
- [ ] AC5: Shows progress as PRDs are processed
- [ ] AC6: Reports total features and ACs found

### Phase 2: Feature Grouping

- [ ] AC7: Features are grouped by name/topic, not by PRD
- [ ] AC8: Same feature across multiple PRDs is merged into one section
- [ ] AC9: Later PRD specifications override earlier ones
- [ ] AC10: Source PRDs are listed for each feature (e.g., "PRD-002, PRD-007")
- [ ] AC11: The "final" source PRD is indicated

### Phase 3: Status Tracking

- [ ] AC12: Abandoned PRDs are excluded from export
- [ ] AC13: Excluded PRDs are listed in the header
- [ ] AC14: Feature status derived from AC completion (Implemented/Partial/Not Started)
- [ ] AC15: Acceptance criteria show checked/unchecked state from PRDs

### Phase 4: Bugfix Knowledge

- [ ] AC16: Bugfix PRDs are identified by type or naming convention
- [ ] AC17: Bug details extracted: problem, root cause, fix applied
- [ ] AC18: "LLM Hint" generated summarizing prevention advice
- [ ] AC19: Bugfix notes placed inline with the feature they fixed
- [ ] AC20: If bugfix spans multiple features, note appears in each

### Phase 5: Technical Details

- [ ] AC21: Technical specifications extracted from PRDs
- [ ] AC22: Architecture decisions consolidated in "Global Technical Decisions"
- [ ] AC23: Out of scope items aggregated project-wide
- [ ] AC24: Environment variables and config documented if present

### Phase 6: Output Quality

- [ ] AC25: Export passes markdown lint
- [ ] AC26: Export is valid markdown with proper headings
- [ ] AC27: File size reported on completion
- [ ] AC28: Duplicate information is deduplicated

## Out of Scope

- Exporting to formats other than markdown
- Automatic LLM context injection (user manually provides the export)
- Tracking which exports have been used
- Diffing between exports
- Real-time PRD watching/auto-export

## Technical Notes

### PRD Type Detection

Detect PRD type from:
1. Filename pattern (e.g., `PRD-XXX-bugfix-*`)
2. Content markers (e.g., "## Bug Report" section)
3. Explicit type field if present

### Feature Grouping Heuristics

Group features by:
1. Explicit feature name in PRD title
2. Similar acceptance criteria topics
3. Referenced file paths or components

### Override Rules

When multiple PRDs specify the same feature:
1. Later PRD number wins for conflicting specs
2. Non-conflicting specs are merged
3. ACs are combined (later PRD can mark earlier ACs as done)

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-31 | PRD created |
