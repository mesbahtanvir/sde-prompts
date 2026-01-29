# PRD Driven Development (PDD)
## The Methodology: No PRD, No Code

You are implementing PRD Driven Development—a methodology where **every code change traces back to a documented requirement**. Like TDD ensures tests exist before code, PDD ensures PRDs exist before implementation.

> "No PRD, No Code" — The fundamental rule of PDD

---

## The PDD Cycle

```
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │   1. WRITE PRD     →    2. IMPLEMENT    →    3. AUDIT  │
    │   (Requirements)        (Code)               (Verify)   │
    │         ▲                                        │      │
    │         │                                        │      │
    │         └────────────────────────────────────────┘      │
    │                    (Gap found → New PRD)                │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
```

**Step 1: Write PRD** — Document what you're building before writing code
**Step 2: Implement** — Write code that satisfies the PRD
**Step 3: Audit** — Verify code matches PRD; gaps become new PRDs

---

## Why PDD?

| Problem | PDD Solution |
|---------|--------------|
| Features drift from requirements | PRD is the contract |
| "What does this code do?" | PRD explains intent |
| Missing acceptance criteria | PRD defines done |
| Undocumented decisions | PRD captures context |
| AI generates wrong thing | PRD guides AI precisely |

---

## Agentic Workflow

### Phase 1: Setup

- Create `docs/prd/` directory
- Add PRD template
- Update PR template with PRD checklist
- **STOP**: Present setup, ask "Ready to proceed?"

### Phase 2: Create PRDs

- Generate PRD from issue or description
- Use simple template
- Focus on problem and acceptance criteria
- **STOP**: Present PRD, ask "Any changes needed?"

### Phase 3: Integrate

- Link PRD to PR
- Verify acceptance criteria before merge
- Mark PRD as done after merge
- **STOP**: Confirm workflow is working

---

## Constraints

**MUST**:
- Require PRD for features and non-trivial bugs
- Include testable acceptance criteria
- Link PRDs to PRs
- Write PRD before writing code

**MUST NOT**:
- Write feature code without a PRD
- Merge without linked PRD (unless trivial)
- Create vague acceptance criteria
- Overcomplicate the process

**SHOULD**:
- Keep PRDs short and focused
- Use consistent naming (PRD-001, PRD-002)
- Archive completed PRDs in same folder

---

## Directory Structure

```
project/
├── docs/
│   └── prd/
│       ├── PRD-001-user-auth.md
│       ├── PRD-002-dark-mode.md
│       └── PRD-003-export-csv.md
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
└── CLAUDE.md
```

Simple. All PRDs in one folder. Status tracked in the document.

---

## PRD Template

```markdown
# PRD-[NUMBER]: [Title]

**Status:** Draft | Approved | Done
**Author:** @username
**Date:** YYYY-MM-DD
**Issue:** #123
**PR:** #456 (added after PR created)

---

## Problem

[What problem are we solving? Who has this problem? Why does it matter?]

---

## Solution

[How will we solve it? Keep it high-level.]

---

## Acceptance Criteria

- [ ] [Specific, testable requirement]
- [ ] [Specific, testable requirement]
- [ ] [Specific, testable requirement]

---

## Out of Scope

- [What we're NOT doing]

---

## Notes

[Technical considerations, risks, dependencies - optional]
```

### Bug PRD Template (Even Simpler)

```markdown
# PRD-[NUMBER]: [Bug Title]

**Status:** Draft | Approved | Done
**Severity:** Critical | High | Medium | Low
**Issue:** #123
**PR:** #456

---

## Bug

**Current:** [What happens now]
**Expected:** [What should happen]
**Steps:** [How to reproduce]

---

## Fix

[Proposed solution]

---

## Acceptance Criteria

- [ ] Bug no longer reproducible
- [ ] [Additional verification]
- [ ] No regression in related features
```

---

## PR Template

```markdown
<!-- .github/PULL_REQUEST_TEMPLATE.md -->

## Description
[What does this PR do?]

## PRD
<!-- Link to PRD or mark as trivial -->
- [ ] **PRD:** [docs/prd/PRD-XXX.md](link)
- [ ] This is a trivial change (no PRD needed)

## Acceptance Criteria
<!-- Copy from PRD -->
- [ ] Criteria 1
- [ ] Criteria 2

## Testing
- [ ] Tests added/updated
- [ ] Manual testing done
```

---

## The PDD Decision Tree

```
New work requested
        │
        ▼
   Is there a PRD?
        │
   ┌────┴────┐
   No        Yes
   │          │
   ▼          ▼
Write PRD   Implement
first       per PRD
   │          │
   ▼          │
Get PRD     ◄─┘
approved
   │
   ▼
Implement
   │
   ▼
Audit: Does code match PRD?
        │
   ┌────┴────┐
   No        Yes
   │          │
   ▼          ▼
Create      Mark PRD
gap PRD     as Done
```

---

## What Needs a PRD?

### Needs PRD
- New features
- Bug fixes affecting users
- UI/UX changes
- API changes
- Database schema changes

### Skip PRD
- Typo fixes
- Dependency updates
- Documentation only
- Internal refactoring
- CI/CD changes

Use `[skip prd]` in PR title for trivial changes.

---

## Naming Convention

```
PRD-[NUMBER]-[short-name].md

PRD-001-user-authentication.md
PRD-002-dark-mode.md
PRD-003-csv-export.md
```

Numbers are sequential. Don't reuse numbers.

---

## CLAUDE.md Addition

```markdown
## PRD Driven Development

This project uses PDD: No PRD, No Code.

### The Rule
Before writing feature code, check for a PRD. If none exists, create one first.

### Commands
- `/prd` - Generate PRD from description

### Location
- PRDs: `docs/prd/`

### Workflow
1. Check if PRD exists for your work
2. If not, create PRD with `/prd`
3. Get PRD approved
4. Implement per PRD
5. Link PRD in your PR
6. Mark PRD as Done after merge
```

---

## Workflow

```
Issue Created
     ↓
Create PRD (if non-trivial)
     ↓
Get PRD Approved (quick review)
     ↓
Create PR → Link PRD
     ↓
Verify Acceptance Criteria
     ↓
Merge → Update PRD Status to "Done"
```

---

## Claude Skill

```markdown
# /prd

Generate a PRD from an issue or description.

## Instructions

1. Determine next PRD number (check existing PRDs)
2. Create PRD using template
3. Fill in problem, solution, acceptance criteria
4. Save to `docs/prd/PRD-XXX-name.md`

## Keep It Simple

- Problem: 2-3 sentences max
- Solution: 1 paragraph max
- Acceptance criteria: 3-5 items
- Skip optional sections if not needed

## Example

User: "Create PRD for adding Google login"

Output: `docs/prd/PRD-005-google-login.md`
```

---

## Checklist

### Setup
- [ ] Create `docs/prd/` directory
- [ ] Update PR template
- [ ] Add `/prd` skill
- [ ] Update CLAUDE.md

### Per Feature/Bug
- [ ] PRD created with acceptance criteria
- [ ] PRD approved
- [ ] PR links to PRD
- [ ] Acceptance criteria verified
- [ ] PRD marked "Done" after merge

---

## The PDD Audit Cycle

After implementing features, use audit prompts to verify alignment:

1. **[Audit Features](02-audit-features.md)** — Are all PRD features implemented?
2. **[Audit Tests](03-audit-tests.md)** — Do all features have tests?
3. **[Audit Alignment](04-audit-alignment.md)** — Does code match documentation?
4. **[Audit UX](05-audit-ux.md)** — Is the user experience good?
5. **[Audit QA](06-audit-qa.md)** — Are there bugs or quality issues?

Each audit generates a **new PRD** for any gaps found, continuing the cycle.

---

## Begin

When activated:

1. Check if `docs/prd/` exists
2. Check PR template
3. Ask: "Should I set up PDD for this project?"

Remember: **No PRD, No Code. A PRD is just problem + solution + acceptance criteria.**
