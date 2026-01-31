# E2E Test Audit

**Usage:** `/pdd-audit-e2e`

Analyze codebase to detect test patterns, read PRDs to understand requirements, identify missing E2E test coverage, and generate tests that follow project conventions.

---

## Workflow

### Phase 1: Detect Test Framework

Search for existing test frameworks by checking dependencies and config files:

```bash
# Check package.json for test frameworks
cat package.json 2>/dev/null | grep -E "(playwright|cypress|puppeteer|jest|vitest|mocha)" || echo "No package.json"

# Check for framework config files
ls -la playwright.config.* cypress.config.* jest.config.* vitest.config.* .mocharc.* 2>/dev/null || echo "No config files found"

# Find existing test files
find . -type f \( -name "*.test.*" -o -name "*.spec.*" -o -name "*_test.*" -o -name "*.e2e.*" \) ! -path "*/node_modules/*" 2>/dev/null | head -20
```

**Framework Detection Priority:**

| Framework | Package | Config File |
|-----------|---------|-------------|
| Playwright | `@playwright/test` | `playwright.config.*` |
| Cypress | `cypress` | `cypress.config.*` |
| Puppeteer | `puppeteer` | — |
| Jest | `jest` | `jest.config.*` |
| Vitest | `vitest` | `vitest.config.*` |
| Mocha | `mocha` | `.mocharc.*` |

**STOP**: Report detected framework(s). If none found, proceed to Phase 1b.

### Phase 1b: Recommend Framework (No Framework Detected)

Analyze the project stack to recommend an appropriate E2E framework:

```bash
# Detect project type
cat package.json 2>/dev/null | grep -E "(react|next|vue|angular|svelte)" | head -5
ls *.py setup.py pyproject.toml requirements.txt 2>/dev/null | head -3
ls go.mod Cargo.toml pom.xml build.gradle 2>/dev/null | head -3
```

**Recommendation Matrix:**

| Project Type | Recommended Framework | Why |
|--------------|----------------------|-----|
| React/Next.js/Vue | Playwright | Modern, fast, excellent DX, cross-browser |
| Angular | Playwright or Cypress | Both have great Angular support |
| Node.js CLI | Jest or Vitest | Fast, built-in mocking |
| Python web | pytest + playwright-python | pytest ecosystem + browser automation |
| Python CLI | pytest | Standard Python testing |
| Generic web | Playwright | Best cross-browser support |

**STOP**: Present recommendation and ask:
- "Would you like me to set up [Framework] for this project?"
- If yes, provide setup instructions and basic config.

---

### Phase 2: Analyze Existing Test Patterns

If tests exist, analyze their patterns:

```bash
# Find all test files
find . -type f \( -name "*.test.*" -o -name "*.spec.*" -o -name "*.e2e.*" \) ! -path "*/node_modules/*" 2>/dev/null

# Sample test file structure
head -50 $(find . -type f -name "*.spec.*" ! -path "*/node_modules/*" 2>/dev/null | head -1)
```

**Extract patterns for:**
- File naming convention (`*.spec.ts`, `*.test.js`, `__tests__/*.ts`)
- Directory structure (`tests/`, `__tests__/`, `e2e/`, colocated)
- Test structure (BDD `describe/it`, assertion-based)
- Import patterns (how utilities/fixtures are imported)
- Assertion library (`expect`, `assert`, Chai)
- Setup/teardown patterns (`beforeAll`, `beforeEach`, fixtures)

**STOP**: Summarize detected patterns.

---

### Phase 3: Read PRDs and Extract Acceptance Criteria

Load all PRDs and extract testable acceptance criteria:

```bash
# List all PRDs
ls docs/prd/*.md 2>/dev/null

# Extract acceptance criteria from all PRDs
grep -h "^\- \[" docs/prd/*.md 2>/dev/null | head -50
```

**For each PRD:**
1. Extract PRD number and title
2. Extract all acceptance criteria (lines matching `- [ ]` or `- [x]`)
3. Categorize by testability:
   - **E2E testable**: User flows, UI interactions, integrations
   - **Unit testable**: Functions, utilities, business logic
   - **Manual only**: Visual design, UX feel, subjective criteria

**Build AC Registry:**

| PRD | AC# | Criterion | Type | Testable |
|-----|-----|-----------|------|----------|
| PRD-001 | AC1 | User can login with email | E2E | ✅ |
| PRD-001 | AC2 | Error shown for invalid password | E2E | ✅ |
| PRD-002 | AC1 | Code follows consistent style | Unit | ⚠️ Partial |

**STOP**: Present AC registry and confirm understanding.

---

### Phase 4: Map Existing Tests to Acceptance Criteria

Cross-reference existing tests with acceptance criteria:

```bash
# Search for PRD references in tests
grep -rE "PRD-[0-9]+" --include="*.test.*" --include="*.spec.*" --include="*.e2e.*" 2>/dev/null

# Search for AC references
grep -rE "AC[0-9]+|acceptance" --include="*.test.*" --include="*.spec.*" 2>/dev/null
```

**For each acceptance criterion:**
1. Search test files for related keywords
2. Check if test actually verifies the criterion (not just mentions it)
3. Assess coverage level:
   - ✅ **Covered**: Test explicitly verifies this AC
   - ⚠️ **Partial**: Test touches this but doesn't fully verify
   - ❌ **Missing**: No test coverage

**STOP**: Present coverage analysis.

---

### Phase 5: Generate Gap Report

Create a comprehensive test coverage gap report:

```markdown
# E2E Test Coverage Gap Report

**Generated:** [TODAY'S DATE]
**Test Framework:** [Detected Framework]
**Total PRDs:** X
**Total Acceptance Criteria:** X

## Coverage Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Covered | X | X% |
| ⚠️ Partial | X | X% |
| ❌ Missing | X | X% |

---

## Detailed Gap Analysis

### PRD-001: [Title]

| AC | Criterion | Coverage | Test File |
|----|-----------|----------|-----------|
| AC1 | User can login | ✅ Covered | `auth.spec.ts` |
| AC2 | Invalid password error | ❌ Missing | — |

**Missing Tests for PRD-001:**

#### Test: Invalid Password Shows Error
**Acceptance Criterion:** AC2 - Error shown for invalid password
**Type:** E2E

```typescript
test('shows error message for invalid password', async ({ page }) => {
  // Arrange
  await page.goto('/login');

  // Act
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'wrongpassword');
  await page.click('[data-testid="submit"]');

  // Assert
  await expect(page.locator('[data-testid="error"]')).toHaveText('Invalid password');
});
```

---

### PRD-002: [Title]
[... repeat for each PRD ...]

---

## Suggested Test Files to Create

| File | PRD Coverage | Tests |
|------|--------------|-------|
| `e2e/auth.spec.ts` | PRD-001 | 3 tests |
| `e2e/dashboard.spec.ts` | PRD-002, PRD-003 | 5 tests |

## Priority Order

1. **High Priority** (Core user flows)
   - PRD-001 AC2: Login error handling
   - PRD-002 AC1: Dashboard loads

2. **Medium Priority** (Secondary features)
   - PRD-003 AC3: Export functionality

3. **Low Priority** (Edge cases)
   - PRD-004 AC5: Unusual input handling
```

**STOP**: Present gap report and ask:
1. "Would you like me to write these missing tests?"
2. "Should I focus on a specific PRD first?"
3. "Any tests you want to skip or modify?"

---

### Phase 6: Write Tests (Upon Confirmation)

When user confirms, generate test files following detected patterns:

**For each missing test:**

1. **Create test file** (if doesn't exist):
   - Follow project naming convention
   - Match directory structure
   - Include proper imports

2. **Write test cases**:
   - Use detected test structure (describe/it or test())
   - Follow existing patterns for setup/teardown
   - Include clear comments linking to PRD/AC
   - Use proper selectors and assertions

3. **Add fixtures/helpers** if needed:
   - Test data
   - Utility functions
   - Shared setup

**Test Template (Playwright):**

```typescript
import { test, expect } from '@playwright/test';

/**
 * E2E Tests for PRD-XXX: [Title]
 * @see docs/prd/PRD-XXX-[name].md
 */
test.describe('PRD-XXX: [Feature Name]', () => {

  // AC1: [Criterion description]
  test('AC1: [test description]', async ({ page }) => {
    // Arrange
    await page.goto('/path');

    // Act
    await page.click('[data-testid="button"]');

    // Assert
    await expect(page.locator('[data-testid="result"]')).toBeVisible();
  });

  // AC2: [Criterion description]
  test('AC2: [test description]', async ({ page }) => {
    // ...
  });
});
```

**Test Template (Jest):**

```typescript
/**
 * Integration Tests for PRD-XXX: [Title]
 * @see docs/prd/PRD-XXX-[name].md
 */
describe('PRD-XXX: [Feature Name]', () => {

  beforeEach(() => {
    // Setup
  });

  // AC1: [Criterion description]
  it('AC1: [test description]', async () => {
    // Arrange
    const input = { /* ... */ };

    // Act
    const result = await functionUnderTest(input);

    // Assert
    expect(result).toEqual(expected);
  });
});
```

**STOP**: After writing each test file, show:
1. File path created/modified
2. Number of tests added
3. Which ACs are now covered

Ask: "Continue with next test file?"

---

### Phase 7: Summary Report

After all tests are written:

```markdown
# E2E Test Generation Summary

**Date:** [TODAY'S DATE]

## Files Created/Modified

| File | Action | Tests Added |
|------|--------|-------------|
| `e2e/auth.spec.ts` | Created | 3 |
| `e2e/dashboard.spec.ts` | Modified | 2 |

## Coverage Improvement

| Metric | Before | After |
|--------|--------|-------|
| ACs with E2E tests | 5 (25%) | 15 (75%) |
| PRDs fully covered | 1 | 4 |

## Next Steps

1. Run the tests: `npx playwright test` / `npm test`
2. Fix any failing tests
3. Add to CI pipeline
4. Re-run `/pdd-audit-e2e` to verify coverage
```

---

## Framework Setup Guides

### Playwright Setup

```bash
npm init playwright@latest
```

**Basic Config (`playwright.config.ts`):**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
});
```

### Jest Setup

```bash
npm install --save-dev jest @types/jest ts-jest
```

### Cypress Setup

```bash
npm install --save-dev cypress
npx cypress open
```

---

## Constraints

**MUST**:
- Detect existing test framework before recommending new one
- Read ALL PRDs to build complete AC registry
- Show gap report before writing any tests
- Get user confirmation before creating files
- Follow project's existing test patterns exactly
- Link tests to specific PRD/AC in comments

**MUST NOT**:
- Write tests without user confirmation
- Override existing test files without asking
- Ignore project's test conventions
- Create tests for non-testable criteria (subjective/manual)
- Skip the gap report phase

**SHOULD**:
- Prioritize core user flows over edge cases
- Group tests logically by feature/PRD
- Include setup/teardown when appropriate
- Add helpful comments explaining test intent
- Suggest improvements to existing tests if found
