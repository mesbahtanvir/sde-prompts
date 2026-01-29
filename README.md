# PRD Driven Development (PDD)

**No PRD, No Code.**

A methodology for AI-assisted software development where every feature starts with a documented requirement. Like TDD ensures tests exist before code, PDD ensures PRDs exist before implementation.

## The PDD Cycle

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   1. WRITE PRD     →     2. IMPLEMENT     →     3. AUDIT           │
│   (Requirements)          (Code)                (Verify)            │
│         ▲                                          │                │
│         │                                          │                │
│         └──────────────────────────────────────────┘                │
│                     (Gap found → New PRD)                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Step 1: Write PRD** — Document what you're building before writing code
**Step 2: Implement** — Write code that satisfies the PRD
**Step 3: Audit** — Verify code matches PRD; gaps become new PRDs

## Why PDD?

| Problem | PDD Solution |
|---------|--------------|
| Features drift from requirements | PRD is the contract |
| "What does this code do?" | PRD explains intent |
| Missing acceptance criteria | PRD defines done |
| Undocumented decisions | PRD captures context |
| AI generates wrong thing | PRD guides AI precisely |

**[Read the full explanation →](docs/WHY-PDD.md)** — Learn why PDD works for AI coding agents, who it's for, and its limitations.

## Installation

Install PDD commands globally for Claude Code:

```bash
npm install -g prd-driven-dev
pdd-dev install
```

This installs slash commands to `~/.claude/commands/`, making them available in all your projects.

### Available Commands

| Command | Description |
|---------|-------------|
| `/pdd-help` | Show all commands and usage |
| `/pdd-prd-create [type]` | Create a new PRD (feature/bugfix/refactor) |
| `/pdd-prd-list` | List all PRDs with status |
| `/pdd-init` | Initialize PDD in current project |
| `/pdd-upgrade` | Check for and install updates |
| `/pdd-find-unimplemented [prd]` | Find PRD features not implemented |
| `/pdd-find-untested [prd]` | Find code without tests |
| `/pdd-find-drift` | Find code that doesn't match PRD |
| `/pdd-find-ux-issues` | Find UX problems |
| `/pdd-find-bugs` | Find bugs and quality issues |

### Updating

```bash
npm update -g prd-driven-dev
# or use the slash command:
/pdd-upgrade
```

## Prompts

This repository contains prompts to facilitate PDD workflows with AI assistants.

### Core: The PDD Workflow

Start here. These prompts implement the PDD cycle.

| # | Prompt | Purpose |
|---|--------|---------|
| 0 | [PRD Creation](prompts/core/00-prd-creation.md) | Create PRDs through guided interview |
| 1 | [Methodology](prompts/core/01-pdd-methodology.md) | Set up PDD in your project |
| 2 | [Audit Features](prompts/core/02-audit-features.md) | Are all PRD features implemented? |
| 3 | [Audit Tests](prompts/core/03-audit-tests.md) | Do all features have tests? |
| 4 | [Audit Alignment](prompts/core/04-audit-alignment.md) | Does code match documentation? |
| 5 | [Audit UX](prompts/core/05-audit-ux.md) | Is the user experience good? |
| 6 | [Audit QA](prompts/core/06-audit-qa.md) | Are there bugs or quality issues? |

### Implementation Support

Use these when implementing features from your PRDs.

| Prompt | Purpose |
|--------|---------|
| [Project Setup](prompts/implement/project-setup.md) | Bootstrap new projects |
| [Clean Code](prompts/implement/clean-code.md) | Refactor and improve code quality |
| [Testing](prompts/implement/testing.md) | Add comprehensive tests |
| [Security & Performance](prompts/implement/security-performance.md) | Audit security and optimize performance |

### Reference

Deep-dive guides for specific topics.

| Prompt | Purpose |
|--------|---------|
| [API Design](prompts/reference/api-design.md) | Design intuitive, consistent APIs |
| [Cloud Infrastructure](prompts/reference/cloud-infrastructure.md) | Deploy and manage production systems |
| [Production Checklist](prompts/reference/production-checklist.md) | Pre-launch verification |

## Quick Start

### 1. Set Up PDD in Your Project

```bash
# Use the methodology prompt to set up:
# - docs/prd/ directory
# - PR templates
# - CLAUDE.md
```

### 2. Create a PRD Before Coding

```markdown
# PRD-001: User Authentication

**Status:** Draft

## Problem
Users need to log in to access their data.

## Solution
Implement email/password authentication with Firebase.

## Acceptance Criteria
- [ ] User can sign up with email
- [ ] User can sign in with email
- [ ] User can sign out
- [ ] Session persists on refresh
```

### 3. Implement Per PRD

Code only what the PRD specifies. Link PRD in your PR.

### 4. Audit for Gaps

Run audit prompts to find:
- Unimplemented features → new PRD
- Missing tests → new PRD
- UX issues → new PRD
- Bugs → new PRD

### 5. Repeat

Each audit generates PRDs for gaps. The cycle continues until code fully matches documentation.

## Repository Structure

```
prd-driven-dev/
├── README.md
├── CONTRIBUTING.md
├── CLAUDE.md               # AI assistant context
├── cli/                    # npm package (pdd)
│   ├── package.json
│   ├── bin/pdd.js          # CLI entry point
│   ├── lib/commands.js     # Install/update logic
│   └── commands/           # Slash command templates
├── docs/
│   └── prd/                # PRDs for THIS repo (we dogfood PDD)
│       ├── PRD-000-foundation.md
│       └── ...
└── prompts/
    ├── core/               # The PDD workflow (7 prompts)
    │   ├── 00-prd-creation.md
    │   ├── 01-pdd-methodology.md
    │   ├── 02-audit-features.md
    │   ├── 03-audit-tests.md
    │   ├── 04-audit-alignment.md
    │   ├── 05-audit-ux.md
    │   └── 06-audit-qa.md
    ├── implement/          # Implementation support (4 prompts)
    │   ├── project-setup.md
    │   ├── clean-code.md
    │   ├── testing.md
    │   └── security-performance.md
    └── reference/          # Deep-dive guides (3 prompts)
        ├── api-design.md
        ├── cloud-infrastructure.md
        └── production-checklist.md
```

## How to Use These Prompts

### With Claude Code

```bash
# Paste prompt content, then:
"Set up PDD in this project"
"Audit this codebase for missing features"
"Help me write a PRD for user authentication"
```

### With Other AI Assistants

Copy the prompt content into your AI chat. The prompts are designed to work with any capable AI assistant.

### As Claude Code Skills

Create custom skills in your project:

```markdown
# .claude/commands/prd.md
[Paste 01-pdd-methodology.md content]

# Usage: /prd
```

## The PDD Decision Tree

```
New work requested
        │
        ▼
   Is there a PRD?
        │
   ┌────┴────┐
   No        Yes
   │          │
   ▼          ▼
Write PRD   Implement
first       per PRD
   │          │
   ▼          │
Get PRD     ◄─┘
approved
   │
   ▼
Implement
   │
   ▼
Audit: Does code match PRD?
        │
   ┌────┴────┐
   No        Yes
   │          │
   ▼          ▼
Create      Mark PRD
gap PRD     as Done
```

## What Needs a PRD?

### Needs PRD
- New features
- Bug fixes affecting users
- UI/UX changes
- API changes
- Database schema changes

### Skip PRD
- Typo fixes
- Dependency updates
- Documentation only
- Internal refactoring
- CI/CD changes

## PRD Template

```markdown
# PRD-[NUMBER]: [Title]

**Status:** Draft | Approved | Done
**Author:** @username
**Date:** YYYY-MM-DD

## Problem
[What problem are we solving?]

## Solution
[How will we solve it?]

## Acceptance Criteria
- [ ] [Specific, testable requirement]
- [ ] [Specific, testable requirement]
- [ ] [Specific, testable requirement]

## Out of Scope
- [What we're NOT doing]
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding or improving prompts.

## This Repository Uses PDD

We practice what we preach. This repository is developed using PRD Driven Development:

- **[docs/prd/](docs/prd/)** — All PRDs for this project
- **[PRD-000: Foundation](docs/prd/PRD-000-foundation.md)** — The bootstrap PRD defining this project

Every new prompt or significant change starts with a PRD. Check our PRDs to see real-world examples of the methodology in action.

<!-- PROMPT_STATS_START -->

## Prompt Statistics

Auto-generated summary of all prompts in this repository.

| Prompt | Lines | Words | Tokens (est.) | Size |
|--------|------:|------:|--------------:|-----:|
| **Total** | **0** | **0** | **0** | **0 B** |

*Token count is estimated based on ~4 characters per token.*

<!-- PROMPT_STATS_END -->

## Credits

These prompts incorporate principles from:

- **Robert C. Martin** - "Clean Code"
- **Kent Beck** - "Test Driven Development"
- **OWASP Foundation** - Security best practices
- **Nielsen Norman Group** - Usability heuristics
- **Industry standards** - RESTful API design, performance optimization

## License

MIT

---

**Remember: No PRD, No Code.**
