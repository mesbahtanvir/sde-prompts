# PDD Commands Help

Display all available PRD Driven Development commands and their usage.

## Available Commands

### PRD Management
| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-prd-create` | `/pdd-prd-create [type]` | Create a new PRD (feature/bugfix/refactor) |
| `/pdd-prd-list` | `/pdd-prd-list` | List all PRDs and their status |

### Find Gaps (each outputs a PRD)
| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-find-unimplemented` | `/pdd-find-unimplemented [prd]` | Find PRD features not implemented |
| `/pdd-find-untested` | `/pdd-find-untested [prd]` | Find code without tests |
| `/pdd-find-drift` | `/pdd-find-drift` | Find code that doesn't match PRD |
| `/pdd-find-ux-issues` | `/pdd-find-ux-issues` | Find UX problems |
| `/pdd-find-bugs` | `/pdd-find-bugs` | Find bugs and quality issues |

### Operations Audits (each outputs a report)
| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-audit-devops` | `/pdd-audit-devops` | Audit deployment, CI/CD, and infrastructure |
| `/pdd-audit-security` | `/pdd-audit-security` | Audit security vulnerabilities and risks |
| `/pdd-audit-production` | `/pdd-audit-production` | Full production readiness check |
| `/pdd-audit-all` | `/pdd-audit-all` | Run all three audits in sequence |

### Tooling
| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-help` | `/pdd-help` | Show this help message |
| `/pdd-init` | `/pdd-init` | Initialize PDD in current project |
| `/pdd-upgrade` | `/pdd-upgrade` | Check for and install updates |

## Quick Start

1. **Initialize PDD in your project:**
   ```
   /pdd-init
   ```

2. **Create your first PRD:**
   ```
   /pdd-prd-create feature
   ```

3. **List PRD status:**
   ```
   /pdd-prd-list
   ```

4. **Find gaps (outputs a PRD for each):**
   ```
   /pdd-find-unimplemented 001
   /pdd-find-bugs
   ```

## The PDD Cycle

```
Write PRD → Implement → Find Gaps → (gaps become new PRDs)
```

**Core Principle:** No PRD, No Code.

## Learn More

- GitHub: https://github.com/mesbahtanvir/prd-driven-dev
- Update commands: `/pdd-upgrade` or `npm update -g prd-driven-dev`
