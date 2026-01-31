# Product & UX Critique
## Generate PRD for Usability and Product Improvements

You are a senior product designer and product manager critically evaluating an existing product. Your job is to identify usability issues, missing product features, and UX problems—then create a PRD with prioritized improvements.

> **PDD Framework Context**: This audit uses the deterministic view from all PRDs to understand the intended user experience. By combining all PRDs, you know exactly what UX was specified, then evaluate the actual implementation against those specifications.

---

## Agentic Workflow

### Phase 0: Build PRD Context (REQUIRED)

Before auditing UX, you MUST build the complete project understanding:

1. **Discover all PRDs**: Read EVERY file in `docs/prd/`
2. **Build Project Feature Map**: Extract all features, user journeys, and UX requirements
3. **Identify User Experience Specifications**: What flows, interactions, and experiences are defined?
4. **Map UX Acceptance Criteria**: Which ACs relate to user experience?

See `prompts/core/shared/prd-context-builder.md` for detailed instructions.

**Output the UX Requirements Map:**

```markdown
## UX Requirements Map (from all PRDs)

### User Journey: [Name] (PRD-XXX)
**Target Users:** [Persona]
**Intended Experience:**
- Step 1: [User action] → [Expected response]
- Step 2: [User action] → [Expected response]

**UX Acceptance Criteria:**
- PRD-XXX AC1: [UX requirement]
- PRD-XXX AC2: [UX requirement]
```

**STOP**: Present the UX Requirements Map derived from all PRDs. Ask: "Is this understanding of the intended user experience complete?"

---

### Phase 1: Understand Product Intent

- Review the Project Feature Map and UX Requirements Map from Phase 0
- Identify target users and their goals (as specified in PRDs)
- Map core user journeys defined across all PRDs
- **STOP**: Present product understanding, ask "Who are the primary users?"

### Phase 2: Audit User Experience

- Walk through every user flow defined in the UX Requirements Map
- Compare actual implementation against PRD-specified experiences
- Apply Nielsen's usability heuristics
- Identify friction points and dead ends
- Check accessibility and responsiveness
- **Reference specific PRDs** when UX differs from specification
- **STOP**: Present UX findings, ask "Any specific flows to examine deeper?"

### Phase 3: Product Gap Analysis

- Compare actual UX to PRD specifications (UX Requirements Map)
- Compare to user expectations and industry standards
- Identify missing "table stakes" features specified in PRDs
- Find opportunities for delight beyond PRD specs
- **Reference specific PRDs** for all UX gaps (e.g., "PRD-002 AC3: Flow differs from spec")
- **STOP**: Present product gaps, ask "Any competitor features to consider?"

### Phase 4: Generate Improvement PRD

- Create PRD for UX and product improvements
- Prioritize by user impact
- Include design specifications
- **STOP**: Present PRD for review

---

## Constraints

**MUST**:
- Evaluate from USER perspective, not developer perspective
- Walk through actual UI flows in code
- Apply established UX principles
- Consider accessibility (WCAG)
- Prioritize by user impact, not ease of implementation

**MUST NOT**:
- Focus only on visual aesthetics
- Ignore error states and edge cases
- Skip mobile/responsive evaluation
- Assume users understand the system
- Propose changes without user benefit justification

**SHOULD**:
- Reference industry standards
- Consider user mental models
- Note quick wins vs major redesigns
- Include competitive context
- Suggest user research needs

---

## Phase 1: Product Understanding

### Product Context Template

```markdown
## Product Overview

**Product:** [Name]
**Category:** [e.g., B2B SaaS, Consumer App, Marketplace]
**Core Value Prop:** [One sentence - why users choose this]

## Target Users

### Primary Persona
**Name:** [e.g., "Busy Professional"]
**Goals:**
- [Primary goal]
- [Secondary goal]
**Pain Points:**
- [What frustrates them]
- [What they want to avoid]
**Context:** [When/where they use the product]

### Secondary Persona(s)
[Same format]

## Core User Journeys

| Journey | User Goal | Entry Point | Success State |
|---------|-----------|-------------|---------------|
| Onboarding | Get started | Landing page | First value moment |
| Core Task | [Main job] | Dashboard | Task completed |
| Return Visit | Continue work | Login | Resume context |

## Product Principles (from PRDs)
- [Principle 1]
- [Principle 2]
```

---

## Phase 2: UX Audit

### Nielsen's 10 Heuristics Checklist

Evaluate each screen/flow against these heuristics:

```markdown
## UX Heuristics Audit

### 1. Visibility of System Status
**Principle:** Users should always know what's going on

| Screen | Issue | Severity |
|--------|-------|----------|
| Login | No loading indicator during auth | High |
| Dashboard | No indication data is refreshing | Medium |
| Upload | No progress feedback | Critical |

**Questions to ask:**
- Is there a loading state?
- Do users know if action succeeded/failed?
- Is there feedback for every interaction?

---

### 2. Match Between System and Real World
**Principle:** Use familiar language and concepts

| Screen | Issue | Severity |
|--------|-------|----------|
| Settings | "Hydrate cache" - technical jargon | Medium |
| Error | "Error 500" - not user-friendly | High |

**Questions to ask:**
- Would a non-technical user understand this?
- Does terminology match user's mental model?
- Are icons universally understood?

---

### 3. User Control and Freedom
**Principle:** Easy exit and undo

| Screen | Issue | Severity |
|--------|-------|----------|
| Form | No way to cancel mid-flow | High |
| Delete | No undo option | Critical |
| Modal | No close button, only backdrop click | Medium |

**Questions to ask:**
- Can users easily go back?
- Can destructive actions be undone?
- Are there emergency exits?

---

### 4. Consistency and Standards
**Principle:** Follow conventions, be internally consistent

| Screen | Issue | Severity |
|--------|-------|----------|
| Buttons | Primary button style varies | Medium |
| Forms | Validation messages in different places | High |
| Nav | Some links open new tab, some don't | Low |

**Questions to ask:**
- Do similar things look/work the same?
- Does it follow platform conventions?
- Is the design system applied consistently?

---

### 5. Error Prevention
**Principle:** Prevent errors before they happen

| Screen | Issue | Severity |
|--------|-------|----------|
| Form | No confirmation before delete | Critical |
| Input | Allows invalid date formats | High |
| Checkout | Easy to double-submit | High |

**Questions to ask:**
- Are there confirmation dialogs for destructive actions?
- Does validation happen before submission?
- Are confusing options eliminated?

---

### 6. Recognition Rather Than Recall
**Principle:** Minimize memory load

| Screen | Issue | Severity |
|--------|-------|----------|
| Search | No recent searches shown | Medium |
| Form | Field labels disappear when typing | High |
| Nav | No indication of current location | High |

**Questions to ask:**
- Is relevant info visible when needed?
- Do users need to remember info from other screens?
- Is current context always clear?

---

### 7. Flexibility and Efficiency
**Principle:** Cater to both novice and expert users

| Screen | Issue | Severity |
|--------|-------|----------|
| App | No keyboard shortcuts | Low |
| List | No bulk actions | Medium |
| Form | No autofill support | Medium |

**Questions to ask:**
- Are there shortcuts for power users?
- Can common tasks be done quickly?
- Is personalization available?

---

### 8. Aesthetic and Minimalist Design
**Principle:** No irrelevant or rarely needed info

| Screen | Issue | Severity |
|--------|-------|----------|
| Dashboard | Too many cards competing for attention | High |
| Modal | Excessive text, no hierarchy | Medium |
| Form | Optional fields same weight as required | Low |

**Questions to ask:**
- Is every element necessary?
- Is there clear visual hierarchy?
- Is the signal-to-noise ratio high?

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors
**Principle:** Clear, helpful error messages

| Screen | Issue | Severity |
|--------|-------|----------|
| Login | "Error occurred" - no detail | Critical |
| Form | Red outline but no message | High |
| API | Generic "Something went wrong" | High |

**Questions to ask:**
- Do error messages explain the problem?
- Do they suggest a solution?
- Is the language human, not technical?

---

### 10. Help and Documentation
**Principle:** Easy to search, focused on tasks

| Screen | Issue | Severity |
|--------|-------|----------|
| App | No contextual help | Medium |
| Complex feature | No onboarding tooltip | High |
| Empty state | No guidance on what to do | High |

**Questions to ask:**
- Is help available in context?
- Are empty states helpful?
- Is there onboarding for new users?
```

---

### User Flow Audit Template

```markdown
## Flow: [Name] (e.g., "New User Signup")

### Happy Path
1. User lands on /signup
2. Fills email, password, name
3. Clicks "Create Account"
4. Sees verification message
5. Clicks email link
6. Lands on dashboard

### Friction Points Found

| Step | Issue | Impact | Severity |
|------|-------|--------|----------|
| 2 | Password requirements not shown upfront | User fails validation | High |
| 3 | Button says "Submit" not "Create Account" | Unclear action | Low |
| 4 | No option to resend verification | User stuck if email lost | Critical |
| 5 | Link expires in 1 hour, not communicated | Confusion on failure | High |

### Edge Cases Not Handled

| Scenario | What Happens | Should Happen |
|----------|--------------|---------------|
| Email already exists | Generic error | "Already have account? Log in" |
| Weak password | Form resets | Keep data, show specific rule |
| Close tab mid-flow | Lost forever | Resume on return |

### Screenshots/Evidence
- `app/signup/page.tsx:45` - No password hints
- `components/Button.tsx` - Generic "Submit" label
```

---

### Accessibility Audit

```markdown
## Accessibility Audit (WCAG 2.1)

### Level A Issues (Must Fix)

| Issue | Location | WCAG | Fix |
|-------|----------|------|-----|
| Images missing alt text | Dashboard cards | 1.1.1 | Add descriptive alt |
| No skip link | All pages | 2.4.1 | Add skip to content |
| Color-only error indication | Forms | 1.4.1 | Add icon/text |
| No focus indicator | Custom buttons | 2.4.7 | Add focus ring |

### Level AA Issues (Should Fix)

| Issue | Location | WCAG | Fix |
|-------|----------|------|-----|
| Contrast ratio 3.5:1 | Gray text | 1.4.3 | Darken to 4.5:1 |
| No heading hierarchy | Settings | 1.3.1 | Use proper h1-h6 |
| Touch target < 44px | Mobile nav | 2.5.5 | Increase to 44px |

### Keyboard Navigation

| Screen | Issue |
|--------|-------|
| Modal | Can't escape with keyboard |
| Dropdown | Arrow keys don't work |
| Date picker | Not keyboard accessible |

### Screen Reader Test

| Screen | Issue |
|--------|-------|
| Dashboard | Cards not announced as groups |
| Form | Error messages not associated with fields |
| Loading | No aria-live announcement |
```

---

## Phase 3: Product Gap Analysis

### Missing "Table Stakes" Features

```markdown
## Table Stakes Analysis

Features users expect in [product category]:

| Feature | Status | User Expectation | Impact if Missing |
|---------|--------|------------------|-------------------|
| Forgot password | ❌ Missing | Essential | Can't recover account |
| Dark mode | ❌ Missing | Expected 2024+ | Accessibility, preference |
| Search | ⚠️ Basic | Filter, sort, save | Can't find content |
| Export data | ❌ Missing | "My data" ownership | Trust issue |
| Notifications | ⚠️ Partial | Control preferences | Annoyance |
| Mobile responsive | ⚠️ Broken | Works on phone | Lost mobile users |
```

### Competitive Gap Analysis

```markdown
## Competitive Comparison

| Feature | Our Product | Competitor A | Competitor B | Gap? |
|---------|-------------|--------------|--------------|------|
| Onboarding | Basic form | Interactive tour | Video + checklist | Yes |
| Dashboard | Static | Customizable | AI insights | Yes |
| Collaboration | None | Real-time | Comments | Yes |
| Integrations | 0 | 50+ | 100+ | Yes |
| Mobile app | None | iOS + Android | PWA | Yes |
```

### Delight Opportunities

```markdown
## Delight Opportunities

Things that would make users love the product:

| Opportunity | Description | Effort | Delight Factor |
|-------------|-------------|--------|----------------|
| Celebrate milestones | Confetti on first task | S | High |
| Smart defaults | Pre-fill based on context | M | High |
| Keyboard shortcuts | Power user efficiency | M | Medium |
| Personalization | Remember preferences | M | High |
| Offline mode | Work without internet | L | Medium |
```

---

### Empty States Audit

```markdown
## Empty States

| Screen | Current State | Problem | Better State |
|--------|---------------|---------|--------------|
| Dashboard | "No data" | No guidance | "Create your first X" + CTA |
| Search | Blank | Feels broken | "Try searching for..." |
| Notifications | "Nothing here" | Dismissive | "You're all caught up!" |
| Error 404 | "Not found" | Dead end | Search + popular links |
```

---

## Phase 4: Improvement PRD Template

```markdown
# PRD-UX-001: Product & Usability Improvements

**Status:** Draft
**Author:** @claude
**Date:** [Today]
**Type:** UX/Product
**Priority:** High

---

## Executive Summary

This PRD documents usability issues and product gaps identified through UX audit. Implementing these improvements will reduce user friction, increase task completion, and improve satisfaction.

**Audit Scope:**
- Screens audited: [count]
- User flows evaluated: [count]
- Issues found: [count]

**Issue Summary:**
| Category | Count | Critical |
|----------|-------|----------|
| Usability Heuristic Violations | X | X |
| Accessibility Issues | X | X |
| Missing Table Stakes | X | X |
| User Flow Friction | X | X |
| Delight Opportunities | X | - |

---

## Critical Usability Fixes

### UX-001: Error Message Improvements

**Heuristic:** #9 - Help users recover from errors
**Severity:** Critical
**User Impact:** Users abandon flow when errors are unclear

#### Current State
- Generic "Error occurred" messages
- Technical error codes shown
- No recovery guidance

**Evidence:**
- `components/ErrorBoundary.tsx:15` - Shows raw error
- `lib/api.ts:45` - Catches but shows generic message
- User feedback: "I don't know what went wrong"

#### Proposed Solution

**1. Error Message Framework**
```
Structure:
- What happened (user terms)
- Why it happened (if known)
- What to do next (action)

Example:
Before: "Error 401"
After: "Your session expired. Please log in again to continue."
       [Log In] button
```

**2. Error Message Inventory**

| Error | Current | Proposed |
|-------|---------|----------|
| 401 | "Unauthorized" | "Session expired. Log in again." |
| 404 | "Not found" | "This page doesn't exist. Go to [Dashboard]" |
| 500 | "Server error" | "Something went wrong on our end. Try again in a minute." |
| Network | "Failed to fetch" | "Can't connect. Check your internet." |
| Validation | "Invalid input" | "[Field] must be [requirement]" |

**3. Implementation Spec**
```
Location: lib/errors.ts (new)

- Create error message map
- Include recovery action for each
- Support i18n
- Log original error for debugging

Component: components/ErrorMessage.tsx
Props:
- code: string
- context?: string
- action?: { label: string, onClick: () => void }
```

#### Acceptance Criteria
- [ ] No technical error codes shown to users
- [ ] Every error has recovery guidance
- [ ] Error messages tested with non-technical users
- [ ] Errors logged for debugging

---

### UX-002: Loading State Consistency

**Heuristic:** #1 - Visibility of system status
**Severity:** High
**User Impact:** Users don't know if action worked

#### Current State
- Some buttons show loading, some don't
- No skeleton loaders on data fetch
- Page appears broken while loading

#### Proposed Solution

**1. Loading State Standards**

| Interaction | Loading Indicator |
|-------------|-------------------|
| Button click | Spinner in button, disabled state |
| Page load | Skeleton matching layout |
| Data refresh | Subtle indicator, keep old data |
| Long operation | Progress bar with estimate |
| Background | None visible (optimistic) |

**2. Implementation**

```
New components:
- Skeleton (configurable shape)
- ButtonLoader (inline spinner)
- ProgressBar (determinate/indeterminate)
- PageLoader (full page skeleton)

Utility:
- useLoading hook with minimum display time (300ms)
  to prevent flash
```

#### Acceptance Criteria
- [ ] All buttons show loading state
- [ ] All data fetches show skeletons
- [ ] No layout shift when loading completes
- [ ] Minimum 300ms display prevents flash

---

## Missing Feature Specifications

### UX-003: Forgot Password Flow

**Category:** Table Stakes
**Severity:** Critical
**User Impact:** Users locked out of accounts

#### Current State
No password recovery option exists.

#### Proposed Solution

**Flow:**
```
1. Login page → "Forgot password?" link
2. Enter email → [Send Reset Link]
3. Confirmation: "Check your email"
4. Email with link (expires 1 hour)
5. Click link → Set new password page
6. Success → Redirect to login with message
```

**Screens:**

**Screen 1: Request Reset**
```
[Logo]

Forgot your password?
Enter your email and we'll send a reset link.

[Email input]
[Send Reset Link] (primary button)

[Back to Login] (text link)
```

**Screen 2: Email Sent**
```
[Checkmark icon]

Check your email
We sent a reset link to [email].
Link expires in 1 hour.

Didn't receive it?
[Resend] (enabled after 60s countdown)

[Back to Login]
```

**Screen 3: Set New Password**
```
[Logo]

Set new password

[New password input]
  - 8+ characters
  - One uppercase
  - One number

[Confirm password input]

[Reset Password]
```

**Screen 4: Success**
```
[Checkmark icon]

Password updated
You can now log in with your new password.

[Go to Login]
```

**Edge Cases:**
| Scenario | Behavior |
|----------|----------|
| Email not found | Show same "check email" (security) |
| Link expired | "Link expired" + request new |
| Link already used | "Link already used" + request new |
| Weak password | Inline validation |

#### Acceptance Criteria
- [ ] Forgot password link on login page
- [ ] Reset email sent within 30 seconds
- [ ] Link expires after 1 hour
- [ ] Password requirements shown upfront
- [ ] Works on mobile

---

### UX-004: Empty State Improvements

**Category:** User Guidance
**Severity:** High
**User Impact:** New users don't know what to do

#### Current State
Empty states show "No data" with no guidance.

#### Proposed Solution

**Empty State Template:**
```
[Illustration]
[Headline - encouraging]
[Description - explain value]
[Primary CTA]
[Secondary link - optional]
```

**Empty States Inventory:**

| Screen | Headline | Description | CTA |
|--------|----------|-------------|-----|
| Dashboard | "Welcome! Let's get started" | "Create your first project to see your stats here." | "Create Project" |
| Projects | "No projects yet" | "Projects help you organize your work." | "New Project" |
| Notifications | "All caught up!" | "New notifications will appear here." | - |
| Search | "No results for '[query]'" | "Try different keywords or filters." | "Clear filters" |

#### Acceptance Criteria
- [ ] Every empty state has illustration
- [ ] Every empty state has helpful CTA
- [ ] Empty states tested with new users
- [ ] Illustrations match brand

---

## Accessibility Fixes

### UX-005: Keyboard Navigation

**WCAG:** 2.1.1 Keyboard
**Severity:** High
**User Impact:** Keyboard users can't use app

#### Issues Found
- Modal can't be closed with Escape
- Dropdowns don't respond to arrow keys
- Focus trap not implemented in modals
- Custom components not focusable

#### Proposed Fixes

| Component | Fix |
|-----------|-----|
| Modal | Add Escape to close, focus trap |
| Dropdown | Arrow keys navigate, Enter selects |
| Tabs | Arrow keys switch, Tab moves out |
| Custom buttons | Add tabindex, keydown handlers |

#### Acceptance Criteria
- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all elements
- [ ] Logical tab order
- [ ] Escape closes all modals/dropdowns

---

### UX-006: Color Contrast

**WCAG:** 1.4.3 Contrast
**Severity:** High
**User Impact:** Low vision users can't read

#### Issues Found
| Element | Current Ratio | Required | Fix |
|---------|---------------|----------|-----|
| Gray text | 3.5:1 | 4.5:1 | Darken to #666 |
| Placeholder | 2.8:1 | 4.5:1 | Darken to #757575 |
| Disabled button | 2.1:1 | 3:1 | Darken to #949494 |
| Error red on pink | 3.2:1 | 4.5:1 | Darken red |

#### Acceptance Criteria
- [ ] All text meets 4.5:1 contrast
- [ ] All UI elements meet 3:1 contrast
- [ ] Tested with contrast checker

---

## Quick Wins

Low effort, high impact improvements:

| Improvement | Effort | Impact | Priority |
|-------------|--------|--------|----------|
| Add loading spinners to buttons | XS | High | P0 |
| Improve error messages | S | High | P0 |
| Add "Forgot password" link (UI only) | XS | High | P0 |
| Fix color contrast | XS | Medium | P1 |
| Add keyboard focus styles | XS | Medium | P1 |
| Improve empty states copy | XS | Medium | P1 |

---

## Implementation Priority

### Phase 1: Critical Fixes (Week 1-2)
| Issue | Type | Effort |
|-------|------|--------|
| UX-001 | Error messages | S |
| UX-003 | Forgot password | M |
| UX-005 | Keyboard nav (modals) | S |

### Phase 2: High Priority (Week 3-4)
| Issue | Type | Effort |
|-------|------|--------|
| UX-002 | Loading states | M |
| UX-004 | Empty states | S |
| UX-006 | Color contrast | XS |

### Phase 3: Enhancements (Week 5+)
| Issue | Type | Effort |
|-------|------|--------|
| UX-007 | Onboarding flow | L |
| UX-008 | Dark mode | M |
| UX-009 | Mobile responsive fixes | M |

---

## User Research Recommendations

Issues that need user validation:

1. **Onboarding:** A/B test interactive tour vs checklist
2. **Dashboard:** User interviews on what metrics matter
3. **Navigation:** Card sort to validate IA
4. **Empty states:** Usability test with new users

---

## Metrics to Track

| Metric | Current | Target | Measures |
|--------|---------|--------|----------|
| Task completion rate | ? | 90%+ | UX effectiveness |
| Time to first value | ? | < 2 min | Onboarding quality |
| Error rate | ? | < 5% | Error prevention |
| Support tickets (UX) | ? | -50% | Issue resolution |
| Accessibility score | ? | 100% | a11y compliance |

---

## Appendix

### A. Heuristic Evaluation Summary
[Full heuristic scores]

### B. Accessibility Audit Report
[Full WCAG checklist]

### C. User Flow Diagrams
[Visual flows with friction points marked]

### D. Competitive Screenshots
[Reference designs from competitors]
```

---

## UX Evaluation Checklist

Quick checklist for any screen:

```markdown
## Screen: [Name]

### First Impression (5 seconds)
- [ ] Purpose is clear
- [ ] Primary action is obvious
- [ ] Visual hierarchy guides eye

### Usability
- [ ] All actions have feedback
- [ ] Errors are helpful
- [ ] User can go back/undo
- [ ] No dead ends

### Accessibility
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Sufficient contrast
- [ ] Touch targets 44px+

### Edge Cases
- [ ] Empty state handled
- [ ] Loading state shown
- [ ] Error state designed
- [ ] Offline behavior defined

### Mobile
- [ ] Responsive layout works
- [ ] Touch targets adequate
- [ ] No horizontal scroll
- [ ] Forms usable on mobile
```

---

## Begin

When activated:

1. Ask: "What type of product is this? Who are the target users?"
2. **Build PRD Context** (Phase 0): Read ALL PRDs and construct the UX Requirements Map
3. Understand the intended user experience from PRD specifications
4. Audit every screen and flow against PRD specs and heuristics
5. Generate improvement PRD with specific PRD references

Start with: "I'll evaluate your product's user experience against PRD specifications. First, let me build a complete picture by reading ALL PRDs — this tells us what user experiences SHOULD exist, which we'll compare against what users ACTUALLY experience."

Remember: **Every UX issue should reference specific PRDs where applicable (e.g., PRD-002 AC3: Flow differs). The goal is aligning actual UX with intended UX from PRDs, plus identifying improvements beyond the specs.**
