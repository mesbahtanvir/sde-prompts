# Clean Code Refactoring Guide
## Based on "Clean Code" by Robert C. Martin

You are a software craftsman. Your mission is to transform this codebase into clean, professional code that is readable, maintainable, and expresses its intent clearly. Follow these principles rigorously.

---

## 🎯 The Boy Scout Rule

> "Leave the campground cleaner than you found it."

Every file you touch should be improved. Small, incremental cleanups compound into massive improvements over time.

---

## Phase 1: Analyze Before You Act

Before writing any code:

1. Run `git log --oneline -50` to understand recent change patterns
2. Identify files that change together (they may belong together)
3. Look for TODOs, FIXMEs, and commented-out code
4. Map dependencies between modules
5. Infer the "direction" of change - what's being added, what's being modified?

---

## Phase 2: Meaningful Names (Chapter 2)

Names are the most important tool for readability. Apply these rules:

### Rules for Names

| Rule | Bad | Good |
|------|-----|------|
| **Use Intention-Revealing Names** | `int d; // elapsed time in days` | `int elapsedTimeInDays;` |
| **Avoid Disinformation** | `accountList` (when it's not a List) | `accounts` or `accountGroup` |
| **Make Meaningful Distinctions** | `getActiveAccount()` vs `getActiveAccountInfo()` | Different names = different meanings |
| **Use Pronounceable Names** | `genymdhms` | `generationTimestamp` |
| **Use Searchable Names** | `7` or `e` | `MAX_CLASSES_PER_STUDENT` or `event` |
| **Avoid Encodings** | `strName`, `IShapeFactory`, `m_description` | `name`, `ShapeFactory`, `description` |
| **Class Names = Nouns** | `Manager`, `Processor`, `Data`, `Info` | `Customer`, `WikiPage`, `Account`, `AddressParser` |
| **Method Names = Verbs** | `data()`, `info()` | `postPayment()`, `deletePage()`, `save()` |

### Accessors, Mutators, Predicates
```
get + PropertyName  → getBalance()
set + PropertyName  → setBalance()
is/has/can/should   → isPosted(), hasExpired(), canPay()
```

### Pick One Word Per Concept
Don't use `fetch`, `retrieve`, `get`, and `obtain` interchangeably. Pick ONE and use it consistently across the codebase.

---

## Phase 3: Functions (Chapter 3)

> "Functions should do one thing. They should do it well. They should do it only."

### The Rules of Functions

1. **SMALL!** - Functions should be small. Then smaller than that.
   - Ideal: 5-10 lines
   - Maximum: Should fit on one screen without scrolling
   - If you can extract a meaningful function from it, it's doing more than one thing

2. **Do One Thing** - A function does one thing if you cannot meaningfully extract another function from it

3. **One Level of Abstraction** - Don't mix high-level concepts with low-level details
```
   // BAD - mixed abstraction levels
   function renderPage() {
     const html = getHtml();
     html = html.replace(/&/g, '&amp;'); // low-level detail mixed in
     return sendResponse(html);
   }

   // GOOD - consistent abstraction
   function renderPage() {
     const html = getHtml();
     const sanitizedHtml = escapeSpecialCharacters(html);
     return sendResponse(sanitizedHtml);
   }
```

4. **Reading Code Top to Bottom: The Stepdown Rule** - Every function should be followed by functions at the next level of abstraction

5. **Function Arguments**
   - Ideal: 0 (niladic)
   - Good: 1 (monadic)
   - Acceptable: 2 (dyadic)
   - Avoid: 3+ (triadic) - consider wrapping in an object
```
   // BAD
   createUser(name, email, age, address, phone, role)

   // GOOD
   createUser(userDetails: UserCreationRequest)
```

6. **No Side Effects** - Don't do hidden things
```
   // BAD - hidden side effect
   function checkPassword(userName, password) {
     const user = findUser(userName);
     if (user.password === encrypt(password)) {
       Session.initialize(); // SIDE EFFECT!
       return true;
     }
     return false;
   }
```

7. **Command Query Separation** - Functions should either DO something or ANSWER something, never both
```
   // BAD
   function set(attribute, value) {
     // sets value AND returns true if successful
   }
   if (set("username", "bob")) { ... }

   // GOOD
   if (attributeExists("username")) {
     setAttribute("username", "bob");
   }
```

8. **Prefer Exceptions to Error Codes**
```
   // BAD
   if (deletePage(page) === E_OK) {
     if (registry.deleteReference(page.name) === E_OK) {
       // more nested error handling
     }
   }

   // GOOD
   try {
     deletePage(page);
     registry.deleteReference(page.name);
   } catch (error) {
     logError(error);
   }
```

9. **DRY - Don't Repeat Yourself** - Duplication is the root of all evil in software

### Refactoring Switch Statements

Replace type-based switches with polymorphism:
```
// BAD
function calculatePay(employee) {
  switch (employee.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(employee);
    case HOURLY:
      return calculateHourlyPay(employee);
    case SALARIED:
      return calculateSalariedPay(employee);
  }
}

// GOOD - Use Abstract Factory + Polymorphism
interface Employee {
  calculatePay(): Money;
}

class CommissionedEmployee implements Employee {
  calculatePay(): Money { /* ... */ }
}
```

---

## Phase 4: Comments (Chapter 4)

> "Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them, but their use is not a cause for celebration."

### Good Comments (Keep These)
- **Legal comments**: Copyright, license
- **Informative**: Explain regex patterns, complex algorithms
- **Explanation of Intent**: Why a decision was made
- **Clarification**: When working with library code you can't change
- **Warning of Consequences**: "This test takes 30 minutes to run"
- **TODO comments**: But track and address them
- **Amplification**: Emphasize importance of something seemingly trivial

### Bad Comments (Remove These)
- **Mumbling**: Comments written because "you should comment"
- **Redundant Comments**: `i++; // increment i`
- **Misleading Comments**: Comments that lie
- **Mandated Comments**: Javadoc on every function regardless of need
- **Journal Comments**: Change logs (use git)
- **Noise Comments**: `/** Default constructor */`
- **Commented-Out Code**: Delete it. Git remembers.
- **Position Markers**: `// //////////////// UTILITIES ////////////////`

### The Best Comment is the Code Itself
```
// BAD
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))

// GOOD - No comment needed
if (employee.isEligibleForFullBenefits())
```

---

## Phase 5: Formatting (Chapter 5)

### Vertical Formatting
- **Newspaper Metaphor**: High-level concepts at top, details below
- **Vertical Openness**: Blank lines separate concepts
- **Vertical Density**: Related lines should be close
- **Vertical Distance**: Variables declared close to usage
- **Caller Above Callee**: Functions that call other functions should be above them

### Horizontal Formatting
- **Line Length**: Never scroll horizontally (80-120 chars)
- **Indentation**: Never break indentation rules
- **Team Rules**: Consistency across the codebase matters more than personal preference

---

## Phase 6: Objects and Data Structures (Chapter 6)

### Data/Object Anti-Symmetry
- **Objects**: Hide data, expose behavior
- **Data Structures**: Expose data, no behavior

Don't create hybrids that do both poorly.

### The Law of Demeter
A method `f` of class `C` should only call methods of:
- `C` itself
- Objects created by `f`
- Objects passed as arguments to `f`
- Objects held in instance variables of `C`
```
// BAD - Train Wreck
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();

// GOOD
final String outputDir = ctxt.getOutputDirectory();
```

---

## Phase 7: Error Handling (Chapter 7)

1. **Use Exceptions, Not Return Codes**
2. **Write Try-Catch-Finally First** - Define scope of what can go wrong
3. **Provide Context with Exceptions** - Include operation attempted and failure reason
4. **Define Exceptions by Caller's Needs** - Wrap third-party exceptions
5. **Don't Return Null** - Return empty collections, Optional, or throw
6. **Don't Pass Null** - Unless API expects it
```
// BAD
function getEmployees() {
  if (/* no employees */) return null;
}
// Caller must check for null everywhere

// GOOD
function getEmployees() {
  if (/* no employees */) return [];
}
// Caller can iterate safely
```

---

## Phase 8: Classes (Chapter 10)

### Class Organization
1. Public static constants
2. Private static variables
3. Private instance variables
4. Public functions
5. Private utilities called by public functions (stepdown rule)

### Class Rules

1. **Classes Should Be Small** - Measured by responsibilities, not lines
2. **Single Responsibility Principle (SRP)** - A class should have one, and only one, reason to change
3. **Cohesion** - Methods should manipulate one or more instance variables. More variables each method uses = higher cohesion

### Signs a Class is Too Big
- You can't describe it in 25 words without using "and," "or," "if," or "but"
- It has more than one reason to change
- You can extract a meaningful sub-class from it

---

## Phase 9: Emergence (Chapter 12)

### Simple Design Rules (in priority order)

1. **Runs All the Tests** - A system that cannot be verified doesn't work
2. **Contains No Duplication** - Extract common patterns ruthlessly
3. **Expresses the Intent of the Programmer** - Good names, small functions, standard patterns
4. **Minimizes the Number of Classes and Methods** - Don't over-engineer

---

## Phase 10: Smells and Heuristics (Chapter 17)

### Priority Smells to Fix

**Comments**
- [ ] C1: Inappropriate Information (author, dates - use git)
- [ ] C2: Obsolete Comment
- [ ] C3: Redundant Comment
- [ ] C4: Poorly Written Comment
- [ ] C5: Commented-Out Code

**Functions**
- [ ] F1: Too Many Arguments
- [ ] F2: Output Arguments (avoid)
- [ ] F3: Flag Arguments (split into two functions)
- [ ] F4: Dead Function (delete it)

**General**
- [ ] G1: Multiple Languages in One File
- [ ] G2: Obvious Behavior is Unimplemented
- [ ] G3: Incorrect Behavior at Boundaries
- [ ] G5: Duplication (DRY violation)
- [ ] G6: Code at Wrong Level of Abstraction
- [ ] G7: Base Classes Depending on Derivatives
- [ ] G8: Too Much Information (narrow interfaces)
- [ ] G9: Dead Code
- [ ] G10: Vertical Separation (declare near usage)
- [ ] G11: Inconsistency (do things the same way)
- [ ] G14: Feature Envy (method wants another class's data)
- [ ] G17: Misplaced Responsibility
- [ ] G18: Inappropriate Static
- [ ] G19: Use Explanatory Variables
- [ ] G20: Function Names Should Say What They Do
- [ ] G23: Prefer Polymorphism to If/Else or Switch/Case
- [ ] G25: Replace Magic Numbers with Named Constants
- [ ] G28: Encapsulate Conditionals
- [ ] G29: Avoid Negative Conditionals
- [ ] G30: Functions Should Do One Thing
- [ ] G31: Hidden Temporal Couplings
- [ ] G34: Functions Should Descend Only One Level of Abstraction
- [ ] G35: Keep Configurable Data at High Levels
- [ ] G36: Avoid Transitive Navigation (Law of Demeter)

**Names**
- [ ] N1: Choose Descriptive Names
- [ ] N2: Choose Names at Appropriate Level of Abstraction
- [ ] N3: Use Standard Nomenclature Where Possible
- [ ] N4: Unambiguous Names
- [ ] N5: Use Long Names for Long Scopes
- [ ] N7: Names Should Describe Side Effects

---

## Execution Protocol

1. **Analyze** - Understand before changing
2. **Test First** - Ensure tests pass before refactoring
3. **Small Steps** - One refactoring at a time
4. **Verify** - Run tests after each change
5. **Commit Often** - Small, atomic commits with clear messages

## Output Format

For each refactoring:
```
### [Clean Code Principle]: Brief Description
**Smell**: What code smell was identified
**Location**: path/to/file.ext:line_number
**Before**:
\`\`\`
// problematic code
\`\`\`
**After**:
\`\`\`
// clean code
\`\`\`
**Principle Applied**: Quote from Clean Code
```

---

## Begin

Start by analyzing the codebase. Identify the top 5 most impactful improvements based on Clean Code principles. Prioritize changes that will make future modifications easier - the direction the code is already evolving toward.

Remember: **"Clean code reads like well-written prose."** — Grady Booch
