# Security Audit

**Usage:** `/pdd-audit-security`

Analyze code for security vulnerabilities including dependency CVEs, injection attacks, secrets exposure, token leakage, DDoS vulnerabilities, and data leakage risks. Outputs an audit report with issues and recommendations.

---

## Workflow

### Phase 1: Dependency Vulnerability Scan

Check for known vulnerabilities in dependencies:

```bash
# Node.js projects
npm audit --json 2>/dev/null || yarn audit --json 2>/dev/null

# Python projects
pip-audit 2>/dev/null || safety check 2>/dev/null

# Check for outdated packages
npm outdated 2>/dev/null || pip list --outdated 2>/dev/null
```

**Check for:**
- [ ] Critical CVEs in dependencies
- [ ] High severity vulnerabilities
- [ ] Outdated packages with known issues
- [ ] Unmaintained dependencies

**STOP**: Present dependency findings and ask "Any known false positives to exclude?"

### Phase 2: Secrets Detection

Scan for hardcoded secrets and credentials:

```bash
# API keys and tokens
grep -rE "(api[_-]?key|apikey|api_secret)['\"]?\s*[:=]\s*['\"][a-zA-Z0-9]+" --include="*.ts" --include="*.js" --include="*.py" --include="*.env*"

# Passwords
grep -rE "(password|passwd|pwd)['\"]?\s*[:=]\s*['\"][^'\"]{4,}" --include="*.ts" --include="*.js" --include="*.py" --include="*.json"

# AWS credentials
grep -rE "(AKIA[0-9A-Z]{16}|aws_secret_access_key)" .

# Private keys
grep -rE "-----BEGIN (RSA |DSA |EC |OPENSSH )?PRIVATE KEY-----" .

# JWT tokens
grep -rE "eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*" .

# Generic secrets
grep -rE "(secret|token|bearer)['\"]?\s*[:=]\s*['\"][a-zA-Z0-9+/=]{20,}" --include="*.ts" --include="*.js" --include="*.py"
```

**Check for:**
- [ ] Hardcoded API keys
- [ ] Database credentials in code
- [ ] Private keys committed
- [ ] JWT tokens in source
- [ ] Secrets in config files

### Phase 3: Token Path Analysis

Trace authentication token flow for leakage:

```bash
# Find token storage
grep -rE "(localStorage|sessionStorage)\.setItem.*token" --include="*.ts" --include="*.tsx" --include="*.js"

# Find token transmission
grep -rE "Authorization.*Bearer|x-auth-token|x-api-key" --include="*.ts" --include="*.js"

# Check for token in URLs
grep -rE "(token|key|auth)=[^&\s]+" --include="*.ts" --include="*.js"

# Check for token in logs
grep -rE "console\.(log|info|debug).*token" --include="*.ts" --include="*.js"
```

**Token Security Checklist:**
- [ ] Tokens stored securely (httpOnly cookies preferred)
- [ ] Tokens not in URL parameters
- [ ] Tokens not logged
- [ ] Token expiration implemented
- [ ] Refresh token rotation
- [ ] Token revocation mechanism

### Phase 4: Injection Vulnerability Scan

Check for SQL, NoSQL, Command, and XSS injection:

```bash
# SQL Injection risks
grep -rE "query\(.*\+.*\)|execute\(.*\+.*\)|raw\(.*\+.*\)" --include="*.ts" --include="*.js" --include="*.py"

# Command injection
grep -rE "exec\(|spawn\(|system\(|eval\(" --include="*.ts" --include="*.js" --include="*.py"

# XSS risks (dangerouslySetInnerHTML, v-html, innerHTML)
grep -rE "dangerouslySetInnerHTML|v-html|innerHTML\s*=" --include="*.tsx" --include="*.jsx" --include="*.vue"

# NoSQL injection
grep -rE "\$where|\$regex.*\+" --include="*.ts" --include="*.js"

# Template injection
grep -rE "render\(.*\+|template:.*\+" --include="*.ts" --include="*.js" --include="*.py"
```

**Injection Checklist:**
- [ ] Parameterized queries used
- [ ] Input sanitization on user data
- [ ] Output encoding for HTML
- [ ] No eval() with user input
- [ ] Command arguments escaped

### Phase 5: Authentication & Authorization Audit

Check auth implementation:

```bash
# Find auth middleware
grep -rE "authenticate|authorize|isAuthenticated|requireAuth" --include="*.ts" --include="*.js"

# Find unprotected routes
grep -rE "router\.(get|post|put|delete)\(" --include="*.ts" --include="*.js" -A5

# Check for hardcoded roles
grep -rE "role\s*===?\s*['\"]admin['\"]|isAdmin\s*=" --include="*.ts" --include="*.js"

# Check password handling
grep -rE "bcrypt|argon2|scrypt|pbkdf2" --include="*.ts" --include="*.js" --include="*.py"
```

**Auth Checklist:**
- [ ] All sensitive routes protected
- [ ] Password hashing implemented
- [ ] Rate limiting on auth endpoints
- [ ] Session invalidation on logout
- [ ] Role-based access control

### Phase 6: DDoS Vulnerability Assessment

Check for DDoS attack vectors:

```bash
# Rate limiting
grep -rE "rateLimit|throttle|express-rate-limit|bottleneck" --include="*.ts" --include="*.js" --include="package.json"

# Request size limits
grep -rE "limit.*['\"][0-9]+(kb|mb)|bodyParser.*limit|express\.json.*limit" --include="*.ts" --include="*.js"

# Timeout configuration
grep -rE "timeout|keepAlive" --include="*.ts" --include="*.js"

# Pagination
grep -rE "limit|offset|page|pageSize|skip|take" --include="*.ts" --include="*.js"
```

**DDoS Checklist:**
- [ ] Rate limiting on API endpoints
- [ ] Request body size limits
- [ ] Query complexity limits (GraphQL)
- [ ] Pagination enforced on list endpoints
- [ ] Connection timeouts configured
- [ ] Resource exhaustion prevention

### Phase 7: Data Leakage Analysis

Check for sensitive data exposure:

```bash
# PII in logs
grep -rE "console\.(log|info|error).*email|password|ssn|credit" --include="*.ts" --include="*.js"

# Verbose error messages
grep -rE "stack|stackTrace|err\.message" --include="*.ts" --include="*.js"

# Sensitive data in responses
grep -rE "password|secret|token|creditCard|ssn" --include="*.ts" --include="*.js" -B2 -A2 | grep -E "return|res\.(json|send)"

# CORS configuration
grep -rE "Access-Control-Allow-Origin.*\*|cors\(\)" --include="*.ts" --include="*.js"

# Missing HTTPS
grep -rE "http://" --include="*.ts" --include="*.js" --include="*.env*" | grep -v localhost
```

**Data Leakage Checklist:**
- [ ] No PII in logs
- [ ] Error messages sanitized
- [ ] Sensitive fields excluded from API responses
- [ ] CORS properly configured
- [ ] HTTPS enforced
- [ ] Secure headers set (HSTS, CSP, etc.)

### Phase 8: Generate Security Audit Report

Create the audit report file:

```markdown
# Security Audit Report

**PRD:** [Current PRD if applicable]
**Date:** [TODAY'S DATE]
**Result:** ✅ PASS / ❌ FAIL

## Summary
- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

## Vulnerability Overview

| Category | Status | Issues |
|----------|--------|--------|
| Dependencies | 🔴 Critical | 3 CVEs found |
| Secrets | 🟠 Warning | 1 potential leak |
| Injection | ✅ OK | No issues |
| Auth | 🟠 Warning | Missing rate limit |
| DDoS | 🔴 Critical | No rate limiting |
| Data Leakage | 🟡 Advisory | PII in logs |

## Issues Found

### 🔴 Blockers

#### [SEC-001] Critical CVE in lodash
**Location:** `package.json`
**CVE:** CVE-2021-23337
**Severity:** 9.8 (Critical)
**Issue:** Prototype pollution vulnerability
**Fix:** Upgrade to lodash@4.17.21 or higher

#### [SEC-002] No Rate Limiting
**Location:** `src/routes/api.ts`
**Issue:** API endpoints have no rate limiting, vulnerable to DDoS
**Fix:**
```typescript
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### 🟠 Warnings

#### [SEC-003] Token Stored in localStorage
**Location:** `src/lib/auth.ts:45`
**Issue:** JWT stored in localStorage, vulnerable to XSS
**Fix:** Use httpOnly cookies for token storage

#### [SEC-004] Missing Password Hashing
**Location:** `src/services/user.ts:23`
**Issue:** Password stored without proper hashing
**Fix:** Use bcrypt with cost factor >= 12

### 🟡 Advisories

#### [SEC-005] Verbose Error Messages
**Location:** `src/middleware/error.ts:12`
**Issue:** Stack traces exposed in error responses
**Fix:** Return generic error in production

## Token Flow Analysis

```
1. Login → Token generated (✅ OK)
2. Token storage → localStorage (⚠️ XSS risk)
3. Token transmission → Authorization header (✅ OK)
4. Token in URL → Found in 2 places (🔴 Risk)
5. Token expiration → Not implemented (🔴 Risk)
```

## Recommendations

### Immediate (Before Next Deploy)
1. Fix critical CVEs in dependencies
2. Implement rate limiting
3. Remove tokens from URLs

### High Priority (This Sprint)
1. Move token to httpOnly cookies
2. Add token expiration
3. Implement password hashing

### Medium Priority (Next Sprint)
1. Add security headers (HSTS, CSP)
2. Sanitize error messages
3. Remove PII from logs

## Next Steps
- [ ] Fix all blockers before deployment
- [ ] Schedule security review after fixes
- [ ] Create PRD for security improvements
```

**STOP**: Present report and ask:
1. "Save report to `docs/audits/PRD-XXX_Security_Audit_[DATE].md`?"
2. "Should I create a PRD for security fixes?"

---

## Severity Levels

| Severity | Icon | Description | Action |
|----------|------|-------------|--------|
| Blocker | 🔴 | Active vulnerability, data breach risk | Fix immediately |
| Warning | 🟠 | Security weakness, best practice violation | Fix this sprint |
| Advisory | 🟡 | Improvement opportunity, defense in depth | Plan to address |

---

## Constraints

**MUST**:
- Check for all OWASP Top 10 vulnerabilities
- Trace token flow for leakage
- Scan for hardcoded secrets
- Analyze DDoS attack surface
- Provide CVE references where applicable

**MUST NOT**:
- Ignore critical CVEs
- Skip authentication analysis
- Miss hardcoded credentials
- Overlook injection vulnerabilities

**SHOULD**:
- Check for secure headers
- Verify HTTPS enforcement
- Review CORS configuration
- Analyze error handling
- Check for security logging
