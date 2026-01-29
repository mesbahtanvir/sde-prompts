# List PRDs

**Usage:** `/pdd-prd-list`

Show the status of all PRDs in the current project.

---

## Steps

### Step 1: Find All PRDs

```bash
ls docs/prd/*.md 2>/dev/null || echo "No PRDs found"
```

### Step 2: Extract Status from Each PRD

For each PRD file found, extract:
- PRD number and title (from filename and first heading)
- Status (from `**Status:**` line)
- Created date (from `**Created:**` line)

### Step 3: Generate Dashboard

Present a table like this:

```
## PRD Status Dashboard

| PRD | Title | Status | Created |
|-----|-------|--------|---------|
| 000 | Foundation | Done | 2026-01-29 |
| 001 | Feature X | In Progress | 2026-01-30 |
| 002 | Bug Fix Y | Draft | 2026-01-30 |

### Summary
- Total: 3 PRDs
- Done: 1
- In Progress: 1
- Draft: 1
- Ready: 0
- Abandoned: 0
```

### Step 4: Identify Issues

Flag any issues:
- PRDs stuck in "In Progress" for too long
- PRDs without acceptance criteria
- Multiple PRDs in "In Progress" (focus issue)

---

## Status Values

| Status | Meaning |
|--------|---------|
| Draft | Work in progress, not ready for implementation |
| Ready | Approved for implementation |
| In Progress | Currently being implemented |
| Done | Implemented and verified |
| Abandoned | Decided not to implement |

---

## Constraints

**MUST**:
- Show all PRDs found in docs/prd/
- Include status summary counts
- Handle missing or malformed PRDs gracefully

**MUST NOT**:
- Fail if docs/prd/ doesn't exist (suggest /pdd-init)
- Crash on malformed PRD files
