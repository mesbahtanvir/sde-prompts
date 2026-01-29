# PRD-002: PRD Creation Prompt

**Status:** Done
**Created:** 2026-01-29
**Parent:** PRD-001-audit-foundation.md (Gap: AC1)

---

## Problem Statement

Users need to create PRDs before writing code, but currently they must:
1. Copy a static template manually
2. Figure out what questions to answer
3. Determine the right PRD number
4. Structure acceptance criteria correctly

This friction leads to:
- Skipped PRDs ("I'll document later")
- Low-quality PRDs (vague criteria, missing sections)
- Inconsistent formatting across PRDs

## Solution

Create an interactive PRD creation prompt (`prompts/core/00-prd-creation.md`) that:
1. Interviews the user about their feature/change
2. Asks clarifying questions to extract requirements
3. Generates a complete, well-structured PRD
4. Suggests appropriate PRD number and filename

The prompt should work for three PRD types:
- **Feature** — New functionality
- **Bugfix** — Fix for broken behavior
- **Refactor** — Code improvement without behavior change

## Acceptance Criteria

### AC1: Interactive Interview
- [ ] Prompt asks what type of change (feature/bugfix/refactor)
- [ ] Prompt asks about the problem being solved
- [ ] Prompt asks about proposed solution
- [ ] Prompt asks about acceptance criteria (what "done" looks like)
- [ ] Prompt asks about out-of-scope items
- [ ] Uses STOP points between phases for user feedback

### AC2: PRD Generation
- [ ] Generates PRD following standard template structure
- [ ] Includes all required sections (Status, Problem, Solution, AC, Out of Scope)
- [ ] Acceptance criteria are specific and testable
- [ ] Each AC can be verified with a yes/no answer

### AC3: PRD Numbering
- [ ] Prompt instructs to check existing PRDs for next number
- [ ] Suggests filename format: `PRD-XXX-short-name.md`
- [ ] Short name derived from feature description

### AC4: Type-Specific Guidance
- [ ] Feature PRDs focus on user value and behavior
- [ ] Bugfix PRDs include: expected vs actual behavior, reproduction steps
- [ ] Refactor PRDs include: current state, target state, why change is safe

### AC5: Quality Constraints
- [ ] Prompt enforces MUST/MUST NOT/SHOULD structure
- [ ] Includes examples of good vs bad acceptance criteria
- [ ] Warns against vague language ("improve", "better", "fast")

## Out of Scope

- Automatic PRD number detection (requires file system access)
- PRD storage/database integration
- PRD approval workflows
- Multi-PRD dependency tracking

## Technical Notes

### File Location
```
prompts/core/00-prd-creation.md
```

Numbered `00` to appear first in the workflow (before methodology and audits).

### Prompt Structure
Should follow existing prompt conventions:
- Title and role description
- Agentic workflow with phases
- STOP points for user interaction
- Constraints (MUST/MUST NOT/SHOULD)
- Examples and templates

## Success Metrics

1. Users can create a complete PRD in one session
2. Generated PRDs pass quality review (specific ACs, no vague language)
3. PRD creation time reduced vs manual template copying

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-29 | PRD created from audit gap |
