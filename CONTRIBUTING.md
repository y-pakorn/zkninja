# Contributing to zk.ninja

First off, thank you for considering contributing to zk.ninja! It's people like you that make zk.ninja such a great tool for learning cryptography.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How Can I Contribute?](#how-can-i-contribute)
4. [Style Guides](#style-guides)
5. [Community](#community)

## Code of Conduct

We're all here to learn, create, and help each other. So let's keep it simple: be respectful, be patient, and be helpful. Treat others as you'd like to be treated. If you see behavior that doesn't align with these principles, please reach out to the project maintainers. Let's work together to keep zk.ninja a positive and inclusive space for everyone.

## Getting Started

- Make sure you have a [GitHub account](https://github.com/signup)
- Fork the repository on GitHub
- Clone your fork locally
- Set up the development environment (instructions in [README.md](README.md))

## How Can I Contribute?

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/y-pakorn/zk.ninja/issues)
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/y-pakorn/zk.ninja/issues/new)

### Suggesting Enhancements

- Open a new issue with a clear title and detailed description

### Pull Requests

1. Create a new branch from `main` for your feature or bugfix
2. Make your changes
3. Add or update relevant tests
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue a pull request

### Adding or Modifying Content

Since our platform renders content from markdown files:

1. Navigate to the appropriate content directory
2. Create or modify the relevant markdown file
3. Follow the [content style guide](#content-style-guide)
4. Submit a pull request with your changes

## Style Guides

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

- Use the format: `<type>(<scope>): <subject>`
- `<type>` must be one of the following:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation only changes
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `perf`: A code change that improves performance
  - `test`: Adding missing tests or correcting existing tests
  - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation
- `<scope>` is optional and represents the section of the codebase
- `<subject>` is a succinct description of the change:
  - Use the imperative, present tense: "change" not "changed" nor "changes"
  - Don't capitalize the first letter
  - No dot (.) at the end

Examples:
```
feat(quiz): add AI-generated question feature
fix(grading): correct scoring algorithm for open-ended questions
docs(readme): update installation instructions
```

### Content Style Guide

- Use clear, concise language
- Break complex ideas into digestible chunks
- Include examples where appropriate
- For quizzes:
  - Ensure questions are unambiguous
  - Provide comprehensive explanations for correct answers
