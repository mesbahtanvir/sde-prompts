# Production Readiness Audit

**Usage:** `/pdd-audit-production`

Comprehensive production readiness check covering feature completion, test coverage, DevOps status, security posture, and staging log analysis. This is the "go/no-go" check before shipping.

---

## Workflow

### Phase 1: PRD Feature Completion Check

Verify all acceptance criteria are implemented:

```bash
# Find all PRDs
ls docs/prd/*.md

# Check PRD status
grep -l "Status.*In Progress\|Status.*Ready" docs/prd/*.md
```

**For each active PRD:**
1. Extract acceptance criteria
2. Verify implementation exists
3. Check for TODO/FIXME related to PRD

```bash
# Find unfinished work
grep -rE "TODO|FIXME|HACK|XXX" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.py"

# Find PRD references in code
grep -rE "PRD-[0-9]+" --include="*.ts" --include="*.js" --include="*.py"
```

**Feature Checklist:**
- [ ] All acceptance criteria implemented
- [ ] No blocking TODOs remaining
- [ ] Feature flags properly configured
- [ ] Documentation updated

**STOP**: Present feature completion status and ask "Any known incomplete features to exclude?"

### Phase 2: Test Coverage Analysis

Check test coverage and quality:

```bash
# Run test coverage (Node.js)
npm test -- --coverage 2>/dev/null || yarn test --coverage 2>/dev/null

# Run test coverage (Python)
pytest --cov=. --cov-report=term-missing 2>/dev/null

# Find files without tests
find src -name "*.ts" -o -name "*.tsx" | while read f; do
  testfile="${f/src/tests}"
  testfile="${testfile/.ts/.test.ts}"
  [ ! -f "$testfile" ] && echo "Missing test: $f"
done
```

**Test Coverage Checklist:**
- [ ] Overall coverage > 80%
- [ ] Critical paths covered
- [ ] Edge cases tested
- [ ] Integration tests exist
- [ ] E2E tests for main flows
- [ ] No skipped/pending tests

```bash
# Find skipped tests
grep -rE "\.skip\(|@skip|@pytest.mark.skip|xit\(|xdescribe\(" --include="*.test.*" --include="*_test.py"
```

### Phase 3: DevOps Audit (Condensed)

Quick infrastructure check (full details via `/pdd-audit-devops`):

**Docker:**
- [ ] Dockerfile exists and builds
- [ ] No root user
- [ ] Health check defined

**CI/CD:**
- [ ] Pipeline passes
- [ ] Tests run in CI
- [ ] Deploy workflow exists

**Infrastructure:**
- [ ] Environment variables documented
- [ ] Secrets not in code
- [ ] Rollback strategy exists

```bash
# Quick checks
[ -f Dockerfile ] && echo "✅ Dockerfile exists" || echo "❌ No Dockerfile"
[ -d .github/workflows ] && echo "✅ GitHub Actions exists" || echo "❌ No CI/CD"
grep -q "healthcheck" Dockerfile 2>/dev/null && echo "✅ Health check" || echo "⚠️ No health check"
```

### Phase 4: Security Audit (Condensed)

Quick security check (full details via `/pdd-audit-security`):

**Critical Checks:**
- [ ] No critical CVEs
- [ ] No hardcoded secrets
- [ ] Auth on all protected routes
- [ ] Rate limiting enabled
- [ ] HTTPS enforced

```bash
# Quick security scan
npm audit --audit-level=critical 2>/dev/null
grep -rE "(password|secret|apikey)\s*[:=]\s*['\"][^'\"]+['\"]" --include="*.ts" --include="*.js" --include="*.env*" | head -5
```

### Phase 5: Backend Staging Logs Analysis

Analyze backend logs for issues:

```bash
# Common log locations
cat logs/backend/*.log 2>/dev/null | tail -500
cat /var/log/app/*.log 2>/dev/null | tail -500

# Or fetch from logging service
# gcloud logging read "resource.type=cloud_run_revision" --limit=500
# heroku logs -n 500
```

**Backend Log Checklist:**
- [ ] No unhandled exceptions
- [ ] No repeated errors
- [ ] No memory warnings
- [ ] No timeout errors
- [ ] No database connection issues
- [ ] Response times acceptable

```bash
# Find errors in logs
grep -iE "error|exception|fail|crash|timeout" logs/*.log | tail -50

# Find slow requests
grep -E "took [0-9]{4,}ms" logs/*.log | tail -20
```

### Phase 6: Frontend Staging Logs Analysis

Analyze frontend console errors:

```bash
# Browser console logs (if captured)
cat logs/frontend/*.log 2>/dev/null | tail -500

# Sentry/error tracking (check dashboard)
# Check browser dev tools console
```

**Frontend Log Checklist:**
- [ ] No JavaScript errors
- [ ] No 404s on resources
- [ ] No CORS errors
- [ ] No unhandled promise rejections
- [ ] No console warnings in production
- [ ] No performance warnings

```bash
# Find frontend errors
grep -iE "error|uncaught|rejected|failed" logs/frontend/*.log 2>/dev/null | tail -50
```

### Phase 7: Performance & Reliability Check

```bash
# Check bundle size (frontend)
npm run build 2>/dev/null && du -sh dist/ build/ .next/ 2>/dev/null | head -1

# Check startup time
time npm start &
sleep 10 && curl -s localhost:3000/health && kill %1

# Check memory usage
ps aux | grep node | grep -v grep | awk '{print $4}' | head -1
```

**Performance Checklist:**
- [ ] Bundle size < 500KB (gzipped)
- [ ] Initial load < 3s
- [ ] API response < 200ms (p95)
- [ ] Memory usage stable
- [ ] No memory leaks detected

### Phase 8: Generate Production Readiness Report

Create the comprehensive audit report:

```markdown
# Production Readiness Audit Report

**PRD:** [Current PRD]
**Date:** [TODAY'S DATE]
**Result:** ✅ READY / ❌ NOT READY / ⚠️ CONDITIONAL

## Executive Summary

| Category | Status | Score |
|----------|--------|-------|
| Feature Completion | ✅ | 100% |
| Test Coverage | ⚠️ | 75% |
| DevOps | ✅ | Pass |
| Security | 🔴 | 2 Blockers |
| Backend Stability | ✅ | Pass |
| Frontend Stability | ⚠️ | 3 Warnings |

**Overall: ❌ NOT READY** (2 blockers must be fixed)

## Summary
- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

---

## 1. Feature Completion

### PRD Status
| PRD | Status | Completion |
|-----|--------|------------|
| PRD-001 | ✅ Complete | 100% |
| PRD-002 | ⚠️ In Progress | 80% |

### Incomplete Items
- [ ] PRD-002 AC3: Export to PDF not implemented
- [ ] PRD-002 AC5: Email notifications pending

### Blocking TODOs
| Location | TODO | Blocker? |
|----------|------|----------|
| `src/export.ts:45` | TODO: Implement PDF | Yes |

---

## 2. Test Coverage

**Overall Coverage:** 75%

| Module | Coverage | Status |
|--------|----------|--------|
| src/auth | 92% | ✅ |
| src/api | 85% | ✅ |
| src/utils | 45% | 🔴 |

### Missing Tests
- `src/utils/export.ts` - No tests
- `src/services/email.ts` - No tests

### Skipped Tests
- `auth.test.ts:45` - Skipped: "flaky"

---

## 3. DevOps Status

| Check | Status | Details |
|-------|--------|---------|
| Dockerfile | ✅ | Builds successfully |
| CI Pipeline | ✅ | All checks pass |
| Health Check | ⚠️ | Missing readiness probe |
| Secrets | ✅ | All in env vars |
| Rollback | ⚠️ | Manual only |

---

## 4. Security Status

| Check | Status | Details |
|-------|--------|---------|
| Dependencies | 🔴 | 2 critical CVEs |
| Secrets | ✅ | No hardcoded |
| Auth | ✅ | All routes protected |
| Rate Limiting | 🔴 | Not implemented |
| HTTPS | ✅ | Enforced |

### Security Blockers
1. [SEC-001] CVE-2024-1234 in axios
2. [SEC-002] No rate limiting on /api/login

---

## 5. Backend Stability

**Log Analysis Period:** Last 24 hours

| Metric | Value | Status |
|--------|-------|--------|
| Error Rate | 0.1% | ✅ |
| p95 Latency | 180ms | ✅ |
| Timeouts | 0 | ✅ |
| Memory | Stable | ✅ |

### Recent Errors
No critical errors in last 24 hours.

---

## 6. Frontend Stability

**Log Analysis Period:** Last 24 hours

| Metric | Value | Status |
|--------|-------|--------|
| JS Errors | 3 types | ⚠️ |
| 404 Errors | 0 | ✅ |
| Bundle Size | 420KB | ✅ |
| FCP | 1.8s | ✅ |

### Frontend Issues
1. [FE-001] Unhandled rejection in UserProfile
2. [FE-002] Console warning: deprecated API
3. [FE-003] Memory leak in Dashboard

---

## Go/No-Go Decision

### 🔴 Blockers (Must Fix)
1. CVE-2024-1234 in axios - Upgrade required
2. No rate limiting - DDoS vulnerability

### 🟠 Warnings (Should Fix)
1. Test coverage below 80%
2. Missing readiness probe
3. Frontend memory leak

### 🟡 Advisories (Nice to Fix)
1. Manual rollback process
2. Deprecated API warnings

---

## Recommendations

### Before Deploy
1. ❌ Fix axios vulnerability
2. ❌ Add rate limiting to auth endpoints

### After Deploy
3. Increase test coverage to 80%
4. Add Kubernetes readiness probe
5. Investigate frontend memory leak

## Next Steps
- [ ] Fix blockers
- [ ] Re-run production audit
- [ ] Get sign-off for deployment
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_Production_Audit_[DATE].md`?"
2. "Ready to deploy or need to fix blockers first?"

---

## Go/No-Go Criteria

| Verdict | Criteria |
|---------|----------|
| ✅ READY | 0 blockers, < 3 warnings |
| ⚠️ CONDITIONAL | 0 blockers, 3+ warnings (deploy with caution) |
| ❌ NOT READY | Any blockers present |

---

## Constraints

**MUST**:
- Check all PRD acceptance criteria
- Verify test coverage meets threshold
- Confirm no security blockers
- Analyze staging logs for errors
- Provide clear go/no-go recommendation

**MUST NOT**:
- Approve deploy with security blockers
- Skip log analysis
- Ignore test failures
- Miss incomplete features

**SHOULD**:
- Check performance metrics
- Verify documentation updated
- Confirm rollback plan exists
- Review monitoring setup
