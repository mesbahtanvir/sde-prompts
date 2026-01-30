# PRD-012: Clean Code Audit Command

**Status:** In Progress
**Created:** 2026-01-29

---

## Problem Statement

Developers often accumulate technical debt through code that works but violates clean code principles. Without systematic review against established best practices, codebases become harder to maintain, test, and extend. Solo developers and small teams lack a structured way to identify code quality issues based on industry-standard guidelines.

Target users are developers who want to improve code quality using proven principles from Robert C. Martin's "Clean Code" and related works (The Clean Coder, Clean Architecture, SOLID principles).

## Solution

Introduce a new PDD command that analyzes code against Clean Code principles and generates a PRD for refactoring improvements.

### Command

| Command | Purpose |
| ------- | ------- |
| `/pdd-code-compact` | Audit code quality against Clean Code principles |

### Scope (Language Agnostic)

The audit covers core Clean Code principles that apply to any programming language:

**Naming**
- Meaningful, intention-revealing names
- Avoid disinformation and encodings
- Pronounceable and searchable names
- Class names (nouns) vs method names (verbs)

**Functions**
- Small functions (do one thing)
- One level of abstraction per function
- Descriptive names
- Minimal arguments (0-2 ideal, 3 max)
- No side effects
- Command-query separation
- DRY (Don't Repeat Yourself)

**Comments**
- Code should be self-documenting
- Comments explain "why", not "what"
- Avoid redundant, misleading, or noise comments
- TODO comments tracked

**Formatting**
- Consistent formatting
- Vertical openness between concepts
- Related code close together
- Proper indentation

**Objects and Data Structures**
- Law of Demeter (don't talk to strangers)
- Data/Object anti-symmetry
- Avoid hybrid structures

**Error Handling**
- Exceptions over error codes
- Provide context with exceptions
- Don't return or pass null
- Fail fast

**Boundaries**
- Clean integration with third-party code
- Wrapper patterns for external dependencies

**Unit Tests (if tests exist)**
- One assert per test concept
- F.I.R.S.T. principles (Fast, Independent, Repeatable, Self-validating, Timely)
- Clean tests are as important as clean code

**Classes**
- Small classes with single responsibility
- High cohesion
- Organized for change (Open/Closed)

**SOLID Principles**
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

### Output Format

Report file: `PRD-XXX_CleanCode_Audit_YYYY-MM-DD.md`

Severity levels:
- 🔴 **Smell**: Code smell that hurts maintainability
- 🟠 **Concern**: Violates best practice, should refactor
- 🟡 **Suggestion**: Could be cleaner, nice to have

## Acceptance Criteria

- [ ] AC1: User can run `/pdd-code-compact` and receive a report analyzing code against Clean Code principles
- [ ] AC2: Report covers all major Clean Code categories (naming, functions, comments, formatting, error handling, classes)
- [ ] AC3: Report includes specific file locations and code snippets
- [ ] AC4: Report provides actionable refactoring recommendations
- [ ] AC5: Report generates a PRD for implementing the improvements
- [ ] AC6: Analysis is language agnostic (works with any codebase)
- [ ] AC7: Command is registered in pdd-help
- [ ] AC8: Command file exists in `cli/commands/`

## Out of Scope

- Auto-fixing code issues (detection only)
- Language-specific linting rules
- Performance optimization (covered by other audits)
- Security analysis (covered by `/pdd-audit-security`)

## Technical Notes

- Use grep/search patterns that work across languages
- Focus on structural patterns rather than syntax
- Reference specific Clean Code chapters for each finding
- Consider integration with existing `/pdd-find-bugs` for overlap

---

## Changelog

| Date | Change |
| ---- | ------ |
| 2026-01-29 | PRD created |
