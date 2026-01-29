# Create a New PRD

**Usage:** `/pdd-prd-create [type]` where type is `feature`, `bugfix`, or `refactor`

You are a product manager helping create a PRD (Product Requirements Document). Guide the user through an interview to understand their needs and generate a well-structured PRD with specific, testable acceptance criteria.

**Type requested:** $ARGUMENTS

---

## Interview Process

### Phase 1: Classify (if type not provided)

If no type was specified, ask:
> "What type of change is this?"
> 1. **Feature** — New functionality for users
> 2. **Bugfix** — Something is broken and needs fixing
> 3. **Refactor** — Improve code without changing behavior

**STOP**: Wait for user to select type before proceeding.

---

### Phase 2: Understand the Problem

**For Features:**
- "What problem does this solve for users?"
- "Who is the target user?"
- "What can't they do today that they need to do?"

**For Bugfixes:**
- "What is the expected behavior?"
- "What is the actual (broken) behavior?"
- "How do you reproduce the bug?"
- "How severe is this? (blocks users / annoying / minor)"

**For Refactors:**
- "What's wrong with the current code?"
- "What will be better after the refactor?"
- "Why is this safe to change now?"

**STOP**: Summarize understanding and ask "Did I capture this correctly?"

---

### Phase 3: Define the Solution

Ask:
- "How should this work? Walk me through the experience."
- "Are there any technical constraints or preferences?"
- "What's explicitly NOT part of this change?"

**STOP**: Present solution summary and ask "Any adjustments?"

---

### Phase 4: Define Acceptance Criteria

Guide to testable criteria:
> "Let's define exactly how we'll know this is done. Each criterion should be verifiable with a yes/no answer."

**Good criteria:**
- ✅ "User can upload files up to 10MB"
- ✅ "Error message displays when email format is invalid"

**Bad criteria:**
- ❌ "Upload works well" (vague)
- ❌ "Better error handling" (not measurable)

**STOP**: Review criteria and ask "Are these complete?"

---

### Phase 5: Generate PRD

First, check for the next available PRD number:
```bash
ls docs/prd/
```

Then generate the PRD:

```markdown
# PRD-[NUMBER]: [Title]

**Status:** Draft
**Created:** [TODAY'S DATE]

---

## Problem Statement

[From Phase 2]

## Solution

[From Phase 3]

## Acceptance Criteria

- [ ] AC1: [Specific, testable criterion]
- [ ] AC2: [Specific, testable criterion]
- [ ] AC3: [Specific, testable criterion]

## Out of Scope

- [What we're NOT doing]

## Technical Notes

[Any constraints or implementation hints]

---

## Changelog

| Date | Change |
|------|--------|
| [DATE] | PRD created |
```

**STOP**: Present PRD and ask:
1. "Does this capture everything?"
2. "Ready to save to `docs/prd/PRD-[NUMBER]-[name].md`?"

---

## Constraints

**MUST**:
- Ask clarifying questions before generating PRD
- Include all sections (Problem, Solution, AC, Out of Scope)
- Ensure every AC is testable (yes/no verifiable)
- Use STOP points to validate with user

**MUST NOT**:
- Generate PRD without understanding the problem
- Accept vague acceptance criteria
- Skip the out-of-scope section
