# PRD-011: Operations Audit Suite

**Status:** In Progress
**Created:** 2026-01-29

---

## Problem Statement

Solo developers and small teams managing the entire production lifecycle lack a unified way to verify their code is production-ready. They face:

- **Deployment issues slipping through** — Misconfigured Dockerfiles, CI/CD pipelines, infrastructure code, and Firebase workflows go unnoticed until production breaks
- **Security vulnerabilities going undetected** — CVEs, hardcoded secrets, token leakage, DDoS vulnerabilities, and data exposure risks are missed without dedicated security review
- **No single "go/no-go" check** — No comprehensive way to verify feature completion, test coverage, deployment readiness, and security posture before shipping

Target users are one-person teams or small teams where one person owns the full production lifecycle — from code to deployment to monitoring.

## Solution

Introduce four new PDD commands that analyze code and infrastructure to find issues:

### Commands

| Command | Purpose |
|---------|---------|
| `/pdd-audit-devops` | Analyze deployment code, configs, and infrastructure |
| `/pdd-audit-security` | Analyze security vulnerabilities and risks |
| `/pdd-audit-production` | Comprehensive production readiness check |
| `/pdd-audit-all` | Run all three audits in sequence |

### `/pdd-audit-devops` Scope

- Dockerfile best practices and issues
- CI/CD configurations (GitHub Actions, etc.)
- Kubernetes manifests
- Terraform / Infrastructure as Code
- Firebase workflows setup
- Deployment statuses and logs

### `/pdd-audit-security` Scope

- Dependency vulnerabilities (CVEs)
- Code patterns (SQL injection, XSS, command injection)
- Hardcoded secrets and credentials
- Token path analysis and leakage detection
- Authentication/authorization issues
- DDoS vulnerability assessment (rate limiting, throttling, resource exhaustion)
- Data leakage risks (PII exposure, sensitive data in logs, insecure transmission)

### `/pdd-audit-production` Scope

- Feature completion vs PRD acceptance criteria
- Test coverage analysis
- DevOps audit checks (runs `/pdd-audit-devops` scope)
- Security audit checks (runs `/pdd-audit-security` scope)
- Backend staging logs analysis
- Frontend staging logs analysis

### Output Format

Each audit generates a report file:
- **Filename:** `PRD-XXX_Audit_report_YYYY-MM-DD.md`
- **Location:** `docs/audits/`

Report structure:
```
# Audit Report: [Type]
**PRD:** PRD-XXX
**Date:** YYYY-MM-DD
**Result:** ✅ PASS / ❌ FAIL

## Summary
- 🔴 Blockers: X
- 🟠 Warnings: X
- 🟡 Advisories: X

## Issues Found

### 🔴 Blockers
[Issue with actionable recommendation]

### 🟠 Warnings
[Issue with actionable recommendation]

### 🟡 Advisories
[Issue with actionable recommendation]

## Recommendations
[Prioritized list of fixes]
```

## Acceptance Criteria

- [ ] AC1: User can run `/pdd-audit-devops` and receive a report analyzing Dockerfiles, CI/CD configs, K8s manifests, Terraform, and Firebase workflows
- [ ] AC2: User can run `/pdd-audit-security` and receive a report analyzing dependencies (CVEs), code patterns, secrets, token paths, DDoS vulnerabilities, and data leakage risks
- [ ] AC3: User can run `/pdd-audit-production` and receive a report checking feature completion vs PRD, test coverage, DevOps status, Security status, and staging logs
- [ ] AC4: User can run `/pdd-audit-all` to execute all three audits in sequence
- [ ] AC5: Each audit generates a file named `PRD-XXX_Audit_report_YYYY-MM-DD.md` in `docs/audits/`
- [ ] AC6: Report displays issues with severity levels: 🔴 Blocker, 🟠 Warning, 🟡 Advisory
- [ ] AC7: Report includes actionable fix recommendations for each issue found
- [ ] AC8: Report ends with a pass/fail summary
- [ ] AC9: Each command has a corresponding prompt file in `prompts/core/`
- [ ] AC10: Commands are registered as skills in the PDD system

## Out of Scope

- Auto-fixing issues (v1 is detection/reporting only)
- Integration with external tools (Snyk, SonarQube, Dependabot)
- Historical trend tracking and comparison
- CI/CD pipeline integration (automated runs on PR/merge)

## Technical Notes

- Commands should be implemented as prompt files in `prompts/core/`
- Follow existing PDD skill registration pattern (see `commands.json`)
- Report output directory `docs/audits/` should be created if it doesn't exist
- Consider caching/memoization for `/pdd-audit-all` to avoid duplicate checks

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-29 | PRD created |
