# Find UX Issues

**Usage:** `/pdd-find-ux-issues`

Find user experience problems. Outputs a PRD for UX improvements.

---

## Workflow

### Phase 1: Understand the Product

Read existing PRDs to understand:
- Target users
- Core user flows
- Intended experience

```bash
ls docs/prd/*.md
```

### Phase 2: Audit Against Heuristics

Evaluate using Nielsen's 10 Usability Heuristics:

1. **Visibility of system status** — Does the UI show what's happening?
2. **Match with real world** — Does it use familiar language?
3. **User control** — Can users undo/redo/escape?
4. **Consistency** — Are patterns consistent throughout?
5. **Error prevention** — Does it prevent mistakes?
6. **Recognition over recall** — Are options visible?
7. **Flexibility** — Are there shortcuts for experts?
8. **Aesthetic design** — Is it clean and minimal?
9. **Error recovery** — Are error messages helpful?
10. **Help** — Is documentation available?

### Phase 3: Check Common UX Issues

Search the codebase for:

**Empty States:**
```bash
grep -r "empty" --include="*.tsx" --include="*.jsx"
```

**Loading States:**
```bash
grep -r "loading\|spinner\|skeleton" --include="*.tsx"
```

**Error Messages:**
```bash
grep -r "error\|Error" --include="*.tsx"
```

**Accessibility:**
```bash
grep -r "aria-\|role=" --include="*.tsx"
```

### Phase 4: Generate UX Report

```markdown
## UX Audit Report

### Critical Issues
- [ ] No loading state on data fetch (`src/pages/Dashboard.tsx`)
- [ ] Empty state missing for list view (`src/components/List.tsx`)

### Accessibility Issues
- [ ] Missing aria-labels on icon buttons
- [ ] Color contrast insufficient on secondary text

### Improvement Opportunities
- [ ] Add keyboard shortcuts for power users
- [ ] Improve error messages with recovery actions

### Quick Wins (Low effort, high impact)
1. Add loading spinners to async operations
2. Add empty state illustrations
3. Improve button hover states
```

### Phase 5: Prioritize Findings

Rate each issue:
- **Impact:** High/Medium/Low (user impact)
- **Effort:** Small/Medium/Large (implementation effort)
- **Priority:** Impact ÷ Effort

**STOP**: Present findings and ask:
- "Should I create a UX improvement PRD?"
- "Should I help fix any quick wins?"

---

## Constraints

**MUST**:
- Consider accessibility (WCAG guidelines)
- Check both happy path and error states
- Identify quick wins separately
- Provide specific file locations

**MUST NOT**:
- Only focus on visual design
- Ignore mobile/responsive considerations
- Skip error and edge case UX
