# PDD Commands Help

Display all available PRD Driven Development commands and their usage.

## Primary Commands

### PRD Management

| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-prd` | `/pdd-prd <subcommand>` | Manage PRDs (create, list) |

**Subcommands:**

- `/pdd-prd create [type]` - Create a new PRD (feature/bugfix/refactor)
- `/pdd-prd list` - List all PRDs and their status

### Audit Suite

| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-audit` | `/pdd-audit <subcommand>` | Run PRD-driven audits |

**Subcommands:**

- `/pdd-audit features [prd]` - Find unimplemented PRD features
- `/pdd-audit tests [prd]` - Find test gaps (logical reasoning from PRDs)
- `/pdd-audit drift` - Detect code drift from specifications
- `/pdd-audit ux` - Find UX issues vs PRD-defined experiences
- `/pdd-audit quality` - Find bugs and code quality issues
- `/pdd-audit ops [focus]` - Security, performance, devops audit
- `/pdd-audit all` - Run all audits in sequence

> **Note:** All audits start with Phase 0 (Build PRD Context) to understand your project's desired state from all PRDs.

### Quality Audits

| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-audit-docs` | `/pdd-audit-docs` | Audit documentation completeness |
| `/pdd-audit-architecture` | `/pdd-audit-architecture` | Audit structural health and dependencies |
| `/pdd-audit-e2e` | `/pdd-audit-e2e` | Audit E2E test coverage |

### Project Scaffolding

| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-bootstrap` | `/pdd-bootstrap [name]` | Bootstrap a full-stack app (Next.js + FastAPI + Firebase) |

### Tooling

| Command | Usage | Description |
|---------|-------|-------------|
| `/pdd-help` | `/pdd-help` | Show this help message |
| `/pdd-init` | `/pdd-init` | Initialize PDD in current project |
| `/pdd-upgrade` | `/pdd-upgrade` | Check for and install updates |

## Quick Start

1. **Initialize PDD in your project:**

   ```text
   /pdd-init
   ```

1. **Create your first PRD:**

   ```text
   /pdd-prd create feature
   ```

1. **List PRD status:**

   ```text
   /pdd-prd list
   ```

1. **Run audits:**

   ```text
   /pdd-audit features
   /pdd-audit quality
   /pdd-audit all
   ```

## The PDD Cycle

```text
Write PRD → Implement → Audit → (gaps become new PRDs)
```

**Core Principle:** No PRD, No Code.

## Deprecated Commands

The following commands are deprecated and will be removed in v3.0:

| Old Command | Use Instead |
|-------------|-------------|
| `/pdd-prd-create` | `/pdd-prd create` |
| `/pdd-prd-list` | `/pdd-prd list` |
| `/pdd-find-unimplemented` | `/pdd-audit features` |
| `/pdd-find-untested` | `/pdd-audit tests` |
| `/pdd-find-drift` | `/pdd-audit drift` |
| `/pdd-find-ux-issues` | `/pdd-audit ux` |
| `/pdd-find-bugs` | `/pdd-audit quality` |
| `/pdd-code-compact` | `/pdd-audit quality` |
| `/pdd-audit-security` | `/pdd-audit ops security` |
| `/pdd-audit-performance` | `/pdd-audit ops performance` |
| `/pdd-audit-devops` | `/pdd-audit ops devops` |
| `/pdd-audit-production` | `/pdd-audit ops production` |
| `/pdd-audit-all` | `/pdd-audit all` |

## Learn More

- GitHub: https://github.com/mesbahtanvir/prd-driven-dev
- Update commands: `/pdd-upgrade` or `npm update -g prd-driven-dev`
