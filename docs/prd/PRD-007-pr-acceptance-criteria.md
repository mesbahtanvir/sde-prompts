# PRD-007: PR Acceptance Criteria Documentation

**Status:** In Progress
**Created:** 2026-01-29

---

## Problem Statement

Contributors may submit PRs that don't follow the PDD workflow. Without documented acceptance criteria:
- Contributors don't know what's required before submitting
- Reviewers have no clear checklist to validate PRs
- PRs might be merged without proper PRD linkage, breaking "No PRD, No Code"

The automated CI checks (PRD-006) enforce technical requirements, but human reviewers need a documented checklist to complement them.

## Solution

1. **Update CONTRIBUTING.md** with explicit PR acceptance criteria section
2. **Add GitHub PR template** (`.github/PULL_REQUEST_TEMPLATE.md`) with mandatory checklist
3. PRs not meeting criteria will be rejected by CI and human reviewers

## Acceptance Criteria

- [ ] AC1: CONTRIBUTING.md includes a "PR Acceptance Criteria" section with checklist
- [ ] AC2: GitHub PR template exists at `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] AC3: PR template includes checkbox for "This PR changes exactly one PRD file"
- [ ] AC4: PR template includes checkbox for "Branch follows naming convention"
- [ ] AC5: PR template includes checkbox for "PR title contains PRD reference"
- [ ] AC6: PR template includes checkbox for "All CI checks pass"
- [ ] AC7: CONTRIBUTING.md explains that PRs not meeting criteria will be rejected
- [ ] AC8: PR template includes a "Related PRD" field to link the PRD being implemented

## Out of Scope

- Requiring approvals from specific people (repo settings)
- Automated merge rules (branch protection settings)
- CODEOWNERS file (separate concern)

## Technical Notes

- PR template should auto-populate when creating PRs on GitHub
- Keep checklist concise to encourage compliance
- Include `[skip-prd]` escape hatch documentation

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-29 | PRD created |
