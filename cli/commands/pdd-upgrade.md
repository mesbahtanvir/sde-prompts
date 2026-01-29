# Upgrade PDD CLI

**Usage:** `/pdd-upgrade`

Check for updates to PDD commands and install the latest version.

---

## Steps

### Step 1: Check Installed Version

Read the version from installed commands:

```bash
head -1 ~/.claude/commands/pdd-help.md 2>/dev/null || echo "Not installed"
```

Look for the version comment: `<!-- pdd vX.X.X -->`

### Step 2: Check Latest Version

Query npm for the latest version:

```bash
npm view prd-driven-dev version 2>/dev/null || echo "Package not found"
```

### Step 3: Compare Versions

Report the comparison:
- **Installed:** vX.X.X
- **Latest:** vX.X.X

### Step 4: Update if Needed

If an update is available:

```bash
npm update -g prd-driven-dev
```

Then verify the update:

```bash
pdd-dev --version
```

### Step 5: Report Results

If updated:
> "✅ Updated PDD commands from vX.X.X to vX.X.X"

If already current:
> "✅ PDD commands are up to date (vX.X.X)"

If not installed:
> "⚠️ PDD commands not found. Run: npm install -g prd-driven-dev"

---

## Constraints

**MUST**:
- Show both installed and latest versions
- Run npm update only if needed
- Report success or failure clearly

**MUST NOT**:
- Update without showing what will change
- Fail silently on network errors
