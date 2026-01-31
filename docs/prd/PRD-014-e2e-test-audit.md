# PRD-014: E2E Test Audit Command

**Status:** In Progress
**Created:** 2026-01-30

---

## Problem Statement

Users of PDD methodology need a way to ensure their E2E tests align with PRD acceptance criteria. Currently:

- Writing comprehensive E2E tests is time-consuming and error-prone
- Developers must manually map PRD acceptance criteria to test scenarios
- No automated way to identify which acceptance criteria lack test coverage
- Tests often miss edge cases documented in PRDs, or PRDs have acceptance criteria that never get tested

This gap between documented requirements and actual test coverage undermines the value of PRD-driven development.

## Solution

Add a new `/pdd-audit-e2e` command that:

1. **Analyzes the codebase** to detect existing test frameworks (Playwright, Cypress, Puppeteer, Jest, Vitest, Mocha, etc.) by checking:
   - `package.json` dependencies
   - Config files (`playwright.config.ts`, `cypress.config.js`, `jest.config.js`, `vitest.config.ts`, etc.)
   - Existing test file patterns

2. **Reads all PRDs** from `docs/prd/` and extracts acceptance criteria (checkbox items marked with `- [ ]` or `- [x]`)

3. **Scans existing tests** to understand:
   - Current test patterns and naming conventions
   - File structure and organization
   - Which acceptance criteria appear to be covered

4. **Generates a gap report** showing:
   - Acceptance criteria with existing test coverage
   - Acceptance criteria missing tests
   - Suggested test cases for each gap

5. **Prompts for confirmation** before writing any files

6. **Writes test files** following the project's existing patterns:
   - Matches file naming conventions
   - Uses the same describe/it structure
   - Follows import patterns
   - Organizes tests based on codebase patterns (AI decides: per-PRD, per-feature, or per-page)

7. **If no test framework exists**:
   - Analyzes project stack (language, framework, package manager)
   - Recommends an appropriate E2E framework
   - Offers to set up the framework with a basic configuration

## Acceptance Criteria

- [ ] AC1: Command detects existing test frameworks by checking `package.json`, config files (`playwright.config.ts`, `cypress.config.js`, `jest.config.js`, `vitest.config.ts`, etc.), and test file patterns
- [ ] AC2: Command reads all PRDs from `docs/prd/` and extracts acceptance criteria (checkbox items)
- [ ] AC3: Command scans existing test files and identifies which acceptance criteria are already covered
- [ ] AC4: Command generates a gap report showing: covered ACs, missing ACs, and suggested test cases
- [ ] AC5: Command prompts user for confirmation before writing any test files
- [ ] AC6: Generated tests follow the project's existing test patterns (file naming, describe/it structure, imports)
- [ ] AC7: If no test framework is detected, command recommends one based on the project stack and offers setup
- [ ] AC8: Command handles projects with no PRDs gracefully (shows helpful message)

## Out of Scope

- Running the generated tests (user runs them separately)
- Setting up CI/CD pipelines for tests
- Generating unit tests (focused on E2E/integration tests only)
- Fixing failing tests
- Test data generation or fixture management

## Technical Notes

### Framework Detection Priority

Check for these frameworks in order:

**Browser E2E:**
- Playwright (`@playwright/test`, `playwright.config.*`)
- Cypress (`cypress`, `cypress.config.*`)
- Puppeteer (`puppeteer`)

**Integration/Unit:**
- Jest (`jest`, `jest.config.*`)
- Vitest (`vitest`, `vitest.config.*`)
- Mocha (`mocha`, `.mocharc.*`)

### Test Pattern Analysis

When analyzing existing tests, extract:
- File naming: `*.spec.ts`, `*.test.js`, `__tests__/*.ts`, etc.
- Structure: BDD (`describe`/`it`) vs assertion-based
- Imports: How test utilities are imported
- Assertions: Which assertion library is used

### PRD Acceptance Criteria Extraction

Parse PRD files for lines matching:
- `- [ ] AC*:` (unchecked)
- `- [x] AC*:` (checked)

Map each AC to its parent PRD for traceability.

### Framework Recommendations

If no framework detected, recommend based on:
- **React/Next.js/Vue** → Playwright (modern, fast, good DX)
- **Node.js CLI** → Jest or Vitest
- **Python** → pytest with playwright-python
- **Generic web** → Playwright

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-30 | PRD created |
