# Clean Code Audit

**Usage:** `/pdd-code-compact`

Audit code quality against Uncle Bob's Clean Code principles. Analyzes naming, functions, comments, formatting, error handling, and SOLID principles. Outputs a PRD for refactoring improvements.

> *"Clean code is simple and direct. Clean code reads like well-written prose."*
> — Robert C. Martin

---

## Workflow

### Phase 1: Understand the Codebase

Scan the project structure:

```bash
# Find main source directories
find . -type d -name "src" -o -name "lib" -o -name "app" | head -10

# Identify primary language
find . -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.java" -o -name "*.go" -o -name "*.rs" | head -50
```

**STOP**: Present codebase overview and ask "Which directories should I focus on?"

---

### Phase 2: Naming Analysis

> *"The name of a variable, function, or class should answer why it exists, what it does, and how it is used."*

**Check for:**

1. **Single-letter variables** (except loop counters)

   ```bash
   grep -rE "\b[a-z]\s*=" --include="*.ts" --include="*.js" --include="*.py" | grep -v "for\|i\s*=\|j\s*=\|k\s*="
   ```

1. **Abbreviated names** (hard to understand)

   ```bash
   grep -rE "\b[a-z]{1,3}[A-Z]|_[a-z]{1,2}_" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Generic names** (data, info, temp, foo, bar, thing)

   ```bash
   grep -rE "\b(data|info|temp|tmp|foo|bar|thing|stuff|item|obj|val)\b" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Inconsistent naming** (mixing camelCase, snake_case)

1. **Noise words** (Manager, Processor, Handler everywhere)

**Clean Code Principles:**

- ✅ Use intention-revealing names
- ✅ Avoid disinformation
- ✅ Make meaningful distinctions
- ✅ Use pronounceable names
- ✅ Use searchable names
- ✅ Class names = nouns, method names = verbs

---

### Phase 3: Function Analysis

> *"Functions should do one thing. They should do it well. They should do it only."*

**Check for:**

1. **Long functions** (>20 lines is a smell)

   ```bash
   # Find files, then analyze function lengths manually
   find . -name "*.ts" -o -name "*.js" -o -name "*.py" | head -20
   ```

1. **Too many parameters** (>3 is a smell)

   ```bash
   grep -rE "function.*\(.*,.*,.*,.*\)|def.*\(.*,.*,.*,.*\)" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Boolean flag arguments** (function does two things)

   ```bash
   grep -rE "\(.*:\s*boolean|,\s*true\)|,\s*false\)" --include="*.ts" --include="*.js"
   ```

1. **Output arguments** (modifying passed objects)

1. **Side effects** (doing more than the name suggests)

**Clean Code Principles:**

- ✅ Small! (ideally <20 lines)
- ✅ Do one thing
- ✅ One level of abstraction
- ✅ Stepdown rule (high to low abstraction)
- ✅ Minimal arguments (0 best, 1-2 good, 3 max)
- ✅ No side effects
- ✅ Command-Query Separation
- ✅ DRY - Don't Repeat Yourself

---

### Phase 4: Comment Analysis

> *"Comments are, at best, a necessary evil. Clear code needs few comments."*

**Check for:**

1. **Commented-out code** (delete it, use git)

   ```bash
   grep -rE "^\s*(//|#)\s*(function|def|class|const|let|var|if|for|while)" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Redundant comments** (restating the code)

   ```bash
   grep -rE "//\s*(increment|add|set|get|return)" --include="*.ts" --include="*.js"
   ```

1. **TODO/FIXME/HACK comments** (track these)

   ```bash
   grep -rE "(TODO|FIXME|HACK|XXX|BUG):" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Journal comments** (use git log instead)

1. **Noise comments** (obvious documentation)

**Clean Code Principles:**

- ✅ Explain "why", not "what"
- ✅ Good comments: legal, informative, explanation of intent, warning, TODO
- ❌ Bad comments: redundant, misleading, mandated, journal, noise, position markers

---

### Phase 5: Formatting Analysis

> *"Code formatting is about communication, and communication is the professional developer's first order of business."*

**Check for:**

1. **Inconsistent indentation**
1. **Long lines** (>120 characters)

   ```bash
   grep -rE ".{120,}" --include="*.ts" --include="*.js" --include="*.py" | head -20
   ```

1. **Mixed formatting styles**
1. **Lack of vertical separation** (concepts not separated by blank lines)
1. **Related code far apart**

**Clean Code Principles:**

- ✅ Vertical openness between concepts
- ✅ Vertical density for related code
- ✅ Vertical distance (related things close)
- ✅ Horizontal alignment (rarely needed)
- ✅ Team rules over personal preference

---

### Phase 6: Error Handling Analysis

> *"Error handling is important, but if it obscures logic, it's wrong."*

**Check for:**

1. **Empty catch blocks**

   ```bash
   grep -rE "catch.*\{\s*\}" --include="*.ts" --include="*.js"
   grep -rE "except.*:\s*pass" --include="*.py"
   ```

1. **Returning null**

   ```bash
   grep -rE "return null|return None" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Generic error catching**

   ```bash
   grep -rE "catch\s*\(.*\)|except\s*:" --include="*.ts" --include="*.js" --include="*.py"
   ```

1. **Error codes instead of exceptions**

1. **Missing error context**

**Clean Code Principles:**

- ✅ Use exceptions, not return codes
- ✅ Write try-catch-finally first
- ✅ Provide context in exceptions
- ✅ Define exception classes by caller's needs
- ✅ Don't return null
- ✅ Don't pass null

---

### Phase 7: Class/Module Analysis

> *"The first rule of classes is that they should be small. The second rule is that they should be smaller than that."*

**Check for:**

1. **Large files** (>300 lines is a smell)

   ```bash
   find . -name "*.ts" -o -name "*.js" -o -name "*.py" -exec wc -l {} \; | sort -rn | head -20
   ```

1. **Too many methods/functions per file**

1. **Low cohesion** (methods don't use class variables)

1. **God classes** (does everything)

1. **Feature envy** (uses other classes more than itself)

**Clean Code Principles:**

- ✅ Small classes
- ✅ Single Responsibility Principle
- ✅ High cohesion
- ✅ Low coupling
- ✅ Organize for change (Open/Closed)

---

### Phase 8: SOLID Principles Check

**S - Single Responsibility Principle**

> *"A class should have one, and only one, reason to change."*

- Does each class/module have a single purpose?
- Would you struggle to describe what a class does in one sentence?

**O - Open/Closed Principle**

> *"Software entities should be open for extension, but closed for modification."*

- Can you add new behavior without modifying existing code?
- Are you using inheritance/composition appropriately?

**L - Liskov Substitution Principle**

> *"Subtypes must be substitutable for their base types."*

- Do subclasses override methods in ways that break expectations?

**I - Interface Segregation Principle**

> *"Clients should not be forced to depend on interfaces they do not use."*

- Are interfaces small and focused?
- Do implementers need all the methods?

**D - Dependency Inversion Principle**

> *"Depend on abstractions, not concretions."*

- Are high-level modules depending on low-level modules?
- Are dependencies injected rather than created internally?

---

### Phase 9: DRY Analysis

> *"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."*

**Check for:**

1. **Duplicate code blocks**

   ```bash
   # Look for similar patterns manually in identified files
   ```

1. **Copy-pasted logic with minor variations**

1. **Same magic numbers in multiple places**

   ```bash
   grep -rE "\b(100|1000|60|24|365|3600)\b" --include="*.ts" --include="*.js" --include="*.py" | head -20
   ```

1. **Repeated validation logic**

1. **Similar error handling patterns**

---

### Phase 10: Generate Clean Code Report

Create the audit report:

```markdown
# Clean Code Audit Report

**PRD:** [Current PRD if applicable]
**Date:** [TODAY'S DATE]
**Result:** ✅ CLEAN / ⚠️ NEEDS WORK / 🔴 SIGNIFICANT DEBT

## Executive Summary

| Category | Score | Issues |
|----------|-------|--------|
| Naming | ⭐⭐⭐☆☆ | 5 concerns |
| Functions | ⭐⭐☆☆☆ | 8 smells |
| Comments | ⭐⭐⭐⭐☆ | 2 suggestions |
| Formatting | ⭐⭐⭐⭐⭐ | 0 issues |
| Error Handling | ⭐⭐⭐☆☆ | 4 concerns |
| Classes/Modules | ⭐⭐☆☆☆ | 6 smells |
| SOLID | ⭐⭐⭐☆☆ | 3 violations |
| DRY | ⭐⭐⭐☆☆ | 4 duplications |

## Summary
- 🔴 Smells: X (hurts maintainability)
- 🟠 Concerns: X (violates best practice)
- 🟡 Suggestions: X (could be cleaner)

---

## Issues Found

### 🔴 Smells

#### [CC-001] God Class: UserService
**Location:** `src/services/UserService.ts`
**Lines:** 487 lines, 32 methods
**Principle:** Single Responsibility Principle
**Issue:** This class handles authentication, profile management, notifications, and billing.
**Recommendation:** Split into AuthService, ProfileService, NotificationService, BillingService.
**Reference:** Clean Code Ch. 10 - Classes

#### [CC-002] Long Function: processOrder
**Location:** `src/handlers/orders.ts:45-120`
**Lines:** 75 lines
**Principle:** Functions should be small
**Issue:** Function does validation, calculation, persistence, and notification.
**Recommendation:** Extract into validateOrder(), calculateTotal(), saveOrder(), notifyCustomer().
**Reference:** Clean Code Ch. 3 - Functions

### 🟠 Concerns

#### [CC-003] Poor Naming: `d` variable
**Location:** `src/utils/date.ts:23`
**Code:** `const d = new Date();`
**Principle:** Intention-revealing names
**Issue:** Single letter variable outside loop context.
**Recommendation:** Rename to `currentDate` or `timestamp`.
**Reference:** Clean Code Ch. 2 - Meaningful Names

#### [CC-004] Boolean Flag Argument
**Location:** `src/api/users.ts:67`
**Code:** `function getUser(id: string, includeDeleted: boolean)`
**Principle:** Functions should do one thing
**Issue:** Boolean argument means function does two things.
**Recommendation:** Split into `getUser()` and `getUserIncludingDeleted()`.
**Reference:** Clean Code Ch. 3 - Function Arguments

### 🟡 Suggestions

#### [CC-005] TODO Comment
**Location:** `src/components/Dashboard.tsx:34`
**Code:** `// TODO: Add caching`
**Principle:** Track TODOs
**Recommendation:** Create ticket or implement. Don't leave indefinitely.
**Reference:** Clean Code Ch. 4 - TODO Comments

---

## Refactoring Priorities

### High Impact (Do First)
| Issue | Location | Effort | Impact |
|-------|----------|--------|--------|
| CC-001 | UserService | Large | High |
| CC-002 | processOrder | Medium | High |

### Medium Impact (Do Soon)
| Issue | Location | Effort | Impact |
|-------|----------|--------|--------|
| CC-003 | date.ts | Small | Medium |
| CC-004 | users.ts | Small | Medium |

### Low Impact (Do Eventually)
| Issue | Location | Effort | Impact |
|-------|----------|--------|--------|
| CC-005 | Dashboard | Small | Low |

---

## Clean Code Scorecard

| Principle | Status | Notes |
|-----------|--------|-------|
| Meaningful Names | ⚠️ | 5 poor names found |
| Small Functions | ❌ | 3 functions >50 lines |
| Do One Thing | ⚠️ | 4 functions do multiple things |
| DRY | ⚠️ | Some duplication detected |
| Comments | ✅ | Mostly clean |
| Formatting | ✅ | Consistent |
| Error Handling | ⚠️ | 2 empty catches |
| SRP | ❌ | 2 god classes |
| OCP | ⚠️ | Some rigidity |
| LSP | ✅ | No violations |
| ISP | ✅ | Interfaces focused |
| DIP | ⚠️ | Some tight coupling |

---

## Recommended Reading

Based on findings, review these Clean Code chapters:
1. Chapter 3: Functions (8 issues)
2. Chapter 10: Classes (6 issues)
3. Chapter 2: Meaningful Names (5 issues)

---

## Next Steps
- [ ] Address all 🔴 smells before next release
- [ ] Schedule refactoring for 🟠 concerns
- [ ] Track 🟡 suggestions in backlog
- [ ] Re-run audit after refactoring
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_CleanCode_Audit_[DATE].md`?"
2. "Should I create a refactoring PRD from these findings?"

---

## Severity Levels

| Level | Icon | Description |
| ----- | ---- | ----------- |
| Smell | 🔴 | Code smell that hurts maintainability |
| Concern | 🟠 | Violates best practice, should refactor |
| Suggestion | 🟡 | Could be cleaner, nice to have |

---

## Clean Code Quick Reference

### The Boy Scout Rule

> *"Leave the campground cleaner than you found it."*

### Functions

- SMALL (ideally <20 lines)
- Do ONE thing
- One level of abstraction
- 0-2 arguments (3 max)
- No side effects

### Names

- Reveal intention
- Avoid disinformation
- Make distinctions meaningful
- Pronounceable & searchable
- Nouns for classes, verbs for methods

### Classes

- SMALL (single responsibility)
- High cohesion
- Low coupling
- Open for extension, closed for modification

---

## Constraints

**MUST**:
- Analyze code against all Clean Code principles
- Provide specific file locations and line numbers
- Reference Clean Code chapters for each finding
- Prioritize findings by impact
- Be language agnostic

**MUST NOT**:
- Miss obvious code smells
- Suggest changes that break functionality
- Focus on style over substance
- Ignore SOLID principles

**SHOULD**:
- Quote relevant Clean Code passages
- Provide refactoring examples
- Estimate effort for fixes
- Consider existing code patterns
