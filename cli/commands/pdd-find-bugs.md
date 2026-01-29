# Find Bugs

**Usage:** `/pdd-find-bugs`

Find bugs, quality issues, and reliability problems. Outputs a PRD for fixes.

---

## Workflow

### Phase 1: Understand the System

Review the codebase structure:

```bash
ls -la
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" | head -20
```

### Phase 2: Bug Hunt

Search for common bug patterns:

**Race Conditions:**
```bash
grep -r "async\|await\|Promise" --include="*.ts" --include="*.tsx"
```

**Null/Undefined Issues:**
```bash
grep -r "null\|undefined" --include="*.ts"
```

**Error Handling:**
```bash
grep -r "try\|catch\|throw" --include="*.ts"
```

**Console Statements (should be removed):**
```bash
grep -r "console\." --include="*.ts" --include="*.tsx"
```

### Phase 3: Security Assessment

Check for common vulnerabilities:

- [ ] SQL injection (raw queries)
- [ ] XSS (unsanitized user input in HTML)
- [ ] CSRF (missing tokens)
- [ ] Secrets in code (API keys, passwords)
- [ ] Insecure dependencies

```bash
grep -r "password\|secret\|api_key\|apikey" --include="*.ts" --include="*.env*"
```

### Phase 4: Performance Issues

Look for:

- [ ] N+1 queries (loops with DB calls)
- [ ] Missing pagination
- [ ] Large bundle imports
- [ ] Unoptimized images
- [ ] Missing caching

### Phase 5: Code Quality

Check for:

- [ ] Dead code
- [ ] Duplicate code
- [ ] Long functions (>50 lines)
- [ ] Deep nesting (>3 levels)
- [ ] Missing error handling
- [ ] Hardcoded values

### Phase 6: Generate QA Report

```markdown
## QA Audit Report

### Bugs Found
| Severity | Issue | Location | Description |
|----------|-------|----------|-------------|
| Critical | Race condition | `src/api/save.ts:45` | Concurrent saves can corrupt data |
| High | Missing null check | `src/utils/parse.ts:12` | Crashes on empty input |

### Security Issues
| Severity | Issue | Location |
|----------|-------|----------|
| Critical | API key in code | `src/config.ts:5` |
| Medium | No CSRF token | `src/api/submit.ts` |

### Performance Issues
- N+1 query in user list (`src/pages/Users.tsx:30`)
- Missing pagination on large dataset

### Code Quality
- 5 functions over 50 lines
- 12 console.log statements to remove
- 3 TODO comments to address
```

### Phase 7: Prioritize Fixes

**STOP**: Present findings and ask:
- "Should I create a QA improvement PRD?"
- "Should I help fix critical issues now?"

---

## Severity Levels

| Severity | Description | Action |
|----------|-------------|--------|
| Critical | Data loss, security breach, crashes | Fix immediately |
| High | Major feature broken, bad UX | Fix this sprint |
| Medium | Degraded experience, tech debt | Plan to fix |
| Low | Minor issues, improvements | Backlog |

---

## Constraints

**MUST**:
- Check for security vulnerabilities
- Identify data integrity risks
- Provide specific file locations and line numbers
- Prioritize by severity

**MUST NOT**:
- Ignore security issues
- Skip error handling review
- Miss obvious bugs for style issues
