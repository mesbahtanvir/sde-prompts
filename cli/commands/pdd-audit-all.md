# Full Operations Audit

**Usage:** `/pdd-audit-all`

Run all three audits in sequence: DevOps, Security, and Production Readiness. Generates a comprehensive combined report.

---

## Workflow

This command orchestrates the execution of:
1. `/pdd-audit-devops` - Infrastructure and deployment analysis
2. `/pdd-audit-security` - Security vulnerability assessment
3. `/pdd-audit-production` - Production readiness check

### Phase 1: DevOps Audit

Execute full DevOps audit:

**Scope:**
- Dockerfile analysis
- CI/CD configuration review
- Kubernetes/IaC inspection
- Firebase workflow check
- Deployment status review

**Output:** DevOps findings with severity ratings

---

### Phase 2: Security Audit

Execute full Security audit:

**Scope:**
- Dependency vulnerability scan
- Secrets detection
- Token path analysis
- Injection vulnerability scan
- Authentication audit
- DDoS vulnerability assessment
- Data leakage analysis

**Output:** Security findings with severity ratings

---

### Phase 3: Production Readiness Audit

Execute full Production Readiness audit:

**Scope:**
- PRD feature completion check
- Test coverage analysis
- DevOps status (summary)
- Security status (summary)
- Backend staging logs analysis
- Frontend staging logs analysis
- Performance check

**Output:** Go/No-Go recommendation

---

### Phase 4: Generate Combined Report

Create unified audit report:

```markdown
# Full Operations Audit Report

**Date:** [TODAY'S DATE]
**PRD:** [Current PRD if applicable]
**Overall Result:** ✅ READY / ❌ NOT READY / ⚠️ CONDITIONAL

---

## Executive Summary

| Audit | Status | Blockers | Warnings | Advisories |
|-------|--------|----------|----------|------------|
| DevOps | ✅ Pass | 0 | 2 | 3 |
| Security | 🔴 Fail | 2 | 4 | 1 |
| Production | ⚠️ Conditional | 0 | 5 | 2 |
| **Total** | **🔴** | **2** | **11** | **6** |

---

## All Blockers (Must Fix)

### Security
| ID | Issue | Location | Fix |
|----|-------|----------|-----|
| SEC-001 | Critical CVE in axios | package.json | Upgrade to 1.6.0+ |
| SEC-002 | No rate limiting | src/routes/auth.ts | Add express-rate-limit |

---

## All Warnings (Should Fix)

### DevOps
| ID | Issue | Location |
|----|-------|----------|
| DEVOPS-001 | Using :latest tag | Dockerfile:1 |
| DEVOPS-002 | No readiness probe | k8s/deployment.yml |

### Security
| ID | Issue | Location |
|----|-------|----------|
| SEC-003 | Token in localStorage | src/lib/auth.ts |
| SEC-004 | Missing HSTS header | src/middleware/security.ts |
| SEC-005 | PII in logs | src/services/user.ts |
| SEC-006 | No password hashing | src/api/auth.ts |

### Production
| ID | Issue | Location |
|----|-------|----------|
| PROD-001 | Test coverage 75% | - |
| PROD-002 | Missing tests for utils | src/utils/ |
| PROD-003 | Frontend memory leak | src/components/Dashboard |
| PROD-004 | 3 TODOs blocking | Various |
| PROD-005 | PRD-002 80% complete | - |

---

## All Advisories (Nice to Fix)

### DevOps
| ID | Issue | Location |
|----|-------|----------|
| DEVOPS-003 | No Docker caching | Dockerfile |
| DEVOPS-004 | Missing .dockerignore | - |
| DEVOPS-005 | Manual rollback | - |

### Security
| ID | Issue | Location |
|----|-------|----------|
| SEC-007 | Verbose errors | src/middleware/error.ts |

### Production
| ID | Issue | Location |
|----|-------|----------|
| PROD-006 | Console warnings | Frontend |
| PROD-007 | Deprecated API usage | src/api/ |

---

## Detailed Reports

### DevOps Audit Summary

**Infrastructure Files Found:**
- Dockerfile ✓
- docker-compose.yml ✓
- .github/workflows/deploy.yml ✓
- firebase.json ✓

**Key Findings:**
- Container runs as non-root ✅
- CI/CD pipeline passing ✅
- Using unpinned base image ⚠️
- Missing health check endpoint ⚠️

[Full details: `docs/audits/PRD-XXX_DevOps_Audit_[DATE].md`]

---

### Security Audit Summary

**Vulnerability Scan:**
- Critical CVEs: 1
- High CVEs: 3
- Medium CVEs: 5

**Secrets Scan:**
- Hardcoded secrets: 0 ✅
- Exposed tokens: 0 ✅

**Auth Analysis:**
- Protected routes: 95% ✅
- Rate limiting: ❌ Missing

[Full details: `docs/audits/PRD-XXX_Security_Audit_[DATE].md`]

---

### Production Readiness Summary

**Feature Completion:**
- PRDs analyzed: 3
- Complete: 2
- In progress: 1 (80%)

**Test Coverage:**
- Overall: 75% ⚠️
- Critical paths: 90% ✅

**Staging Logs:**
- Backend errors: 0 ✅
- Frontend errors: 3 ⚠️

[Full details: `docs/audits/PRD-XXX_Production_Audit_[DATE].md`]

---

## Go/No-Go Recommendation

### ❌ NOT READY FOR PRODUCTION

**Reason:** 2 security blockers must be fixed before deployment.

### Required Actions Before Deploy:
1. [ ] Fix CVE in axios (upgrade to 1.6.0+)
2. [ ] Implement rate limiting on auth endpoints

### Recommended Actions (can deploy with warnings):
3. [ ] Increase test coverage to 80%
4. [ ] Add Kubernetes readiness probe
5. [ ] Move tokens to httpOnly cookies
6. [ ] Fix frontend memory leak

### Post-Deploy Actions:
7. [ ] Address all advisories
8. [ ] Complete PRD-002 remaining 20%
9. [ ] Add HSTS headers

---

## Timeline Estimate

| Priority | Items | Effort |
|----------|-------|--------|
| Blocker fixes | 2 | 2-4 hours |
| Warning fixes | 11 | 2-3 days |
| Advisory fixes | 6 | 1-2 days |

---

## Appendix

### A. Files Analyzed
```
Dockerfile
docker-compose.yml
.github/workflows/*.yml
firebase.json
firestore.rules
package.json
src/**/*.ts
tests/**/*.test.ts
logs/*.log
```

### B. Tools Used
- npm audit (dependency scan)
- grep patterns (secrets, injection)
- test coverage report
- log analysis

### C. Excluded from Scan
- node_modules/
- .git/
- dist/
- build/
```

**STOP**: Present combined report and ask:
1. "Save combined report to `docs/audits/PRD-XXX_Full_Audit_[DATE].md`?"
2. "Also save individual audit reports?"
3. "Create a PRD for all fixes?"

---

## Report Output

This command generates up to 4 files:
1. `docs/audits/PRD-XXX_Full_Audit_YYYY-MM-DD.md` - Combined report
2. `docs/audits/PRD-XXX_DevOps_Audit_YYYY-MM-DD.md` - DevOps details
3. `docs/audits/PRD-XXX_Security_Audit_YYYY-MM-DD.md` - Security details
4. `docs/audits/PRD-XXX_Production_Audit_YYYY-MM-DD.md` - Production details

---

## Constraints

**MUST**:
- Run all three audits completely
- Aggregate findings into single view
- Provide clear go/no-go decision
- List all blockers prominently
- Generate actionable fix list

**MUST NOT**:
- Skip any audit phase
- Approve with security blockers
- Miss aggregating critical issues
- Generate reports without analysis

**SHOULD**:
- Deduplicate findings across audits
- Prioritize combined recommendations
- Estimate fix effort
- Suggest timeline for remediation
