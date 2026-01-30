# Documentation Audit

**Usage:** `/pdd-audit-docs`

Audit documentation completeness and accuracy. Checks README, API docs, inline comments, and developer guides. Outputs a report with gaps and recommendations.

> *"Code tells you how; comments tell you why."* — Jeff Atwood

---

## Workflow

### Phase 1: Inventory Documentation Files

Find all documentation:

```bash
# README files
find . -name "README*" -o -name "readme*" 2>/dev/null

# Documentation directories
find . -type d -name "docs" -o -name "documentation" 2>/dev/null

# Markdown files
find . -name "*.md" ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null

# API documentation
find . -name "openapi*" -o -name "swagger*" -o -name "*.apib" 2>/dev/null
```

**STOP**: Present inventory and ask "Any additional documentation locations?"

---

### Phase 2: README Analysis

Check README completeness:

**Essential Sections:**

- [ ] Project title and description
- [ ] Installation instructions
- [ ] Quick start / Usage examples
- [ ] API reference or link to docs
- [ ] Configuration options
- [ ] Contributing guidelines (or link)
- [ ] License information

**Quality Checks:**

```bash
# Check if README exists
[ -f README.md ] && echo "✅ README.md exists" || echo "🔴 No README.md"

# Check for essential sections
grep -iE "^#+.*install" README.md && echo "✅ Installation section" || echo "🟠 Missing installation"
grep -iE "^#+.*usage|^#+.*getting.started|^#+.*quick.start" README.md || echo "🟠 Missing usage section"
grep -iE "^#+.*api|^#+.*reference" README.md || echo "🟡 Missing API section"
grep -iE "^#+.*contribut" README.md || echo "🟡 Missing contributing section"
grep -iE "license|MIT|Apache|GPL" README.md || echo "🟠 Missing license info"
```

**Code Examples:**

```bash
# Check for code blocks in README
grep -c '```' README.md
```

---

### Phase 3: API Documentation Check

**For REST APIs:**

```bash
# OpenAPI/Swagger
find . -name "openapi*.json" -o -name "openapi*.yaml" -o -name "swagger*.json" 2>/dev/null

# Check if routes are documented
grep -rE "@api|@route|@swagger|@openapi" --include="*.ts" --include="*.js" --include="*.py"
```

**For Libraries:**

```bash
# JSDoc comments
grep -rE "/\*\*[\s\S]*?\*/" --include="*.ts" --include="*.js" | head -20

# Python docstrings
grep -rE '"""[\s\S]*?"""' --include="*.py" | head -20

# Check exported functions without docs
grep -rE "^export (function|const|class)" --include="*.ts" --include="*.js"
```

**Coverage Analysis:**

- Count public functions/classes
- Count documented functions/classes
- Calculate documentation coverage %

---

### Phase 4: Inline Comments Quality

**Check for comment anti-patterns:**

```bash
# Commented-out code (should be deleted)
grep -rn "^\s*//.*function\|^\s*//.*const\|^\s*//.*let\|^\s*#.*def" --include="*.ts" --include="*.js" --include="*.py"

# TODO/FIXME comments (should be tracked)
grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.ts" --include="*.js" --include="*.py"

# Obvious comments (add no value)
grep -rn "// increment\|// loop\|// return\|# set\|# get" --include="*.ts" --include="*.js" --include="*.py"
```

**Check for missing comments where needed:**

```bash
# Complex regex without explanation
grep -rE "/(.*[+*?{}|()\\[\\]]{3,}.*)/|re\.compile\(.*[+*?{}|()\\[\\]]{3,}" --include="*.ts" --include="*.js" --include="*.py"

# Magic numbers without explanation
grep -rE "= [0-9]{4,}|> [0-9]{3,}|< [0-9]{3,}" --include="*.ts" --include="*.js" --include="*.py"
```

---

### Phase 5: Developer Guides Check

**Essential Developer Docs:**

```bash
# Check for contributing guide
[ -f CONTRIBUTING.md ] && echo "✅ CONTRIBUTING.md" || echo "🟡 No CONTRIBUTING.md"

# Check for changelog
[ -f CHANGELOG.md ] && echo "✅ CHANGELOG.md" || echo "🟡 No CHANGELOG.md"

# Check for code of conduct
[ -f CODE_OF_CONDUCT.md ] && echo "🟡 No CODE_OF_CONDUCT.md"

# Check for architecture docs
find . -name "ARCHITECTURE*" -o -name "architecture*" -o -name "ADR*" 2>/dev/null
```

**Environment Setup:**

```bash
# Check for .env.example
[ -f .env.example ] && echo "✅ .env.example" || echo "🟠 No .env.example"

# Check for docker-compose or similar
[ -f docker-compose.yml ] && echo "✅ docker-compose.yml"

# Check for Makefile or scripts
[ -f Makefile ] && echo "✅ Makefile"
ls scripts/*.sh 2>/dev/null && echo "✅ Setup scripts"
```

---

### Phase 6: Stale Documentation Detection

**Check for outdated references:**

```bash
# Find references to old package versions
grep -rE "\"version\":|version.*=" package.json setup.py Cargo.toml 2>/dev/null

# Find potentially outdated links
grep -rE "http://|https://" --include="*.md" | head -20

# Check if docs reference files that don't exist
grep -oE '\[.*\]\(([^)]+)\)' README.md | grep -oE '\(([^)]+)\)' | tr -d '()' | while read link; do
  [[ ! "$link" =~ ^http ]] && [ ! -f "$link" ] && echo "⚠️ Broken link: $link"
done
```

**Check documentation age:**

```bash
# Find markdown files not updated in 6+ months
find . -name "*.md" -mtime +180 ! -path "*/node_modules/*" 2>/dev/null
```

---

### Phase 7: Generate Documentation Audit Report

```markdown
# Documentation Audit Report

**PRD:** [Current PRD if applicable]
**Date:** [TODAY'S DATE]
**Result:** ✅ WELL DOCUMENTED / ⚠️ GAPS FOUND / 🔴 POORLY DOCUMENTED

## Summary

- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

## Documentation Inventory

| Type | File | Status |
| ---- | ---- | ------ |
| README | README.md | ⚠️ Incomplete |
| API Docs | docs/api.md | ✅ Present |
| Contributing | CONTRIBUTING.md | 🔴 Missing |
| Changelog | CHANGELOG.md | 🔴 Missing |

## README Analysis

**Completeness Score:** 60%

| Section | Status | Notes |
| ------- | ------ | ----- |
| Title & Description | ✅ | Clear and concise |
| Installation | ✅ | npm install documented |
| Usage/Quick Start | 🟠 | Missing code examples |
| API Reference | 🔴 | Not documented |
| Configuration | 🟠 | Partial - missing env vars |
| Contributing | 🟡 | Links to separate file |
| License | ✅ | MIT |

## API Documentation

**Coverage:** 45% (18/40 public functions documented)

### Undocumented Public APIs

| File | Function/Class | Type |
| ---- | -------------- | ---- |
| `src/api/users.ts` | `createUser` | Function |
| `src/api/users.ts` | `deleteUser` | Function |
| `src/services/auth.ts` | `AuthService` | Class |

## Inline Comments

### Issues Found

#### 🔴 Blockers

##### [DOC-001] Commented-Out Code
**Location:** `src/utils/legacy.ts:45-67`
**Issue:** 22 lines of commented-out code
**Fix:** Delete and rely on git history

#### 🟠 Warnings

##### [DOC-002] Undocumented Complex Regex
**Location:** `src/validators/email.ts:12`
**Code:** `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
**Issue:** Complex regex without explanation
**Fix:** Add comment explaining what it validates

##### [DOC-003] Magic Number
**Location:** `src/config/limits.ts:8`
**Code:** `const MAX_RETRIES = 86400;`
**Issue:** Magic number without context
**Fix:** Add comment: `// 86400 seconds = 24 hours`

### 🟡 Advisories

##### [DOC-004] Stale TODO
**Location:** `src/handlers/export.ts:23`
**Code:** `// TODO: Add CSV export`
**Age:** 8 months old
**Fix:** Implement or create ticket and remove TODO

## Developer Guides

| Guide | Status | Recommendation |
| ----- | ------ | -------------- |
| CONTRIBUTING.md | 🔴 Missing | Create with PR guidelines |
| CHANGELOG.md | 🔴 Missing | Add and backfill |
| .env.example | 🟠 Missing | Add with all required vars |
| Architecture docs | 🟡 Missing | Consider ADRs |

## Recommendations

### Immediate (Before Next Release)

1. Add missing README sections (API, Configuration)
2. Create .env.example file
3. Delete commented-out code

### High Priority (This Sprint)

1. Add JSDoc to all public functions
2. Create CONTRIBUTING.md
3. Start CHANGELOG.md

### Medium Priority (Backlog)

1. Add architecture documentation
2. Document all complex regex patterns
3. Review and resolve stale TODOs

## Documentation Checklist

- [ ] README has all essential sections
- [ ] All public APIs documented
- [ ] No commented-out code
- [ ] Complex code has explanatory comments
- [ ] .env.example exists
- [ ] CONTRIBUTING.md exists
- [ ] CHANGELOG.md exists and is current
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_Docs_Audit_[DATE].md`?"
2. "Should I create a documentation improvement PRD?"

---

## Severity Levels

| Level | Icon | Description |
| ----- | ---- | ----------- |
| Blocker | 🔴 | Missing critical docs, blocks onboarding |
| Warning | 🟠 | Incomplete docs, causes confusion |
| Advisory | 🟡 | Nice to have, improves experience |

---

## Documentation Checklist

### README Must-Haves

- [ ] Clear project description
- [ ] Installation instructions
- [ ] Basic usage example
- [ ] Link to full documentation
- [ ] License information

### API Documentation

- [ ] All public functions documented
- [ ] Parameters and return types described
- [ ] Usage examples for complex APIs
- [ ] Error cases documented

### Developer Experience

- [ ] .env.example with all variables
- [ ] Contributing guidelines
- [ ] Local development setup
- [ ] Testing instructions

---

## Constraints

**MUST**:
- Check README completeness
- Identify undocumented public APIs
- Find stale/misleading documentation
- Provide specific file locations

**MUST NOT**:
- Judge prose quality (only structure)
- Require documentation for private functions
- Flag all TODOs as issues (only stale ones)

**SHOULD**:
- Calculate documentation coverage %
- Check for broken internal links
- Identify outdated version references
- Note missing code examples
