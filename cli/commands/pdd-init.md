# Initialize PDD in Current Project

**Usage:** `/pdd-init`

Set up PRD Driven Development in the current project by creating the necessary directories and files. For existing projects, automatically generates a PRD-000 foundation document based on existing documentation and code.

---

## What This Does

1. Creates `docs/prd/` directory for storing PRDs
2. Creates a `CLAUDE.md` file with PDD workflow instructions
3. **Scans existing project** for README, config files, and documentation
4. **Auto-generates PRD-000** capturing current project state (if documentation exists)

---

## Steps

### Step 1: Check Current State

First, check if PDD is already initialized:

```bash
ls -la docs/prd/ 2>/dev/null || echo "No docs/prd/ directory"
ls CLAUDE.md 2>/dev/null || echo "No CLAUDE.md file"
```

**If `docs/prd/` already exists with PRD files:** Report that PDD is already initialized and skip PRD generation. Do NOT overwrite existing PRDs.

### Step 2: Create Directory Structure

If `docs/prd/` doesn't exist, create it:

```bash
mkdir -p docs/prd
```

### Step 3: Create CLAUDE.md

If `CLAUDE.md` doesn't exist, create it with this content:

```markdown
# CLAUDE.md - Project Instructions

This project follows PRD Driven Development (PDD).

## Core Principle

> **No PRD, No Code**

Every meaningful change must start with a PRD in `docs/prd/`.

## Workflow

1. **Check existing PRDs** in `docs/prd/`
2. **Create a PRD** if one doesn't exist: `/pdd-prd-create`
3. **Reference the PRD** in commits and PRs

## Git Workflow

> **Never push directly to main**

1. Create feature branch: `feat/prd-XXX-short-name`
2. Make commits referencing the PRD
3. Create PR to merge into main

## Commands

- `/pdd-prd-create` — Create a new PRD
- `/pdd-prd-list` — List PRDs with status
- `/pdd-find-unimplemented` — Find gaps in implementation
- `/pdd-find-bugs` — Find bugs and quality issues
```

### Step 4: Scan Existing Project

**This is the key step for mid-project adoption.** Analyze the project to gather information for PRD-000.

#### 4a: Check for README.md

```bash
ls README.md 2>/dev/null && echo "README found"
```

If README.md exists, read it and extract:
- **Project name**: First `#` heading
- **Description**: First paragraph after the heading
- **Features**: Any section titled "Features", "What it does", or bullet lists describing functionality

#### 4b: Detect Tech Stack (Language-Agnostic)

Check for common project config files to determine tech stack:

```bash
# Check for various config files
ls -la package.json pyproject.toml Cargo.toml go.mod pom.xml build.gradle Gemfile composer.json mix.exs Project.toml Makefile CMakeLists.txt setup.py requirements.txt 2>/dev/null
```

**Config file mapping:**
| File | Tech Stack |
|------|------------|
| `package.json` | Node.js / JavaScript / TypeScript |
| `pyproject.toml`, `setup.py`, `requirements.txt` | Python |
| `Cargo.toml` | Rust |
| `go.mod` | Go |
| `pom.xml`, `build.gradle` | Java |
| `Gemfile` | Ruby |
| `composer.json` | PHP |
| `mix.exs` | Elixir |
| `Project.toml` | Julia |
| `Makefile`, `CMakeLists.txt` | C/C++ |

Read the detected config file(s) to extract:
- Project name
- Version
- Description
- Key dependencies

#### 4c: Scan docs/ Folder

```bash
ls -la docs/ 2>/dev/null
```

If `docs/` exists, list the documentation files found for inclusion in PRD-000.

#### 4d: Analyze Code Structure

```bash
# List top-level directories (excluding common non-source dirs)
ls -d */ 2>/dev/null | grep -v -E "node_modules|venv|__pycache__|\.git|dist|build|target"
```

Note the main source directories (e.g., `src/`, `lib/`, `app/`).

### Step 5: Generate PRD-000 (If Documentation Found)

**If README.md OR any config file was found**, generate `docs/prd/PRD-000-foundation.md`:

```markdown
# PRD-000: [Project Name] Foundation

**Status:** Done
**Created:** [TODAY'S DATE]
**Auto-generated:** Yes — Review and edit as needed

---

## Problem Statement

[Extract from README description, or write based on what the project does]

## Current Features

[List features discovered from README, docs, or code structure]

- Feature 1: [description]
- Feature 2: [description]
- ...

## Tech Stack

[List detected technologies from config files]

- **Language:** [detected language]
- **Framework:** [if detected]
- **Key Dependencies:** [list major deps]

## Project Structure

```
[project-name]/
├── [main directories discovered]
├── docs/
│   └── prd/          # PRD documents
└── ...
```

## Documentation

[List any existing docs found in docs/ folder, or "No existing documentation found"]

---

## Changelog

| Date | Change |
|------|--------|
| [DATE] | Auto-generated during PDD initialization |
```

### Step 6: Fallback for Empty Projects

**If NO README.md AND NO config files found:**

Do NOT generate PRD-000. Instead, report:

> "No existing documentation found. PDD structure created."
> "Run `/pdd-prd-create feature` to create your first PRD manually."

### Step 7: Report Results

**STOP**: Present what was created and discovered:

**If PRD-000 was generated:**
> "PDD initialized with auto-generated PRD-000!"
> - Created: `docs/prd/` directory
> - Created: `CLAUDE.md`
> - Generated: `docs/prd/PRD-000-foundation.md` (from existing docs)
>
> "Please review PRD-000 and edit as needed. Run `/pdd-prd-create` for your next PRD."

**If fallback (no docs found):**
> "PDD initialized!"
> - Created: `docs/prd/` directory
> - Created: `CLAUDE.md`
>
> "No existing documentation found to generate PRD-000."
> "Run `/pdd-prd-create feature` to create your first PRD."

---

## Constraints

**MUST**:
- Check before overwriting existing files
- Ask before modifying existing CLAUDE.md
- Scan for documentation before generating PRD-000
- Mark auto-generated PRD-000 clearly for user review
- Support multiple tech stacks (language-agnostic)

**MUST NOT**:
- Overwrite existing PRDs (if `docs/prd/` has files, skip PRD generation)
- Overwrite CLAUDE.md without confirmation
- Generate PRD-000 if no documentation exists (use fallback)
- Make assumptions about project structure without scanning
