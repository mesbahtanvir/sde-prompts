# Software Development Prompts

A curated collection of reusable, codebase-agnostic prompts for common software development tasks. Use these prompts with AI assistants to improve code quality, add tests, refactor, and more.

## Overview

A comprehensive collection of prompts to help you with every stage of software development - from starting new projects to improving existing codebases.

These prompts are designed to be:

- **Reusable**: Work with any codebase, language, or framework
- **Comprehensive**: Based on industry best practices and proven methodologies
- **Actionable**: Provide clear, step-by-step guidance
- **Versatile**: Help with existing codebases, new projects, and bootstrapping
- **Structured**: Follow consistent formats for easy adoption

### Use Cases

- **Starting New Projects**: Bootstrap with best practices using the [Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md)
- **Improving Existing Code**: Refactor, optimize, and secure your current codebase
- **Code Reviews**: Use as comprehensive checklists for reviewing pull requests
- **Learning**: Follow the learning paths to master software development best practices
- **Team Standards**: Establish coding standards and best practices across your team

## Available Prompts

### 🚀 Project Setup

- **[Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md)** - Bootstrap new projects with best practices from day one. Covers technology stack selection, development environment setup, tooling configuration, and production-ready configurations for popular stacks (Next.js + Firebase, Go + PostgreSQL, Python + FastAPI).

### 🎨 Code Quality & Refactoring

- **[Clean Code Refactoring](prompts/clean-code-refactoring.md)** - Transform your codebase into clean, professional code based on Robert C. Martin's "Clean Code" principles. Covers naming, functions, comments, formatting, classes, and code smells.

- **[Code Cleanup & Simplification](prompts/code-cleanup-simplification.md)** - Eliminate technical debt by removing dead code, unused dependencies, legacy features, and over-engineered solutions. Includes detection tools, cleanup strategies, and simplification patterns for all major languages.

### 🧪 Testing

- **[Test-Driven Development (TDD)](prompts/test-driven-development.md)** - Add comprehensive tests to existing code using characterization tests and TDD principles. Based on Kent Beck's TDD methodology with practical patterns for legacy code.

- **[Test Improvement Guide](prompts/test-improvement-guide.md)** - Analyze and improve existing test suites. Identify coverage gaps, eliminate flaky tests, and enhance test quality and maintainability.

### 🔌 API Design

- **[API Design Principles](prompts/api-design-principles.md)** - Design APIs that are intuitive, consistent, and future-proof. Covers RESTful design, versioning, authentication, pagination, error handling, and documentation.

### 🔒 Security

- **[Security Best Practices](prompts/security-best-practices.md)** - Build secure systems that protect user data and prevent attacks. Comprehensive coverage of OWASP Top 10, input validation, authentication, encryption, and security headers.

### ⚡ Performance

- **[Performance Optimization](prompts/performance-optimization.md)** - Build fast, efficient systems that scale gracefully. Covers frontend optimization, backend performance, database tuning, caching strategies, and monitoring.

### 🏗️ Architecture & Design

- **[Domain-Driven Design (DDD)](prompts/domain-driven-design.md)** - Create software that models complex business domains with precision. Covers ubiquitous language, bounded contexts, entities, value objects, aggregates, and strategic design.

### 🤝 Collaboration

- **[Code Review Best Practices](prompts/code-review-best-practices.md)** - Improve code quality and foster collaborative team culture through effective code reviews. Covers what to look for, how to give feedback, and building review culture.

### 📚 Documentation

- **[Documentation Consolidation & Cleanup](prompts/documentation-consolidation.md)** - Audit existing documentation, consolidate duplicate content, remove obsolete information, and ensure all documentation accurately reflects the current codebase. Covers documentation discovery, analysis, consolidation strategies, and maintenance best practices.

### 💻 Frameworks & Languages

- **[Next.js Best Practices](prompts/nextjs-best-practices.md)** - Analyze and optimize Next.js applications. Covers App Router, data fetching strategies, performance optimization, SEO, and production readiness.

- **[Golang Best Practices](prompts/golang-best-practices.md)** - Analyze Go code for idiomatic patterns, concurrency bugs, performance issues, and production readiness. Includes error handling, testing, and tooling.

### 🛠️ Development Tools

- **[Claude Code Skills Setup](prompts/claude-code-skills-setup.md)** - Create custom Claude Code skills for your codebase. Includes role-based skills (reviewer, tester, architect, security auditor), skill templates for all major languages/frameworks, and implementation guides. Automates repetitive tasks and codifies team best practices.

- **[Prompt Engineering Refinement](prompts/prompt-engineering-refinement.md)** - Analyze and optimize AI prompts for clarity, effectiveness, and consistent results. Covers the 5 core elements of prompts, common problems, refinement process, quality metrics, and advanced techniques. Includes templates for code review, bug analysis, and feature implementation prompts.

### ☁️ Cloud & Infrastructure

- **[Firebase Integration Best Practices](prompts/firebase-integration-best-practices.md)** - Audit and optimize Firebase implementations. Covers security rules, Firestore optimization, authentication, Cloud Functions, and cost reduction.

- **[Google Cloud Best Practices](prompts/google-cloud-best-practices.md)** - Analyze and optimize GCP deployments. Covers IAM, cost optimization, compute services, databases, monitoring, and security.

### 🔄 DevOps & CI/CD

- **[CI/CD Workflows for Full-Stack Applications](prompts/cicd-workflows.md)** - Set up automated build, test, and deployment pipelines. Covers GitHub Actions, GitLab CI, deployment strategies (blue-green, canary), rollback mechanisms, environment management, and monitoring for full-stack applications.

## How to Use

1. **Choose a prompt** that matches your task
2. **Copy the entire prompt** content
3. **Paste it into your AI assistant** conversation (Claude, GPT, etc.)
4. **Provide context** about your codebase
5. **Let the AI guide you** through the process

### Example Usage

```text
[Paste the Clean Code Refactoring prompt]

Now analyze this codebase and help me refactor it:
[Your code or repository context]
```

### Why These Prompts Matter in the AI Age

In the era of AI code generation, these prompts are **MORE relevant than ever**:

- **Better AI Prompting**: Use these as frameworks to get better output from AI coding assistants
- **Code Review**: AI generates code fast - you still need to review it for quality, security, and performance
- **Architecture Decisions**: AI can write code, but you still need to make architectural choices
- **Team Standards**: Establish consistent patterns that both humans and AI should follow
- **Learning**: Understanding these principles helps you write better prompts and evaluate AI-generated code

**The shift**: From "writing all code yourself" → "reviewing, guiding, and architecting with AI assistance"

### Practical Examples

#### Example 1: Starting a New Next.js + Firebase Project

1. Use [Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md) to set up the project with best practices
2. Apply [Next.js Best Practices](prompts/nextjs-best-practices.md) for App Router patterns
3. Use [Firebase Integration Best Practices](prompts/firebase-integration-best-practices.md) for secure setup
4. Follow [Security Best Practices](prompts/security-best-practices.md) from day one

#### Example 2: Refactoring Legacy Code

1. Use [Clean Code Refactoring](prompts/clean-code-refactoring.md) to identify smells and improve structure
2. Apply [Security Best Practices](prompts/security-best-practices.md) to fix vulnerabilities
3. Use [TDD](prompts/test-driven-development.md) to add tests for refactored code
4. Optimize with [Performance Optimization](prompts/performance-optimization.md)

#### Example 3: Building a New API

1. Use [API Design Principles](prompts/api-design-principles.md) to design endpoints
2. Apply [Security Best Practices](prompts/security-best-practices.md) for authentication and validation
3. Use [Performance Optimization](prompts/performance-optimization.md) to ensure scalability
4. Follow [Golang Best Practices](prompts/golang-best-practices.md) if using Go

#### Example 4: Code Review

1. Use [Code Review Best Practices](prompts/code-review-best-practices.md) as a checklist
2. Reference [Clean Code](prompts/clean-code-refactoring.md) for readability issues
3. Check [Security Best Practices](prompts/security-best-practices.md) for vulnerabilities
4. Verify [Test Improvement Guide](prompts/test-improvement-guide.md) for test quality

#### Example 5: Setting Up Production-Ready CI/CD

1. Use [Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md) to set up project structure
2. Apply [CI/CD Workflows](prompts/cicd-workflows.md) to automate testing and deployment
3. Follow [Security Best Practices](prompts/security-best-practices.md) for vulnerability scanning
4. Use [Test Improvement Guide](prompts/test-improvement-guide.md) to ensure comprehensive test coverage in pipeline

#### Example 6: Maintaining Documentation

1. Use [Documentation Consolidation](prompts/documentation-consolidation.md) to audit all project documentation
2. Identify and remove stale/obsolete documentation
3. Consolidate duplicate information into single sources of truth
4. Verify all code examples work with current codebase
5. Set up automated documentation checks in CI/CD

#### Example 7: Reducing Technical Debt

1. Use [Code Cleanup & Simplification](prompts/code-cleanup-simplification.md) to identify dead code and unused dependencies
2. Remove commented-out code and legacy features
3. Simplify over-engineered abstractions
4. Consolidate duplicate code
5. Set up automated dead code detection in CI/CD
6. Measure bundle size reduction and performance improvements

#### Example 8: Setting Up Custom Claude Code Skills

1. Use [Claude Code Skills Setup](prompts/claude-code-skills-setup.md) to analyze your codebase
2. Create role-based skills (code reviewer, test generator, security auditor)
3. Customize skills with your tech stack and conventions
4. Test skills on real code from your project
5. Document skills for team adoption
6. Measure productivity improvements and iterate

#### Example 9: Improving AI Prompts

1. Use [Prompt Engineering Refinement](prompts/prompt-engineering-refinement.md) to analyze your existing prompts
2. Rate prompts on the 7 quality dimensions
3. Identify vague instructions, missing context, or unclear output formats
4. Apply refinement techniques (add examples, specify constraints, improve structure)
5. Test refined prompts and measure consistency
6. Create reusable prompt templates for your team

## Quick Reference Guide

| Your Situation | Recommended Prompt |
| --- | --- |
| Starting a new project | [Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md) |
| Code is hard to read and maintain | [Clean Code Refactoring](prompts/clean-code-refactoring.md) |
| Codebase has unused code and complexity | [Code Cleanup & Simplification](prompts/code-cleanup-simplification.md) |
| Need to add tests to existing code | [Test-Driven Development](prompts/test-driven-development.md) |
| Tests are flaky or have poor coverage | [Test Improvement Guide](prompts/test-improvement-guide.md) |
| Reviewing or improving existing APIs | [API Design Principles](prompts/api-design-principles.md) |
| Security audit or handling sensitive data | [Security Best Practices](prompts/security-best-practices.md) |
| Application is slow or needs scaling | [Performance Optimization](prompts/performance-optimization.md) |
| Modeling complex business logic | [Domain-Driven Design](prompts/domain-driven-design.md) |
| Reviewing pull requests | [Code Review Best Practices](prompts/code-review-best-practices.md) |
| Documentation is outdated or duplicated | [Documentation Consolidation](prompts/documentation-consolidation.md) |
| Optimizing Next.js application | [Next.js Best Practices](prompts/nextjs-best-practices.md) |
| Reviewing Go code | [Golang Best Practices](prompts/golang-best-practices.md) |
| Need custom Claude Code commands | [Claude Code Skills Setup](prompts/claude-code-skills-setup.md) |
| AI prompts producing unclear results | [Prompt Engineering Refinement](prompts/prompt-engineering-refinement.md) |
| Auditing Firebase integration | [Firebase Integration Best Practices](prompts/firebase-integration-best-practices.md) |
| Optimizing Google Cloud deployment | [Google Cloud Best Practices](prompts/google-cloud-best-practices.md) |
| Setting up CI/CD pipeline | [CI/CD Workflows](prompts/cicd-workflows.md) |

## Learning Path

### For Beginners

1. **[Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md)** - Start projects the right way
2. **[Clean Code Refactoring](prompts/clean-code-refactoring.md)** - Foundation for all good code
3. **[Test-Driven Development](prompts/test-driven-development.md)** - Build quality from the start
4. **[Code Review Best Practices](prompts/code-review-best-practices.md)** - Learn to evaluate code

### For Intermediate Developers

1. **[API Design Principles](prompts/api-design-principles.md)** - Build interfaces others will use
2. **[Security Best Practices](prompts/security-best-practices.md)** - Protect your users
3. **[Performance Optimization](prompts/performance-optimization.md)** - Make it fast
4. **[Code Cleanup & Simplification](prompts/code-cleanup-simplification.md)** - Eliminate technical debt
5. **[Documentation Consolidation](prompts/documentation-consolidation.md)** - Maintain accurate, useful documentation
6. **[CI/CD Workflows](prompts/cicd-workflows.md)** - Automate your deployments
7. **[Next.js Best Practices](prompts/nextjs-best-practices.md)** or **[Golang Best Practices](prompts/golang-best-practices.md)** - Master your framework

### For Advanced Developers

1. **[Domain-Driven Design](prompts/domain-driven-design.md)** - Master complex business domains
2. **[Google Cloud Best Practices](prompts/google-cloud-best-practices.md)** - Build scalable cloud infrastructure

## Contributing

Have a great reusable prompt? Contributions are welcome! We'd love to expand this collection with more comprehensive, high-quality prompts.

**See our [Contributing Guide](CONTRIBUTING.md)** for detailed instructions on:

- What makes a good prompt
- Template and structure to follow
- Style guide and code examples
- Submission process
- 30+ prompt ideas we'd love to see

### Quick Contribution Steps

1. Read the [Contributing Guide](CONTRIBUTING.md)
2. Create a new prompt file in the `prompts/` directory following the template
3. Add your prompt to this README under the appropriate category
4. Test your prompt with an AI assistant
5. Submit a pull request

We're particularly interested in prompts for:

- **Development Practices**: Git workflows, microservices, event-driven architecture, pair programming
- **Languages & Frameworks**: Python, TypeScript, React, Vue.js, Django, Spring Boot
- **Infrastructure**: Docker, Kubernetes, AWS, Azure, Terraform
- **Data & Backend**: PostgreSQL, MongoDB, GraphQL, message queues
- **Specialized Topics**: Machine learning, blockchain, serverless, WebAssembly

See the full list in [CONTRIBUTING.md](CONTRIBUTING.md).

<!-- PROMPT_STATS_START -->

## Prompt Statistics

Auto-generated summary of all prompts in this repository.

| Prompt | Lines | Words | Tokens (est.) | Size |
|--------|------:|------:|--------------:|-----:|
| [Api Design Principles](prompts/api-design-principles.md) | 984 | 3070 | 5750 | 22.4 KB |
| [Cicd Workflows](prompts/cicd-workflows.md) | 1300 | 3897 | 8505 | 33.2 KB |
| [Claude Code Skills Setup](prompts/claude-code-skills-setup.md) | 152 | 549 | 921 | 3.5 KB |
| [Clean Code Refactoring](prompts/clean-code-refactoring.md) | 496 | 2325 | 3852 | 15.0 KB |
| [Code Cleanup Simplification](prompts/code-cleanup-simplification.md) | 191 | 759 | 1376 | 5.3 KB |
| [Code Review Best Practices](prompts/code-review-best-practices.md) | 127 | 513 | 905 | 3.5 KB |
| [Company Research Scorecard](prompts/company-research-scorecard.md) | 306 | 1172 | 1682 | 6.5 KB |
| [Documentation Consolidation](prompts/documentation-consolidation.md) | 817 | 2976 | 5213 | 20.3 KB |
| [Domain Driven Design](prompts/domain-driven-design.md) | 1227 | 3705 | 7955 | 31.0 KB |
| [Firebase Integration Best Practices](prompts/firebase-integration-best-practices.md) | 960 | 3208 | 6355 | 24.8 KB |
| [Golang Best Practices](prompts/golang-best-practices.md) | 723 | 2323 | 3931 | 15.3 KB |
| [Google Cloud Best Practices](prompts/google-cloud-best-practices.md) | 750 | 2488 | 4849 | 18.9 KB |
| [Nextjs Best Practices](prompts/nextjs-best-practices.md) | 973 | 2885 | 5588 | 21.8 KB |
| [Performance Optimization](prompts/performance-optimization.md) | 1175 | 4165 | 7534 | 29.4 KB |
| [Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md) | 1263 | 3480 | 7070 | 27.6 KB |
| [Prompt Engineering Refinement](prompts/prompt-engineering-refinement.md) | 688 | 2362 | 3864 | 15.0 KB |
| [Security Best Practices](prompts/security-best-practices.md) | 172 | 704 | 1382 | 5.3 KB |
| [Startup Due Diligence](prompts/startup-due-diligence.md) | 354 | 1390 | 1950 | 7.6 KB |
| [Test Driven Development](prompts/test-driven-development.md) | 885 | 3089 | 5326 | 20.8 KB |
| [Test Improvement Guide](prompts/test-improvement-guide.md) | 788 | 2807 | 5140 | 20.0 KB |
| **Total** | **14331** | **47867** | **89148** | **348.2 KB** |

*Token count is estimated based on ~4 characters per token.*

<!-- PROMPT_STATS_END -->

## Credits

These prompts are based on seminal works and industry best practices:

- **Robert C. Martin** - "Clean Code" and clean code principles
- **Kent Beck** - "Test Driven Development: By Example"
- **Eric Evans** - "Domain-Driven Design"
- **OWASP Foundation** - Security best practices and Top 10 vulnerabilities
- **Industry standards** - RESTful API design, performance optimization, code review practices

## License

MIT

---

**Remember**: These prompts are guides, not rigid rules. Adapt them to your context, team, and needs. The goal is better software and stronger teams.
