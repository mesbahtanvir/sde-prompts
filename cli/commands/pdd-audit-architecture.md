# Architecture Audit

**Usage:** `/pdd-audit-architecture`

Audit structural health, dependencies, and coupling. Detects circular dependencies, layer violations, dead code, and architectural anti-patterns. Outputs a report with recommendations.

> *"Architecture is about the important stuff. Whatever that is."* — Ralph Johnson

---

## Workflow

### Phase 1: Understand Project Structure

Map the codebase architecture:

```bash
# Find source directories
find . -type d -name "src" -o -name "lib" -o -name "app" -o -name "packages" 2>/dev/null | head -10

# Identify project type
[ -f package.json ] && echo "Node.js project"
[ -f requirements.txt ] && echo "Python project"
[ -f go.mod ] && echo "Go project"
[ -f Cargo.toml ] && echo "Rust project"
[ -f pom.xml ] && echo "Java/Maven project"

# List top-level directories
ls -d */ 2>/dev/null | head -20
```

**STOP**: Present structure and ask "What are the intended architectural layers/boundaries?"

---

### Phase 2: Dependency Graph Analysis

**Build import/dependency map:**

```bash
# JavaScript/TypeScript imports
grep -rh "^import\|^from\|require(" --include="*.ts" --include="*.js" --include="*.tsx" | sort | uniq -c | sort -rn | head -30

# Python imports
grep -rh "^import\|^from.*import" --include="*.py" | sort | uniq -c | sort -rn | head -30

# Go imports
grep -rh "^import" --include="*.go" | sort | uniq -c | sort -rn | head -30
```

**Check external dependency count:**

```bash
# Node.js
[ -f package.json ] && cat package.json | grep -E '"dependencies"|"devDependencies"' -A 100 | grep '"' | wc -l

# Python
[ -f requirements.txt ] && wc -l requirements.txt
```

---

### Phase 3: Circular Dependency Detection

**Find potential circular imports:**

```bash
# Create a simple dependency checker
# For each file, check if its imports also import it back

# JavaScript/TypeScript
for file in $(find src -name "*.ts" -o -name "*.js" 2>/dev/null); do
  imports=$(grep -oE "from ['\"]\..*['\"]" "$file" | sed "s/from ['\"]//;s/['\"]//")
  for imp in $imports; do
    # Check if imported file imports this file back
    target=$(dirname "$file")/"$imp"
    [ -f "$target.ts" ] && grep -l "$(basename $file .ts)" "$target.ts" 2>/dev/null && echo "⚠️ Potential circular: $file <-> $target"
  done
done
```

**Common circular dependency patterns:**

- A imports B, B imports A (direct)
- A imports B, B imports C, C imports A (transitive)
- index.ts re-exports create cycles

```bash
# Check for barrel file issues (index.ts re-exports)
find . -name "index.ts" -o -name "index.js" | xargs grep -l "export \* from\|export {" 2>/dev/null
```

---

### Phase 4: Layer Violation Detection

**Define typical layers:**

```
┌─────────────────────────────────────┐
│           UI / Presentation         │  (components, pages, views)
├─────────────────────────────────────┤
│          Application Layer          │  (handlers, controllers, use-cases)
├─────────────────────────────────────┤
│           Domain / Business         │  (services, models, entities)
├─────────────────────────────────────┤
│          Infrastructure             │  (database, external APIs, config)
└─────────────────────────────────────┘
```

**Check for layer violations:**

```bash
# UI importing infrastructure directly (violation)
grep -rE "from ['\"].*/(db|database|repository|infrastructure)" --include="*.tsx" --include="*.vue" --include="*.jsx"

# Controllers importing UI (violation)
grep -rE "from ['\"].*/(components|pages|views)" --include="*/controllers/*" --include="*/handlers/*"

# Domain importing infrastructure (violation - depends on architecture)
grep -rE "from ['\"].*/(db|database|repository)" --include="*/services/*" --include="*/domain/*"
```

**Check dependency direction:**

```bash
# Find imports between directories
for dir in src/*/; do
  echo "=== $(basename $dir) imports ==="
  grep -rh "from ['\"]" "$dir" --include="*.ts" --include="*.js" 2>/dev/null | grep -oE "from ['\"][^'\"]+['\"]" | sort | uniq -c | sort -rn | head -10
done
```

---

### Phase 5: Coupling Analysis

**Fan-in / Fan-out Analysis:**

```bash
# Fan-out: How many modules does this file depend on?
for file in $(find src -name "*.ts" 2>/dev/null | head -20); do
  count=$(grep -c "^import\|^from" "$file" 2>/dev/null || echo 0)
  [ "$count" -gt 10 ] && echo "⚠️ High fan-out ($count imports): $file"
done

# Fan-in: How many modules depend on this file?
for file in $(find src -name "*.ts" 2>/dev/null | head -20); do
  name=$(basename "$file" .ts)
  count=$(grep -rl "from.*$name\|import.*$name" src --include="*.ts" 2>/dev/null | wc -l)
  [ "$count" -gt 10 ] && echo "📌 High fan-in ($count dependents): $file"
done
```

**God Module Detection:**

```bash
# Files with too many exports
for file in $(find src -name "*.ts" 2>/dev/null); do
  exports=$(grep -c "^export" "$file" 2>/dev/null || echo 0)
  [ "$exports" -gt 15 ] && echo "🔴 God module ($exports exports): $file"
done

# Files that are too large
find src -name "*.ts" -o -name "*.js" | xargs wc -l 2>/dev/null | sort -rn | head -20
```

---

### Phase 6: Dead Code Detection

**Find unused exports:**

```bash
# Find exported functions/classes
exports=$(grep -roh "export \(function\|const\|class\|interface\|type\) \w\+" --include="*.ts" | awk '{print $3}')

# Check if they're imported anywhere
for exp in $exports; do
  count=$(grep -r "import.*$exp\|$exp" --include="*.ts" | grep -v "export" | wc -l)
  [ "$count" -eq 0 ] && echo "⚠️ Possibly unused: $exp"
done
```

**Find unreachable files:**

```bash
# Files not imported by anything
for file in $(find src -name "*.ts" ! -name "index.ts" ! -name "*.test.ts" ! -name "*.spec.ts" 2>/dev/null); do
  name=$(basename "$file" .ts)
  count=$(grep -rl "$name" src --include="*.ts" 2>/dev/null | grep -v "$file" | wc -l)
  [ "$count" -eq 0 ] && echo "⚠️ Orphan file: $file"
done
```

---

### Phase 7: Cohesion Analysis

**Check module cohesion:**

```bash
# Files in same directory should be related
for dir in src/*/; do
  echo "=== $(basename $dir) ==="
  # Check if files in directory import each other (high cohesion)
  # vs import from outside (low cohesion)
  internal=$(grep -rh "from ['\"]\./" "$dir" --include="*.ts" 2>/dev/null | wc -l)
  external=$(grep -rh "from ['\"][^.]" "$dir" --include="*.ts" 2>/dev/null | wc -l)
  total=$((internal + external))
  [ "$total" -gt 0 ] && echo "Cohesion: $internal internal / $external external imports"
done
```

---

### Phase 8: Anti-Pattern Detection

**Check for common anti-patterns:**

```bash
# Singleton pattern (often problematic)
grep -rn "getInstance\|\.instance\s*=" --include="*.ts" --include="*.js"

# Service locator pattern
grep -rn "ServiceLocator\|Container\.get\|injector\.get" --include="*.ts" --include="*.js"

# God object indicators
grep -rn "class.*Manager\|class.*Controller\|class.*Service" --include="*.ts" --include="*.js" | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  methods=$(grep -c "^\s*\(public\|private\|async\)\?\s*\w\+(" "$file" 2>/dev/null || echo 0)
  [ "$methods" -gt 20 ] && echo "🔴 God class ($methods methods): $line"
done

# Anemic domain model
grep -rn "interface.*{" --include="*.ts" -A 20 | grep -B 5 "^\s*\w\+:\s*\w\+;$" | grep "interface"
```

---

### Phase 9: Generate Architecture Audit Report

```markdown
# Architecture Audit Report

**PRD:** [Current PRD if applicable]
**Date:** [TODAY'S DATE]
**Result:** ✅ HEALTHY / ⚠️ ISSUES FOUND / 🔴 SIGNIFICANT PROBLEMS

## Summary

- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

## Project Structure

```
src/
├── components/     (UI Layer)
├── pages/          (UI Layer)
├── hooks/          (Application Layer)
├── services/       (Domain Layer)
├── api/            (Application Layer)
├── utils/          (Shared)
└── types/          (Shared)
```

## Dependency Analysis

### External Dependencies

| Category | Count | Status |
| -------- | ----- | ------ |
| Production deps | 45 | 🟠 High |
| Dev deps | 23 | ✅ OK |
| Outdated | 8 | 🟡 Review |

### Internal Dependencies

**Most depended-on modules (high fan-in):**

| Module | Dependents | Risk |
| ------ | ---------- | ---- |
| `src/utils/helpers.ts` | 34 | 🔴 Critical path |
| `src/types/index.ts` | 28 | ✅ Expected |
| `src/services/api.ts` | 22 | 🟠 Coupling |

**Most dependent modules (high fan-out):**

| Module | Dependencies | Status |
| ------ | ------------ | ------ |
| `src/pages/Dashboard.tsx` | 18 | 🔴 Too coupled |
| `src/App.tsx` | 15 | 🟠 Review |

## Issues Found

### 🔴 Blockers

#### [ARCH-001] Circular Dependency
**Files:** `src/services/user.ts` ↔ `src/services/auth.ts`
**Issue:** User service imports Auth, Auth imports User
**Impact:** Build issues, testing difficulties
**Fix:** Extract shared logic to `src/services/shared/identity.ts`

#### [ARCH-002] Layer Violation
**Location:** `src/components/UserList.tsx:12`
**Code:** `import { db } from '../infrastructure/database'`
**Issue:** UI component directly imports database layer
**Fix:** Access data through services/hooks layer

### 🟠 Warnings

#### [ARCH-003] God Module
**Location:** `src/utils/helpers.ts`
**Lines:** 847 lines, 42 exports
**Issue:** Too many unrelated utilities in one file
**Fix:** Split into focused modules: `stringUtils.ts`, `dateUtils.ts`, etc.

#### [ARCH-004] High Coupling
**Location:** `src/pages/Dashboard.tsx`
**Issue:** Imports 18 different modules
**Fix:** Extract sub-components, use composition

### 🟡 Advisories

#### [ARCH-005] Unused Export
**Location:** `src/services/legacy.ts:formatOldDate`
**Issue:** Exported but never imported
**Fix:** Remove or mark as deprecated

#### [ARCH-006] Inconsistent Structure
**Issue:** Some features in `src/features/`, others in `src/modules/`
**Fix:** Standardize on one pattern

## Layer Compliance

| From → To | UI | App | Domain | Infra |
| --------- | -- | --- | ------ | ----- |
| **UI** | ✅ | ✅ | ❌ | ❌ |
| **App** | ❌ | ✅ | ✅ | ✅ |
| **Domain** | ❌ | ❌ | ✅ | ⚠️ |
| **Infra** | ❌ | ❌ | ❌ | ✅ |

**Violations Found:** 3
- `components/UserList.tsx` → `infrastructure/db.ts`
- `services/report.ts` → `components/Chart.tsx`
- `domain/user.ts` → `infrastructure/api.ts`

## Cohesion Analysis

| Module | Internal Imports | External Imports | Cohesion |
| ------ | ---------------- | ---------------- | -------- |
| `services/` | 12 | 8 | ✅ High (60%) |
| `utils/` | 2 | 15 | 🔴 Low (12%) |
| `components/` | 25 | 30 | 🟠 Medium (45%) |

## Dead Code

| Type | Count | Location |
| ---- | ----- | -------- |
| Unused exports | 8 | Various |
| Orphan files | 3 | `src/legacy/` |
| Unreachable code | 2 | `src/utils/` |

## Recommendations

### Immediate (Architectural Health)

1. Fix circular dependency between user/auth services
2. Fix layer violations in UI components
3. Split god module `helpers.ts`

### High Priority (Maintainability)

1. Reduce coupling in Dashboard component
2. Remove dead code in `src/legacy/`
3. Standardize feature organization

### Medium Priority (Improvement)

1. Extract shared types to dedicated module
2. Add barrel exports for cleaner imports
3. Document architectural decisions (ADRs)

## Architecture Scorecard

| Principle | Status | Score |
| --------- | ------ | ----- |
| No circular dependencies | 🔴 | 2/5 |
| Layer separation | 🟠 | 3/5 |
| Low coupling | 🟠 | 3/5 |
| High cohesion | 🟠 | 3/5 |
| No dead code | 🟡 | 4/5 |
| Consistent structure | 🟡 | 4/5 |

**Overall Architecture Health:** 63%
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_Architecture_Audit_[DATE].md`?"
2. "Should I create a refactoring PRD for architectural improvements?"

---

## Severity Levels

| Level | Icon | Description |
| ----- | ---- | ----------- |
| Blocker | 🔴 | Circular deps, layer violations, build issues |
| Warning | 🟠 | High coupling, god modules, maintainability risk |
| Advisory | 🟡 | Dead code, inconsistencies, nice to fix |

---

## Architecture Principles

### Dependency Rule

> *"Source code dependencies must point inward, toward higher-level policies."*

```
UI → Application → Domain → (nothing)
Infrastructure → Domain
```

### SOLID for Architecture

- **S**: Each module has one reason to change
- **O**: Open for extension, closed for modification
- **L**: Subtypes substitutable for base types
- **I**: No module depends on things it doesn't use
- **D**: Depend on abstractions, not concretions

---

## Constraints

**MUST**:
- Detect circular dependencies
- Identify layer violations
- Find high coupling modules
- Locate dead code

**MUST NOT**:
- Enforce a specific architecture pattern
- Flag all large files as problems
- Ignore project-specific conventions

**SHOULD**:
- Calculate coupling metrics
- Analyze cohesion
- Detect common anti-patterns
- Suggest refactoring strategies
