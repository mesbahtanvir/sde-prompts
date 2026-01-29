# Contributing Guide

Thank you for your interest in contributing to PRD Driven Development! This guide will help you create high-quality prompts that support the PDD methodology.

---

## What Makes a Good PDD Prompt?

A great prompt should:

1. **Support the PDD Cycle** - Help with PRD creation, implementation, or auditing
2. **Be Actionable** - Provide specific, executable guidance
3. **Include Examples** - Show bad vs good patterns
4. **Be Framework-Agnostic** - Work with any codebase (unless specifically targeted)
5. **Generate PRDs for Gaps** - When auditing, output PRDs for issues found

---

## Prompt Categories

### Core (prompts/core/)
- PDD methodology and setup
- Audit prompts that verify PRDs against code
- Each audit outputs a new PRD for gaps found

### Implementation (prompts/implement/)
- Help implement features from PRDs
- Focus on code quality, testing, security, performance

### Reference (prompts/reference/)
- Deep-dive guides on specific topics
- API design, infrastructure, production readiness

---

## Prompt Template

```markdown
# [Topic] Guide
## [One-line description]

You are a [role]. Your mission is to [primary goal].

---

## Agentic Workflow

### Phase 1: [First Step]

- Action 1
- Action 2
- **STOP**: Present findings, ask "[clarifying question]"

### Phase 2: [Second Step]

- Action 1
- Action 2
- **STOP**: Present findings, ask "[clarifying question]"

[Continue pattern...]

---

## Constraints

**MUST**:
- Required behavior 1
- Required behavior 2

**MUST NOT**:
- Forbidden behavior 1
- Forbidden behavior 2

**SHOULD**:
- Recommended behavior 1
- Recommended behavior 2

---

## [Topic] Reference

[Main content with examples, patterns, checklists]

### Example: Bad vs Good

```javascript
// Bad: [why it's bad]
[bad code]

// Good: [why it's good]
[good code]
```

---

## Checklist

- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

---

## Begin

When activated:

1. First action
2. Second action
3. Third action

Start with: "[Opening message]"

Remember: **[Key takeaway]**
```

---

## Style Guide

### Structure
- Use `#` for title only
- Use `##` for major sections
- Use `###` for subsections
- Keep prompts focused (300-1000 lines ideal)

### Code Examples
Always show bad vs good:

```markdown
// Bad: [specific reason]
[problematic code]

// Good: [specific reason]
[improved code]
```

### Checklists
Use checkboxes for actionable items:
```markdown
- [ ] Do this
- [ ] Do that
```

### Agentic Workflow
Include STOP points for user interaction:
```markdown
- **STOP**: Present findings, ask "Should I proceed?"
```

---

## Submission Process

### 1. Create Your Prompt

Place in the appropriate folder:
- `prompts/core/` - PDD workflow prompts
- `prompts/implement/` - Implementation support
- `prompts/reference/` - Deep-dive guides

### 2. Test It

Paste into an AI assistant with sample code:
- [ ] AI understands the prompt
- [ ] AI provides actionable output
- [ ] Examples are clear
- [ ] For audits: outputs a PRD for gaps

### 3. Submit Pull Request

1. Fork the repository
2. Create/update a PRD in `docs/prd/` for your change
3. Create branch: `git checkout -b feat/prd-XXX-short-name`
4. Implement your changes
5. Commit: `git commit -m "feat(PRD-XXX): Description"`
6. Open Pull Request with PRD reference in title

---

## PR Acceptance Criteria

**Every PR must meet these criteria to be merged.** PRs that don't comply will be rejected.

### Before Submitting

- [ ] **PRD exists** — Create or update a PRD in `docs/prd/` for your change
- [ ] **One PRD per PR** — Each PR changes exactly one PRD file
- [ ] **Branch naming** — Use `feat/prd-XXX-*` or `fix/prd-XXX-*` format
- [ ] **PRD quality** — PRD has required sections (Problem, Solution, Acceptance Criteria)

### PR Requirements

- [ ] **Title format** — PR title contains `PRD-XXX` reference (e.g., `feat(PRD-007): Add PR template`)
- [ ] **CI passes** — All automated checks (lint, PRD validation) must pass
- [ ] **Description** — PR description explains what's being implemented

### Exceptions

For infrastructure changes (CI, dependencies, docs-only), add `[skip-prd]` to the PR title:
```
chore: Update dependencies [skip-prd]
```

### Why These Rules?

This repository follows **PRD Driven Development** — we practice what we preach:
- **No PRD, No Code** — Every feature starts with documentation
- **One PRD, One PR** — Keeps PRs focused and reviewable
- **Automated enforcement** — CI validates branch naming, title, and PRD changes

---

## Prompt Ideas We'd Love

### Core PDD Extensions
- [ ] PRD prioritization prompt
- [ ] Technical debt audit
- [ ] Architecture decision records

### Implementation Support
- [ ] Database migration guide
- [ ] API versioning guide
- [ ] Error handling patterns
- [ ] Logging and observability

### Reference Guides
- [ ] GraphQL best practices
- [ ] WebSocket patterns
- [ ] Serverless architecture
- [ ] Container security

---

## Questions?

Open a GitHub Issue. We're happy to help!

---

Thank you for contributing to PRD Driven Development!
