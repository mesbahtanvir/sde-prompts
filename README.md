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

### 💻 Frameworks & Languages

- **[Next.js Best Practices](prompts/nextjs-best-practices.md)** - Analyze and optimize Next.js applications. Covers App Router, data fetching strategies, performance optimization, SEO, and production readiness.

- **[Golang Best Practices](prompts/golang-best-practices.md)** - Analyze Go code for idiomatic patterns, concurrency bugs, performance issues, and production readiness. Includes error handling, testing, and tooling.

### ☁️ Cloud & Infrastructure

- **[Firebase Integration Best Practices](prompts/firebase-integration-best-practices.md)** - Audit and optimize Firebase implementations. Covers security rules, Firestore optimization, authentication, Cloud Functions, and cost reduction.

- **[Google Cloud Best Practices](prompts/google-cloud-best-practices.md)** - Analyze and optimize GCP deployments. Covers IAM, cost optimization, compute services, databases, monitoring, and security.

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

## Quick Reference Guide

| Your Situation | Recommended Prompt |
| --- | --- |
| Starting a new project | [Project Bootstrapping Guide](prompts/project-bootstrapping-guide.md) |
| Code is hard to read and maintain | [Clean Code Refactoring](prompts/clean-code-refactoring.md) |
| Need to add tests to existing code | [Test-Driven Development](prompts/test-driven-development.md) |
| Tests are flaky or have poor coverage | [Test Improvement Guide](prompts/test-improvement-guide.md) |
| Reviewing or improving existing APIs | [API Design Principles](prompts/api-design-principles.md) |
| Security audit or handling sensitive data | [Security Best Practices](prompts/security-best-practices.md) |
| Application is slow or needs scaling | [Performance Optimization](prompts/performance-optimization.md) |
| Modeling complex business logic | [Domain-Driven Design](prompts/domain-driven-design.md) |
| Reviewing pull requests | [Code Review Best Practices](prompts/code-review-best-practices.md) |
| Optimizing Next.js application | [Next.js Best Practices](prompts/nextjs-best-practices.md) |
| Reviewing Go code | [Golang Best Practices](prompts/golang-best-practices.md) |
| Auditing Firebase integration | [Firebase Integration Best Practices](prompts/firebase-integration-best-practices.md) |
| Optimizing Google Cloud deployment | [Google Cloud Best Practices](prompts/google-cloud-best-practices.md) |

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
4. **[Next.js Best Practices](prompts/nextjs-best-practices.md)** or **[Golang Best Practices](prompts/golang-best-practices.md)** - Master your framework

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

- **Development Practices**: CI/CD, Git workflows, microservices, event-driven architecture
- **Languages & Frameworks**: Python, TypeScript, React, Vue.js, Django, Spring Boot
- **Infrastructure**: Docker, Kubernetes, AWS, Azure, Terraform
- **Data & Backend**: PostgreSQL, MongoDB, GraphQL, message queues
- **Specialized Topics**: Machine learning, blockchain, serverless, WebAssembly

See the full list in [CONTRIBUTING.md](CONTRIBUTING.md).

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
