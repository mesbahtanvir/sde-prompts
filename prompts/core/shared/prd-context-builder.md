# PRD Context Builder

> **Shared Section** — Include this as Phase 0 in all audit prompts to build the deterministic project view.

## Purpose

The PDD (PRD Driven Development) framework provides a **deterministic view** of the project by combining all PRDs chronologically. Before performing any audit, you must first build this complete picture to understand:

- What features exist and their desired state
- How features relate to each other
- The complete acceptance criteria across all PRDs
- The evolution of requirements over time

## Phase 0: Build PRD Context

### Step 1: Discover All PRDs

```bash
# Find all PRDs in the project
ls docs/prd/
```

Read EVERY PRD file, regardless of status.

### Step 2: Build the Project Feature Map

For each PRD, extract:

1. **PRD Metadata**
   - PRD number and title
   - Status (Draft, Ready, In Progress, Done, Abandoned)
   - Created date
   - Dependencies on other PRDs

2. **Features Defined**
   - Feature name and description
   - Target behavior/state
   - Components affected

3. **Acceptance Criteria**
   - Each AC with its completion status
   - Testable requirements
   - Edge cases specified

4. **Relationships**
   - Which PRDs modify the same feature
   - Which PRDs depend on others
   - Chronological order of changes

### Step 3: Construct the Deterministic View

Combine all PRDs to build:

```markdown
## Project Feature Map

### Feature: [Feature Name]

**Defined in:** PRD-001, PRD-003 (modified), PRD-007 (final)
**Current Desired State:** [From latest PRD]

**Acceptance Criteria (Aggregated):**
- [ ] PRD-001 AC1: [Criterion] — Status: [Implemented/Missing/Different]
- [ ] PRD-003 AC2: [Criterion] — Status: [Implemented/Missing/Different]
- [ ] PRD-007 AC1: [Criterion] — Status: [Implemented/Missing/Different]

**Evolution:**
1. PRD-001: Initial definition — [summary]
2. PRD-003: Added [feature] — [summary]
3. PRD-007: Changed to [approach] — [summary]

---

### Feature: [Next Feature]
[Same structure]
```

### Step 4: Resolution Rules

When PRDs conflict or evolve:

**Rule 1: Later PRD Wins**

```
PRD-001: Login with email
PRD-007: Remove email, use phone only
→ Desired State: Phone login only
```

**Rule 2: Additive Unless Explicit**

```
PRD-001: Login with email
PRD-003: Add Google login
→ Desired State: Email + Google login
```

**Rule 3: Explicit Removal Applies**

```
PRD-001: Login with email + Google
PRD-007: "Remove email login"
→ Desired State: Google only
```

**Rule 4: Abandoned PRDs Excluded**

```
PRD-005: Add dark mode (Status: Abandoned)
→ Not included in desired state
```

### Step 5: Present the Project Understanding

Before proceeding to the specific audit, present:

```markdown
## Project Understanding

**PRDs Analyzed:** [count]
**Features Identified:** [count]
**Total Acceptance Criteria:** [count]

### Feature Summary

| Feature | PRD(s) | Status | AC Count |
|---------|--------|--------|----------|
| Authentication | PRD-001, PRD-007 | Done | 8 |
| User Profile | PRD-002 | Done | 5 |
| Dashboard | PRD-003 | In Progress | 4 |

### PRD Chain

| PRD | Title | Status | Modifies |
|-----|-------|--------|----------|
| PRD-001 | User Auth | Done | - |
| PRD-002 | User Profile | Done | - |
| PRD-003 | Add Google Login | Done | PRD-001 |
| PRD-007 | Phone Auth | Done | PRD-001, PRD-003 |
```

**STOP**: Present this understanding and ask: "Is this complete? Any PRDs or features I'm missing?"

---

## Using the Context in Audits

Once the PRD Context is built, each audit uses it differently:

| Audit Type | How It Uses PRD Context |
|------------|------------------------|
| **Feature Audit** | Compare feature map vs implemented code — what's missing? |
| **Test Audit** | Check test coverage against ALL acceptance criteria from all PRDs |
| **Alignment Audit** | Detect drift between PRD specifications and actual code |
| **UX Audit** | Evaluate user experience against PRD-defined flows |
| **QA Audit** | Test quality against PRD requirements |

## Output Format

All audit findings MUST reference specific PRDs:

**Good:**

```markdown
- PRD-007 AC2: Phone verification required — NOT IMPLEMENTED
- PRD-003 AC1: Google login button — IMPLEMENTED but different placement
- PRD-001 AC3: Session timeout 30 min — DRIFT (currently 7 days)
```

**Bad:**

```markdown
- Phone verification missing
- Login button in wrong place
- Session doesn't timeout properly
```

---

## Template for Integration

Add this to the beginning of any audit prompt:

```markdown
### Phase 0: Build PRD Context (REQUIRED)

Before starting this audit, you MUST:

1. Read ALL PRDs in `docs/prd/` directory
2. Build the Project Feature Map (see prompts/core/shared/prd-context-builder.md)
3. Construct the deterministic view of desired state
4. Present your understanding for validation

**STOP**: Do not proceed to Phase 1 until the user confirms the PRD context is complete.
```
