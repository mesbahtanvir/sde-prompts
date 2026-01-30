# Performance Audit

**Usage:** `/pdd-audit-performance`

Audit code for performance issues and optimization opportunities. Detects N+1 queries, missing pagination, memory leaks, bundle bloat, and inefficient patterns. Outputs a report with recommendations.

> *"Premature optimization is the root of all evil. But so is ignoring obvious performance problems."*

---

## Workflow

### Phase 1: Identify Performance-Critical Areas

Find code that handles data and requests:

```bash
# Database/data access files
find . -name "*repository*" -o -name "*db*" -o -name "*query*" -o -name "*model*" 2>/dev/null | grep -v node_modules

# API handlers
find . -name "*controller*" -o -name "*handler*" -o -name "*route*" -o -name "*api*" 2>/dev/null | grep -v node_modules

# Data processing
find . -name "*service*" -o -name "*processor*" -o -name "*worker*" 2>/dev/null | grep -v node_modules
```

**STOP**: Present critical areas and ask "Any specific performance concerns?"

---

### Phase 2: N+1 Query Detection

**Find loop-based data fetching:**

```bash
# JavaScript/TypeScript - await in loop
grep -rn "for.*{" --include="*.ts" --include="*.js" -A 10 | grep -E "await.*find|await.*get|await.*fetch|await.*query"

# Nested queries pattern
grep -rn "\.map\(.*=>" --include="*.ts" --include="*.js" -A 5 | grep -E "await|\.then\("

# Python - query in loop
grep -rn "for.*in.*:" --include="*.py" -A 5 | grep -E "\.get\(|\.filter\(|\.query\("
```

**Check for batch operations:**

```bash
# Missing bulk/batch operations
grep -rn "\.create\(|\.insert\(|\.save\(" --include="*.ts" --include="*.js" --include="*.py" | grep -v "bulk\|batch\|Many"

# Should use findMany/getAll instead of loop
grep -rn "for.*{" --include="*.ts" --include="*.js" -A 5 | grep "findOne\|findById\|getOne"
```

---

### Phase 3: Pagination & Limits Analysis

**Find unbounded queries:**

```bash
# Missing limit/take
grep -rn "\.find(\|\.findAll\|\.query\|\.select" --include="*.ts" --include="*.js" | grep -v "limit\|take\|first\|top"

# Missing pagination parameters
grep -rn "async.*get.*\(" --include="*.ts" --include="*.js" | grep -v "page\|limit\|offset\|cursor"

# Large array operations without chunking
grep -rn "\.map\(|\.forEach\(|\.filter\(" --include="*.ts" --include="*.js" -B 2 | grep -E "all|every|entire|full"
```

**Check API endpoints:**

```bash
# List endpoints without pagination
grep -rn "router\.\(get\|post\)\|@Get\|@Post" --include="*.ts" --include="*.js" -A 10 | grep -v "page\|limit\|offset"
```

---

### Phase 4: Memory Leak Patterns

**Find common leak patterns:**

```bash
# Event listeners not removed
grep -rn "addEventListener\|\.on\(" --include="*.ts" --include="*.tsx" --include="*.js" | grep -v "removeEventListener\|\.off\("

# setInterval without cleanup
grep -rn "setInterval\(" --include="*.ts" --include="*.tsx" --include="*.js" | grep -v "clearInterval"

# Subscriptions without unsubscribe
grep -rn "\.subscribe\(" --include="*.ts" --include="*.tsx" | grep -v "unsubscribe"

# React useEffect without cleanup
grep -rn "useEffect\(" --include="*.tsx" --include="*.jsx" -A 10 | grep -v "return.*=>\|return function\|cleanup"
```

**Check for growing data structures:**

```bash
# Global/module-level arrays that grow
grep -rn "^const.*=\s*\[\]|^let.*=\s*\[\]" --include="*.ts" --include="*.js" | head -20

# Cache without eviction
grep -rn "cache\[.*\]\s*=\|Map\(\)|new Map\(" --include="*.ts" --include="*.js" | grep -v "delete\|clear\|size\|limit"
```

---

### Phase 5: Bundle Size Analysis

**Check for bundle bloat:**

```bash
# Large imports (importing entire libraries)
grep -rn "import.*from ['\"]lodash['\"]$\|import \* as" --include="*.ts" --include="*.tsx" --include="*.js"

# Should use specific imports
grep -rn "import.*{.*}.*from ['\"]lodash['\"]" --include="*.ts" --include="*.js" | grep -E ",.*,.*,.*,"

# Heavy dependencies
grep -rn "moment\|lodash$\|underscore" --include="*.ts" --include="*.js" --include="package.json"
```

**Check bundle configuration:**

```bash
# Check if tree-shaking enabled
grep -rn "sideEffects" package.json

# Check for dynamic imports
grep -rn "import\(" --include="*.ts" --include="*.tsx" --include="*.js"

# Check webpack/vite config for optimization
cat webpack.config.* vite.config.* 2>/dev/null | grep -E "splitChunks|minify|terser"
```

---

### Phase 6: Synchronous Blocking Operations

**Find blocking operations:**

```bash
# Synchronous file operations
grep -rn "readFileSync\|writeFileSync\|existsSync" --include="*.ts" --include="*.js"

# Blocking in request handlers
grep -rn "app\.\(get\|post\|put\|delete\)\|router\." --include="*.ts" --include="*.js" -A 15 | grep "Sync\("

# Heavy computation in main thread
grep -rn "JSON\.parse\|JSON\.stringify" --include="*.ts" --include="*.js" -B 2 | grep -E "large|big|all|entire"
```

**Check for missing async:**

```bash
# Functions that should be async
grep -rn "function.*fetch\|function.*load\|function.*get.*Data" --include="*.ts" --include="*.js" | grep -v "async"
```

---

### Phase 7: Caching Opportunities

**Find cacheable operations:**

```bash
# Repeated expensive operations
grep -rn "\.find\|\.filter\|\.map" --include="*.ts" --include="*.js" | sort | uniq -c | sort -rn | head -20

# API calls that could be cached
grep -rn "fetch\(|axios\.\|http\." --include="*.ts" --include="*.js" | grep -v "cache\|memo\|store"

# Missing memoization
grep -rn "useMemo\|useCallback\|memo\(" --include="*.tsx" --include="*.jsx" | wc -l
```

**Check for existing caching:**

```bash
# Cache implementations
grep -rn "cache\|Cache\|memo\|Memo" --include="*.ts" --include="*.js" | head -20

# Redis/caching service usage
grep -rn "redis\|Redis\|memcached" --include="*.ts" --include="*.js" --include="package.json"
```

---

### Phase 8: Database Query Optimization

**Find unoptimized queries:**

```bash
# SELECT * (fetch all columns)
grep -rn "SELECT \*\|\.select\(\*\)\|findAll\(\)" --include="*.ts" --include="*.js" --include="*.py"

# Missing indexes (queries on non-id fields)
grep -rn "where\|WHERE\|\.filter\(" --include="*.ts" --include="*.js" --include="*.py" | grep -v "id\|Id\|ID"

# Sorting without index
grep -rn "ORDER BY\|\.sort\(\|orderBy" --include="*.ts" --include="*.js" --include="*.py"

# String searches (often slow)
grep -rn "LIKE\|contains\|includes\|startsWith" --include="*.ts" --include="*.js" | grep -v "test\|spec"
```

**Check for inefficient joins:**

```bash
# Multiple sequential queries (should be joined)
grep -rn "await.*find\|await.*get" --include="*.ts" --include="*.js" -A 2 | grep -E "await.*find|await.*get"
```

---

### Phase 9: Frontend Performance

**Find rendering issues:**

```bash
# Missing keys in React lists
grep -rn "\.map\(" --include="*.tsx" --include="*.jsx" -A 3 | grep -v "key="

# Inline object/array creation (causes re-renders)
grep -rn "style={{" --include="*.tsx" --include="*.jsx"
grep -rn "onClick={() =>" --include="*.tsx" --include="*.jsx" | head -20

# Large component re-renders
grep -rn "useEffect\(" --include="*.tsx" --include="*.jsx" -A 5 | grep "\[\]" | head -10
```

**Check for lazy loading:**

```bash
# Images without lazy loading
grep -rn "<img" --include="*.tsx" --include="*.jsx" --include="*.html" | grep -v "loading=\|lazy"

# Components that could be lazy loaded
grep -rn "import.*from" --include="*.tsx" --include="*.jsx" | grep -E "Modal|Dialog|Chart|Table|Dashboard"
```

---

### Phase 10: Generate Performance Audit Report

```markdown
# Performance Audit Report

**PRD:** [Current PRD if applicable]
**Date:** [TODAY'S DATE]
**Result:** ✅ OPTIMIZED / ⚠️ ISSUES FOUND / 🔴 SIGNIFICANT PROBLEMS

## Summary

- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

## Performance Hotspots

| Area | Issues | Severity |
| ---- | ------ | -------- |
| Database Queries | 5 | 🔴 High Impact |
| Memory Management | 3 | 🟠 Medium |
| Bundle Size | 2 | 🟠 Medium |
| API Performance | 4 | 🟠 Medium |
| Frontend Rendering | 3 | 🟡 Low |

## Issues Found

### 🔴 Blockers (High Impact)

#### [PERF-001] N+1 Query Pattern
**Location:** `src/services/orderService.ts:45-52`
**Code:**
```typescript
for (const order of orders) {
  const customer = await customerRepo.findById(order.customerId); // N queries!
}
```
**Impact:** O(n) database queries instead of O(1)
**Fix:**
```typescript
const customerIds = orders.map(o => o.customerId);
const customers = await customerRepo.findByIds(customerIds); // 1 query
const customerMap = new Map(customers.map(c => [c.id, c]));
```

#### [PERF-002] Unbounded Query
**Location:** `src/api/users.ts:23`
**Code:** `const users = await User.findAll();`
**Impact:** Loads all users into memory, crashes with large datasets
**Fix:** Add pagination: `User.findAll({ limit: 50, offset: page * 50 })`

### 🟠 Warnings (Medium Impact)

#### [PERF-003] Memory Leak - Event Listener
**Location:** `src/components/Dashboard.tsx:15`
**Code:**
```typescript
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Missing cleanup!
}, []);
```
**Impact:** Event handlers accumulate on remount
**Fix:** Add cleanup: `return () => window.removeEventListener('resize', handleResize);`

#### [PERF-004] Bundle Bloat
**Location:** `src/utils/date.ts:1`
**Code:** `import moment from 'moment';`
**Impact:** Adds ~300KB to bundle
**Fix:** Use `date-fns` with tree-shaking or native `Intl.DateTimeFormat`

#### [PERF-005] Synchronous File Read
**Location:** `src/config/loader.ts:12`
**Code:** `const config = JSON.parse(fs.readFileSync(path));`
**Impact:** Blocks event loop during startup
**Fix:** Use `await fs.promises.readFile()` or load at build time

### 🟡 Advisories (Low Impact)

#### [PERF-006] Missing useMemo
**Location:** `src/components/DataTable.tsx:25`
**Code:** `const sortedData = data.sort((a, b) => ...);`
**Issue:** Sorts on every render
**Fix:** Wrap in `useMemo(() => data.sort(...), [data])`

#### [PERF-007] Inline Style Object
**Location:** `src/components/Button.tsx:8`
**Code:** `<div style={{ padding: 10 }}>`
**Issue:** Creates new object on every render
**Fix:** Extract to constant or use CSS classes

## Database Performance

### Query Analysis

| Query Location | Type | Issue | Recommendation |
| -------------- | ---- | ----- | -------------- |
| `userRepo.ts:34` | SELECT * | Fetches unnecessary columns | Select specific fields |
| `orderRepo.ts:56` | No index | WHERE on `createdAt` | Add index |
| `searchService.ts:12` | LIKE '%x%' | Full table scan | Use full-text search |

### Missing Indexes

| Table | Column | Query Pattern |
| ----- | ------ | ------------- |
| orders | customerId | Frequent lookups |
| products | category | Filter queries |
| logs | createdAt | Date range queries |

## Memory Analysis

| Pattern | Occurrences | Risk |
| ------- | ----------- | ---- |
| Event listeners without cleanup | 3 | 🟠 Medium |
| setInterval without clear | 2 | 🟠 Medium |
| Growing global arrays | 1 | 🔴 High |
| Subscriptions without unsubscribe | 2 | 🟠 Medium |

## Bundle Analysis

| Issue | File | Size Impact |
| ----- | ---- | ----------- |
| Full lodash import | utils/helpers.ts | +70KB |
| moment.js | utils/date.ts | +300KB |
| No code splitting | App.tsx | All routes in main bundle |

### Recommended Replacements

| Current | Alternative | Savings |
| ------- | ----------- | ------- |
| moment | date-fns | ~250KB |
| lodash (full) | lodash-es (tree-shake) | ~60KB |
| No lazy loading | React.lazy() | Varies |

## Caching Opportunities

| Operation | Location | Frequency | Recommendation |
| --------- | -------- | --------- | -------------- |
| User lookup | authMiddleware.ts | Every request | Add Redis cache |
| Config load | config.ts | Startup | Cache in memory |
| API response | fetchProducts.ts | Frequent | Add SWR/React Query |

## Recommendations

### Immediate (High Impact)

1. Fix N+1 query in orderService
2. Add pagination to user list endpoint
3. Add cleanup to useEffect hooks

### High Priority (This Sprint)

1. Replace moment.js with date-fns
2. Add database indexes
3. Implement lazy loading for routes

### Medium Priority (Backlog)

1. Add Redis caching layer
2. Implement query result caching
3. Optimize images with lazy loading

## Performance Scorecard

| Category | Status | Score |
| -------- | ------ | ----- |
| Database queries | 🔴 | 2/5 |
| Memory management | 🟠 | 3/5 |
| Bundle size | 🟠 | 3/5 |
| Caching | 🟠 | 3/5 |
| Async operations | 🟡 | 4/5 |
| Frontend rendering | 🟡 | 4/5 |

**Overall Performance Health:** 58%
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_Performance_Audit_[DATE].md`?"
2. "Should I create a performance optimization PRD?"

---

## Severity Levels

| Level | Icon | Description |
| ----- | ---- | ----------- |
| Blocker | 🔴 | N+1 queries, memory leaks, crashes with scale |
| Warning | 🟠 | Suboptimal patterns, noticeable slowness |
| Advisory | 🟡 | Minor optimizations, nice to have |

---

## Performance Principles

### Database

- **Batch over loop**: Use bulk operations
- **Index your queries**: Indexes on WHERE/ORDER columns
- **Paginate everything**: Never unbounded queries
- **Select only needed columns**: Avoid SELECT *

### Memory

- **Clean up listeners**: Always removeEventListener
- **Clear intervals**: Always clearInterval on unmount
- **Unsubscribe**: Always unsubscribe from observables
- **Bound caches**: Set max size on caches

### Bundle

- **Tree shake**: Use ES modules, specific imports
- **Code split**: Lazy load routes and heavy components
- **Replace heavy deps**: moment → date-fns, lodash → lodash-es

---

## Constraints

**MUST**:
- Detect N+1 query patterns
- Find memory leak patterns
- Identify unbounded queries
- Check for bundle bloat

**MUST NOT**:
- Run actual performance tests (static analysis only)
- Flag all loops as performance issues
- Require specific optimization libraries

**SHOULD**:
- Identify caching opportunities
- Find missing pagination
- Detect synchronous blocking
- Suggest specific replacements
