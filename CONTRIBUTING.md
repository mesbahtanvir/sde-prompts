# Contributing Guide

Thank you for your interest in contributing to the Software Development Prompts collection! This guide will help you create high-quality prompts that are valuable to the community.

---

## 🎯 What Makes a Good Prompt?

A great prompt should be:

1. **Comprehensive** - Cover the topic thoroughly with multiple phases/sections
2. **Actionable** - Provide specific, executable guidance
3. **Example-Rich** - Include bad vs good code examples
4. **Framework-Agnostic** - Work with any language/framework (unless specifically targeted)
5. **Focused on Analysis** - Analyze existing code OR guide new implementations
6. **Well-Structured** - Follow consistent formatting and organization

---

## 📝 Prompt Template

Use this template when creating a new prompt:

```markdown
# [Topic] Guide
## [Subtitle - Analysis/Implementation Focus]

You are a [role]. Your mission is to [primary goal statement].

---

## 🎯 Your Mission

> "[Relevant quote from industry expert]"

**Primary Goals:**
1. **[Goal 1]**
2. **[Goal 2]**
3. **[Goal 3]**
4. **[Goal 4]**
5. **[Goal 5]**

---

## Phase 1: [First Major Topic]

### [Subtopic]

[Explanation]

```[language]
// ❌ BAD - [Why it's bad]
[bad example code]

// ✅ GOOD - [Why it's good]
[good example code]
```

[Additional context]

**[Topic] Checklist**:
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

---

## Phase 2: [Second Major Topic]

[Continue pattern...]

---

## Phase N: [Final Topic] Checklist

### Pre-[Deployment/Implementation] Audit

- [ ] **[Category 1]**
  - [ ] Specific check
  - [ ] Specific check

- [ ] **[Category 2]**
  - [ ] Specific check
  - [ ] Specific check

---

## Common [Topic] Mistakes

### ❌ Mistake 1: [Name]
```[language]
// Bad example
```

### ✅ Fix: [Solution]
```[language]
// Good example
```

---

## Tools & Resources

### [Category] Tools
- **Tool Name**: Description
- **Tool Name**: Description

### Useful Commands
```bash
# Command 1
command --flag

# Command 2
command --flag
```

---

## Begin

Analyze your [codebase/implementation/deployment] for:

1. **[Aspect 1]**
2. **[Aspect 2]**
3. **[Aspect 3]**

> "[Closing motivational quote]"

Remember: **[Key takeaway message]**
```

---

## 📋 Checklist Before Submitting

- [ ] **Filename**: Use kebab-case (e.g., `my-new-topic.md`)
- [ ] **Location**: Place in `/prompts/` directory
- [ ] **Structure**: Follow the template above
- [ ] **Examples**: Include 5+ bad vs good examples
- [ ] **Checklists**: Add actionable checklists
- [ ] **Length**: 500-2000 lines (comprehensive but focused)
- [ ] **Formatting**: Use proper markdown (headers, code blocks, tables)
- [ ] **Code Blocks**: Specify language for syntax highlighting
- [ ] **Emojis**: Use sparingly (only in section headers like 🎯)
- [ ] **Quotes**: Include relevant industry expert quotes
- [ ] **Testing**: Copy-paste into AI and verify it works well

---

## 🎨 Style Guide

### Code Examples

Always show **bad vs good** examples:

```markdown
// ❌ BAD - [Specific reason why it's bad]
[problematic code]

// ✅ GOOD - [Specific reason why it's good]
[improved code]
```

### Section Headers

Use this hierarchy:
- `#` - Title
- `##` - Subtitle
- `###` - Phase/Major Section
- `####` - Subsection

### Lists

Use checkboxes for actionable items:
```markdown
- [ ] Do this
- [ ] Do that
```

Use bullets for informational lists:
```markdown
- Concept 1
- Concept 2
```

### Tables

Use for comparisons:
```markdown
| Pattern | Bad | Good |
|---------|-----|------|
| X | Don't do this | Do this instead |
```

---

## 📂 File Organization

```
prompts/
├── clean-code-refactoring.md      # Code quality
├── test-driven-development.md     # Testing
├── api-design-principles.md       # API design
├── security-best-practices.md     # Security
├── nextjs-best-practices.md       # Framework-specific
└── your-new-prompt.md             # Your contribution
```

---

## 🚀 Submission Process

### 1. Create Your Prompt

Follow the template and style guide above.

### 2. Update README.md

Add your prompt to the appropriate section:

```markdown
### [Category]

- **[Your Prompt Name](prompts/your-file.md)** - [One sentence description]. [Key topics covered].
```

And add to the Quick Reference table:

```markdown
| [Situation] | [Your Prompt Name](prompts/your-file.md) |
```

### 3. Test It

Paste your prompt into an AI assistant (Claude, GPT-4, etc.) with sample code and verify:
- [ ] AI understands the prompt
- [ ] AI provides helpful, actionable feedback
- [ ] Examples are clear and accurate
- [ ] Checklists are comprehensive

### 4. Submit Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b add-[topic]-prompt`
3. Add your prompt file
4. Update README.md
5. Commit: `git commit -m "Add [Topic] Best Practices prompt"`
6. Push: `git push origin add-[topic]-prompt`
7. Open Pull Request with description of what the prompt covers

---

## 💡 Prompt Ideas

We'd love contributions on these topics:

### Development Practices
- [ ] CI/CD Best Practices
- [ ] Git Workflow & Branching Strategies
- [ ] Documentation Standards
- [ ] Microservices Architecture
- [ ] Event-Driven Architecture
- [ ] SOLID Principles

### Languages & Frameworks
- [ ] Python Best Practices
- [ ] TypeScript Best Practices
- [ ] React Best Practices
- [ ] Vue.js Best Practices
- [ ] Node.js Best Practices
- [ ] Django Best Practices
- [ ] Spring Boot Best Practices

### Infrastructure & DevOps
- [ ] Docker Best Practices
- [ ] Kubernetes Best Practices
- [ ] AWS Best Practices
- [ ] Azure Best Practices
- [ ] Terraform Best Practices
- [ ] Monitoring & Observability

### Data & Backend
- [ ] PostgreSQL Optimization
- [ ] MongoDB Best Practices
- [ ] Redis Caching Strategies
- [ ] GraphQL Best Practices
- [ ] Message Queue Patterns (RabbitMQ, Kafka)

### Frontend & Mobile
- [ ] CSS/SCSS Best Practices
- [ ] Accessibility (a11y) Guidelines
- [ ] Progressive Web Apps (PWA)
- [ ] React Native Best Practices
- [ ] Flutter Best Practices

### Specialized Topics
- [ ] Machine Learning Code Quality
- [ ] Blockchain Development
- [ ] WebSocket Best Practices
- [ ] Serverless Architecture
- [ ] WebAssembly Optimization

---

## ✅ Example: Good Contribution

See [`prompts/nextjs-best-practices.md`](prompts/nextjs-best-practices.md) for a complete example that:
- ✅ Follows the template structure
- ✅ Includes comprehensive examples
- ✅ Has actionable checklists
- ✅ Covers 8+ major phases
- ✅ Uses proper formatting
- ✅ Includes tools and commands
- ✅ Has clear bad vs good examples

---

## 🤝 Community

### Questions?

Open a GitHub Issue with the `question` label.

### Suggestions?

Open a GitHub Issue with the `enhancement` label.

### Found a Bug in a Prompt?

Open a GitHub Issue with the `bug` label and specify:
- Which prompt
- What's incorrect
- Suggested fix

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as this project (MIT).

---

Thank you for helping make this collection better! 🙏

Every contribution helps developers write better code and build better systems.
