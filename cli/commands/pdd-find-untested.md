# Find Untested Code

**Usage:** `/pdd-find-untested [prd-number]`

Find code without test coverage. Outputs a PRD for missing tests.

**PRD to audit:** $ARGUMENTS

---

## Workflow

### Phase 1: Load the PRD

Load the specified PRD and extract acceptance criteria:

```bash
cat docs/prd/PRD-$ARGUMENTS*.md 2>/dev/null || ls docs/prd/
```

**STOP**: Confirm the PRD to audit.

### Phase 2: Find Existing Tests

Search for test files in the project:

```bash
find . -name "*.test.*" -o -name "*.spec.*" -o -name "*_test.*" | head -20
```

### Phase 3: Map Tests to Acceptance Criteria

For each acceptance criterion:
1. Search test files for relevant coverage
2. Check if happy path is tested
3. Check if edge cases are tested
4. Check if error scenarios are tested

### Phase 4: Generate Coverage Report

| AC | Test Coverage | Test File | Notes |
|----|--------------|-----------|-------|
| AC1: User can upload | ✅ Covered | `upload.test.ts` | Happy path only |
| AC2: 10MB limit | ⚠️ Partial | `upload.test.ts` | Missing edge cases |
| AC3: Error handling | ❌ Missing | — | No error tests |

### Phase 5: Generate Test Specifications

For each missing or partial test, provide:

```markdown
### Missing Test: AC3 - Error handling

**Given:** User uploads invalid file type
**When:** Upload is attempted
**Then:** Error message "Invalid file type" is displayed

**Test code suggestion:**
\`\`\`typescript
it('should show error for invalid file type', async () => {
  // Arrange
  const invalidFile = new File([''], 'test.exe', { type: 'application/exe' });

  // Act
  const result = await uploadFile(invalidFile);

  // Assert
  expect(result.error).toBe('Invalid file type');
});
\`\`\`
```

**STOP**: Present findings and ask:
- "Should I help write these missing tests?"
- "Should I create a test PRD for the gaps?"

---

## Test Categories

| Category | Description |
|----------|-------------|
| Unit | Individual function/component tests |
| Integration | Multiple components working together |
| E2E | Full user flow tests |
| Edge Case | Boundary conditions and limits |
| Error | Error handling and recovery |

---

## Constraints

**MUST**:
- Check for all test file patterns
- Verify tests actually test the criterion (not just exist)
- Suggest concrete test implementations
- Use Given-When-Then format for test specs

**MUST NOT**:
- Mark as covered if test doesn't verify the criterion
- Skip edge cases and error scenarios
