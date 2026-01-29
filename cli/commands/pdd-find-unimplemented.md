# Find Unimplemented PRD Features

**Usage:** `/pdd-find-unimplemented [prd-number]`

Find PRD features that are not yet implemented in code. Outputs a PRD for gaps found.

**PRD to audit:** $ARGUMENTS

---

## Workflow

### Phase 1: Load the PRD

If a PRD number was provided, load it:

```bash
cat docs/prd/PRD-$ARGUMENTS*.md 2>/dev/null || ls docs/prd/
```

If no number provided, list available PRDs and ask which to audit.

**STOP**: Confirm the PRD to audit.

### Phase 2: Extract Acceptance Criteria

Parse the PRD to extract all acceptance criteria:
- Look for `## Acceptance Criteria` section
- Extract each `- [ ]` or `- [x]` item
- Note: checked items are claimed as done

### Phase 3: Search the Codebase

For each acceptance criterion, search for evidence of implementation:

1. **Identify keywords** from the criterion
2. **Search code** for relevant implementations
3. **Check tests** for coverage of the criterion
4. **Document findings** with file paths and line numbers

Search patterns:
```bash
# Find relevant files
grep -r "keyword" --include="*.ts" --include="*.tsx" --include="*.js"

# Check tests
grep -r "keyword" --include="*.test.*" --include="*.spec.*"
```

### Phase 4: Generate Gap Report

For each acceptance criterion, report:

| AC | Status | Evidence |
|----|--------|----------|
| AC1: User can upload files | ✅ Implemented | `src/upload.ts:45` |
| AC2: Files limited to 10MB | ⚠️ Partial | Size check missing |
| AC3: Error on invalid type | ❌ Not Found | No evidence found |

### Phase 5: Recommend Actions

For each gap found:
1. Describe what's missing
2. Suggest implementation approach
3. Estimate complexity (small/medium/large)

**STOP**: Present findings and ask:
- "Should I create a new PRD for these gaps?"
- "Should I help implement any of these?"

---

## Gap Categories

| Status | Meaning |
|--------|---------|
| ✅ Implemented | Code exists and matches criterion |
| ⚠️ Partial | Some implementation exists but incomplete |
| ❌ Not Found | No evidence of implementation |
| 🔄 Different | Implemented differently than specified |

---

## Constraints

**MUST**:
- Search thoroughly before marking as "Not Found"
- Provide file paths and line numbers as evidence
- Check both implementation and test files
- Consider edge cases mentioned in AC

**MUST NOT**:
- Mark as implemented without evidence
- Skip any acceptance criterion
- Assume code works without verification
