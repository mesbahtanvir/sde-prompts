# DevOps Audit

**Usage:** `/pdd-audit-devops`

Analyze deployment code, CI/CD configurations, infrastructure as code, and Firebase workflows. Outputs an audit report with issues and recommendations.

---

## Workflow

### Phase 1: Discover Infrastructure Files

Scan for deployment and infrastructure files:

```bash
# Find all infrastructure-related files
find . -name "Dockerfile*" -o -name "docker-compose*.yml" -o -name "*.dockerfile" 2>/dev/null
find . -name "*.tf" -o -name "*.tfvars" 2>/dev/null
find . -path "*/.github/workflows/*.yml" -o -path "*/.github/workflows/*.yaml" 2>/dev/null
find . -name "firebase.json" -o -name ".firebaserc" -o -name "firestore.rules" 2>/dev/null
find . -name "kubernetes*.yml" -o -name "k8s*.yml" -o -name "*.yaml" -path "*/k8s/*" 2>/dev/null
```

**STOP**: Present discovered files and ask "Any additional infrastructure files to include?"

### Phase 2: Dockerfile Analysis

Check for Dockerfile best practices:

**Security Issues:**
- [ ] Running as root (no USER directive)
- [ ] Using `latest` tag (unpinned base images)
- [ ] Secrets in build args or ENV
- [ ] Unnecessary packages installed
- [ ] Missing health checks

**Best Practices:**
- [ ] Multi-stage builds used
- [ ] .dockerignore exists
- [ ] Layer caching optimized
- [ ] Non-root user configured
- [ ] Minimal base image

```bash
# Check for root user issues
grep -r "USER" Dockerfile* || echo "WARNING: No USER directive found"

# Check for latest tags
grep -r "FROM.*:latest" Dockerfile*

# Check for secrets in ENV
grep -rE "ENV.*(PASSWORD|SECRET|KEY|TOKEN)" Dockerfile*
```

### Phase 3: CI/CD Analysis

Check GitHub Actions and CI/CD configurations:

**Security Issues:**
- [ ] Secrets exposed in logs
- [ ] Permissions too broad
- [ ] Unvalidated inputs in workflows
- [ ] Missing pin on action versions
- [ ] Pull request target without restrictions

**Best Practices:**
- [ ] Actions pinned to SHA or version
- [ ] Minimal permissions (least privilege)
- [ ] Secrets used properly
- [ ] Caching configured
- [ ] Matrix builds for efficiency

```bash
# Check for unpinned actions
grep -r "uses:.*@master\|uses:.*@main" .github/workflows/

# Check for broad permissions
grep -rA5 "permissions:" .github/workflows/

# Check for secrets usage
grep -r "\${{ secrets\." .github/workflows/
```

### Phase 4: Kubernetes/Infrastructure Analysis

Check Kubernetes manifests and IaC:

**Security Issues:**
- [ ] Privileged containers
- [ ] Missing resource limits
- [ ] No network policies
- [ ] Secrets in plain text
- [ ] Missing security contexts

**Best Practices:**
- [ ] Resource limits defined
- [ ] Health checks (liveness/readiness)
- [ ] Rolling update strategy
- [ ] ConfigMaps/Secrets used properly
- [ ] Namespace isolation

```bash
# Check for privileged containers
grep -r "privileged: true" *.yml *.yaml 2>/dev/null

# Check for missing resource limits
grep -rL "resources:" *deployment*.yml 2>/dev/null

# Check for plain text secrets
grep -rE "password:|secret:|apiKey:" *.yml *.yaml 2>/dev/null
```

### Phase 5: Firebase Analysis

Check Firebase configuration and workflows:

**Security Issues:**
- [ ] Overly permissive Firestore rules
- [ ] Storage rules allow public write
- [ ] No authentication required
- [ ] Admin SDK credentials exposed

**Best Practices:**
- [ ] Rules require authentication
- [ ] Field-level validation
- [ ] Rate limiting configured
- [ ] Indexes defined
- [ ] Emulator configured for local dev

```bash
# Check Firestore rules for open access
grep -E "allow read, write: if true|allow read, write;" firestore.rules

# Check for service account files
find . -name "*service*account*.json" -o -name "*credentials*.json"
```

### Phase 6: Deployment Status Check

If deployment logs available, analyze recent deployments:

- [ ] Recent deployment failures
- [ ] Rollback frequency
- [ ] Average deployment time
- [ ] Failed health checks

### Phase 7: Generate DevOps Audit Report

Create the audit report file:

```markdown
# DevOps Audit Report

**PRD:** [Current PRD if applicable]
**Date:** [TODAY'S DATE]
**Result:** ✅ PASS / ❌ FAIL

## Summary
- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

## Infrastructure Inventory
| Type | File | Status |
|------|------|--------|
| Dockerfile | ./Dockerfile | ⚠️ Issues found |
| CI/CD | .github/workflows/deploy.yml | ✅ OK |
| Firebase | firebase.json | 🔴 Critical |

## Issues Found

### 🔴 Blockers

#### [DEVOPS-001] Running as Root in Dockerfile
**Location:** `Dockerfile:1`
**Issue:** Container runs as root user, security risk
**Fix:** Add `USER node` after installing dependencies

### 🟠 Warnings

#### [DEVOPS-002] Unpinned Base Image
**Location:** `Dockerfile:1`
**Issue:** Using `node:latest` tag
**Fix:** Pin to specific version: `node:20.10.0-alpine`

### 🟡 Advisories

#### [DEVOPS-003] Missing Docker Layer Caching
**Location:** `Dockerfile`
**Issue:** COPY . . before npm install breaks caching
**Fix:** Copy package*.json first, then npm install, then COPY . .

## Recommendations

1. **Immediate**: Fix root user issue in Dockerfile
2. **High Priority**: Pin all base images to specific versions
3. **Medium Priority**: Optimize Docker layer caching
4. **Low Priority**: Add Docker healthcheck

## Next Steps
- [ ] Fix blockers before next deployment
- [ ] Create PRD for infrastructure improvements
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_DevOps_Audit_[DATE].md`?"
2. "Should I create a PRD for the fixes?"

---

## Severity Levels

| Severity | Icon | Description | Action |
|----------|------|-------------|--------|
| Blocker | 🔴 | Security risk, deployment failure, data loss | Fix before deploying |
| Warning | 🟠 | Best practice violation, potential issues | Fix this sprint |
| Advisory | 🟡 | Optimization, minor improvements | Plan to address |

---

## Constraints

**MUST**:
- Check for security vulnerabilities in infrastructure
- Provide specific file locations and line numbers
- Give actionable fix recommendations
- Prioritize issues by severity

**MUST NOT**:
- Ignore hardcoded secrets
- Skip security context analysis
- Miss CI/CD permission issues
- Overlook root user configurations

**SHOULD**:
- Check for deployment history issues
- Verify health check configurations
- Review rollback strategies
- Analyze resource limits
