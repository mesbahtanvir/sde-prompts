# PRD-013: Quality Audit Suite

**Status:** In Progress
**Created:** 2026-01-30

---

## Problem Statement

Developers need comprehensive auditing beyond security and operations. Three critical areas are often neglected:

1. **Documentation** — READMEs become stale, API docs are incomplete, inline comments mislead
2. **Architecture** — Circular dependencies creep in, layers get violated, coupling increases
3. **Performance** — N+1 queries, memory leaks, large bundles, slow endpoints go unnoticed

Solo developers and small teams lack structured ways to audit these quality dimensions systematically.

## Solution

Introduce three new audit commands that analyze documentation completeness, architectural health, and performance issues.

### Commands

| Command | Purpose |
| ------- | ------- |
| `/pdd-audit-docs` | Audit documentation completeness and accuracy |
| `/pdd-audit-architecture` | Audit structural health, dependencies, and coupling |
| `/pdd-audit-performance` | Audit performance issues and optimization opportunities |

### `/pdd-audit-docs` Scope

- README completeness (installation, usage, API, examples)
- API documentation coverage
- Inline comments quality (not quantity)
- JSDoc/docstrings presence for public functions
- Stale documentation detection
- Missing changelog/contributing guides

### `/pdd-audit-architecture` Scope

- Circular dependency detection
- Layer violation detection (e.g., UI importing DB directly)
- Coupling analysis (fan-in, fan-out)
- Cohesion analysis
- Dead code detection
- Import/export structure analysis
- Module boundary violations

### `/pdd-audit-performance` Scope

- N+1 query patterns
- Missing database indexes (based on query patterns)
- Large bundle/file sizes
- Memory leak patterns
- Unoptimized loops
- Missing pagination
- Synchronous operations that should be async
- Missing caching opportunities
- Slow regex patterns

### Output Format

Each audit generates a report file:
- **Filename:** `PRD-XXX_[Type]_Audit_YYYY-MM-DD.md`
- **Location:** `docs/audits/`
- **Severity levels:** 🔴 Blocker, 🟠 Warning, 🟡 Advisory

## Acceptance Criteria

- [ ] AC1: User can run `/pdd-audit-docs` and receive a report on documentation completeness
- [ ] AC2: User can run `/pdd-audit-architecture` and receive a report on structural issues
- [ ] AC3: User can run `/pdd-audit-performance` and receive a report on performance problems
- [ ] AC4: Each audit generates a file in `docs/audits/` with proper naming
- [ ] AC5: Reports include severity levels (🔴 Blocker, 🟠 Warning, 🟡 Advisory)
- [ ] AC6: Reports provide actionable fix recommendations
- [ ] AC7: Analysis is language agnostic where possible
- [ ] AC8: Commands are registered in pdd-help
- [ ] AC9: Command files exist in `cli/commands/`

## Out of Scope

- Auto-fixing issues (detection only)
- Runtime profiling (static analysis only)
- Integration with external tools (SonarQube, etc.)
- Language-specific linting rules

## Technical Notes

- Use grep/find patterns that work across languages
- Performance audit focuses on patterns, not actual measurements
- Architecture audit infers structure from imports/requires
- Documentation audit checks structure, not prose quality

---

## Changelog

| Date | Change |
| ---- | ------ |
| 2026-01-30 | PRD created |
