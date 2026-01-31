# PRD Export

**Usage:** `/pdd-export`

Generate a consolidated project state document from all PRDs. The export merges features across PRDs, applies override rules (later PRDs win), and preserves bugfix knowledge inline with features.

---

## Workflow

### Phase 1: Discover PRDs

List all PRDs in numerical order:

```bash
ls -1 docs/prd/PRD-*.md | sort -V
```

Read each PRD file and extract:
- PRD number and title
- Status (Draft, Ready, In Progress, Done, Abandoned)
- Problem statement
- Solution description
- Acceptance criteria (with checked/unchecked state)
- Technical specifications
- Out of scope items

**Skip abandoned PRDs** — they will be listed in the export header but not processed.

### Phase 2: Build Feature Map

For each PRD, identify features by:

1. **PRD title** — often indicates the primary feature
2. **Acceptance criteria groupings** — ACs often cluster by feature
3. **Technical notes** — may reference specific features

Create a map:

```
Feature Name → {
  source_prds: [PRD-002, PRD-007],
  final_prd: PRD-007,
  description: "...",
  acceptance_criteria: [...],
  technical_specs: {...},
  bugfix_notes: [...]
}
```

### Phase 3: Apply Override Rules

When multiple PRDs define the same feature:

1. **Later PRD wins** for conflicting specifications
2. **Merge non-conflicting** information from all PRDs
3. **Combine ACs** — later PRD can mark earlier ACs complete
4. **Preserve all bugfix notes** — they're additive, not overriding

### Phase 4: Extract Bugfix Knowledge

For PRDs that are bugfixes (detected by title, type field, or content):

Extract:
- **Problem**: What was broken
- **Root Cause**: Why it happened
- **Fix Applied**: How it was resolved
- **LLM Hint**: Prevention advice for future work

Place bugfix notes inline with the feature they fixed.

### Phase 5: Generate Export

Determine the highest PRD number and create the export file:

```bash
mkdir -p docs/export
```

Write to `docs/export/PRD_EXPORT_UNTIL_PRD_XXX.md`:

```markdown
# Project State Export

**Generated:** [DATE TIME]
**PRDs Included:** PRD-000 through PRD-XXX
**Excluded (Abandoned):** PRD-003, PRD-011

---

## Feature: [Feature Name]

**Source PRDs:** PRD-002, PRD-007 (final)
**Status:** Implemented | Partial | Not Started

### Desired State

[Consolidated description from PRDs]

### Acceptance Criteria

- [x] AC1: [Description] *(PRD-002)*
- [x] AC2: [Description] *(PRD-007)*
- [ ] AC3: [Description] *(PRD-007)*

### Technical Specifications

[Merged technical details]

### Bugfix Notes

> **BUG: [Title]** *(PRD-009)*
> - **Problem:** [What broke]
> - **Root Cause:** [Why]
> - **Fix:** [How fixed]
> - **LLM Hint:** [Prevention advice]

---

## Feature: [Next Feature]

...

---

## Global Technical Decisions

[Architecture decisions spanning multiple features]

| Decision | Value | Source |
|----------|-------|--------|
| API Response Format | Wrapped `{data, meta}` | PRD-017 |
| Pagination | Cursor-based | PRD-017 |

---

## Out of Scope (Project-Wide)

These items are explicitly NOT being built:

- [Item] *(PRD-005)*
- [Item] *(PRD-012)*
```

### Phase 6: Report Results

After generating the export, display:

```
✅ PRD Export Complete

📁 Output: docs/export/PRD_EXPORT_UNTIL_PRD_017.md
📊 Statistics:
   - PRDs processed: 15
   - PRDs excluded (abandoned): 2
   - Features identified: 12
   - Acceptance criteria: 89
   - Bugfix notes: 5
   - File size: 24 KB

💡 Use this file to provide context to new LLM sessions.
```

**STOP**: Present the export summary and ask:
- "Want me to open the export file?"
- "Should I also add this to .gitignore? (exports may contain sensitive context)"

---

## Feature Grouping Heuristics

When grouping features across PRDs:

| Signal | Weight | Example |
|--------|--------|---------|
| Same title/name | High | "User Authentication" in both PRDs |
| Same component path | Medium | Both mention `src/auth/` |
| Similar AC topics | Medium | Both have login-related ACs |
| Cross-references | High | PRD-007 says "extends PRD-002" |

---

## Bugfix Detection

A PRD is considered a bugfix if:

1. **Title contains**: "fix", "bug", "patch", "hotfix"
2. **Has section**: "## Bug Report" or "## Root Cause"
3. **Type field**: `type: bugfix` in frontmatter
4. **Problem statement**: Describes broken behavior

---

## Status Derivation

Feature status is derived from acceptance criteria:

| Condition | Status |
|-----------|--------|
| All ACs checked `[x]` | Implemented |
| Some ACs checked | Partial |
| No ACs checked | Not Started |

---

## Constraints

**MUST:**

- Process PRDs in numerical order
- Skip abandoned PRDs (but list them)
- Place bugfix notes inline with features
- Include source PRD references for traceability
- Create `docs/export/` directory if missing

**MUST NOT:**

- Include abandoned PRD content in features
- Override bugfix notes (they're additive)
- Generate export if no PRDs found
- Expose secrets or credentials in export

---

## Reference

This command implements **PRD-018: PRD Export Command**.

See `docs/prd/PRD-018-prd-export.md` for complete specifications.
