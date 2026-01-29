# Find PRD Drift

**Usage:** `/pdd-find-drift`

Find where code has drifted from PRD specifications. Outputs a PRD for misalignments.

---

## Workflow

### Phase 1: Collect All PRDs

Load all PRDs marked as "Done" or "In Progress":

```bash
ls docs/prd/*.md
grep -l "Status.*Done\|Status.*In Progress" docs/prd/*.md
```

### Phase 2: Build Requirements Map

For each PRD:
1. Extract acceptance criteria
2. Note the PRD number and status
3. Handle conflicts (later PRDs override earlier ones)

### Phase 3: Deep Codebase Search

For each requirement, exhaustively search:
- Source code files
- Test files
- Configuration files
- Documentation

### Phase 4: Categorize Gaps

| Category | Description |
|----------|-------------|
| ✅ Aligned | Code matches PRD exactly |
| ⚠️ Partial | Some implementation, not complete |
| 🔄 Different | Implemented differently than specified |
| ❌ Missing | PRD requirement not in code |
| ➕ Extra | Code exists without PRD coverage |

### Phase 5: Generate Alignment Report

```markdown
## Alignment Report

### Summary
- Total requirements: 25
- Aligned: 18 (72%)
- Partial: 3 (12%)
- Missing: 2 (8%)
- Different: 1 (4%)
- Extra features: 1 (4%)

### Gaps

#### Missing: PRD-003 AC2 - Export to CSV
No CSV export found in codebase.
**Severity:** High
**Recommendation:** Implement or create new PRD to descope

#### Different: PRD-001 AC4 - Session timeout
PRD specifies 30 minutes, code has 60 minutes.
**File:** `src/config/auth.ts:15`
**Recommendation:** Update code or amend PRD
```

### Phase 6: Recommend Actions

For each gap:
1. Assess severity (Critical/High/Medium/Low)
2. Recommend: Fix code, amend PRD, or create new PRD
3. Estimate effort

**STOP**: Present report and ask:
- "Should I create PRDs for the gaps?"
- "Should I help fix any of these?"

---

## Severity Levels

| Severity | Description |
|----------|-------------|
| Critical | Blocks users or causes data loss |
| High | Major feature not working as specified |
| Medium | Minor deviation from spec |
| Low | Cosmetic or documentation issue |

---

## Constraints

**MUST**:
- Check ALL PRDs, not just recent ones
- Handle PRD conflicts (later wins)
- Provide evidence for each finding
- Consider "Extra" as potential undocumented features

**MUST NOT**:
- Skip any acceptance criterion
- Assume aligned without verification
- Ignore configuration mismatches
