# Content Guidelines for zk.ninja

Welcome to the content creation guide for zk.ninja! This document outlines the conventions and best practices for creating and formatting content for our platform. Following these guidelines ensures consistency and quality across all educational materials.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [File Naming Conventions](#file-naming-conventions)
3. [Content Formatting](#content-formatting)
4. [Quiz Creation](#quiz-creation)
5. [Writing Style](#writing-style)
6. [Cryptography-Specific Guidelines](#cryptography-specific-guidelines)

## Directory Structure

- `/book/content`: This directory contains all the main content files.
- `/book/quiz`: This directory contains all the quiz files.

## File Naming Conventions

### Content Files

Content files should be named using the following format:
```
section-subsection-title.mdx
```
For example: `01-02-group.mdx`

- `section` and `subsection` should be 2-digit integers.
- Use hyphens (-) to separate words in the title.

### Quiz Files

Quiz files should be named using the following format:
```
section-subsection.yaml
```
The `section-subsection` part should match the corresponding content file.

## Content Formatting

- Use `.mdx` extension for content files.
- Content files support normal Markdown syntax.
- To include a quiz in your content, use the following syntax:
  ```
  <Quiz id="xxxx" />
  ```
  Replace "xxxx" with the actual quiz ID.

## Quiz Creation

Quizzes are defined in YAML files in the `/book/quiz` directory. Each quiz must have a unique `id` that matches the one used in the content file.

### Quiz Types

zk.ninja supports four types of quizzes:

1. Choice Quiz
2. Open-Ended Quiz
3. Random Quiz
4. Student-Teacher Chat Quiz

### Common Quiz Properties

All quiz types share these properties:
- `id`: Unique identifier (string)
- `kind`: Type of quiz (string, one of: "choice", "open-ended", "random", "student-teacher-chat")

### Choice Quiz

```yaml
id: unique-id
kind: choice
question: "How many elements are in $G$?"
clarification: "$G$ is some group."
distractors:
  - "1"
  - "2"
  - "3"
  - "4"
answers: 
  - "5"
```

- `question`: The question to ask
- `clarification`: Optional text to clarify the question
- `distractors`: List of wrong answers
- `answers`: Correct answer(s). Can be a single answer or a list.

### Open-Ended Quiz

```yaml
id: unique-id
kind: open-ended
question: "Explain the concept of a group."
clarification: "$G$ is some group."
context: "Group theory is a branch of mathematics that studies the algebraic structure known as a group."
```

- `question`: The question to ask
- `clarification`: Optional text to clarify the question
- `context`: Additional context for AI grading

### Random Quiz

```yaml
id: unique-id
kind: random
label: "Are you ready to take more quiz?"
context: "Provide a question related to property of $G$."
```

- `label`: Optional label for the quiz before the generated question
- `context`: Additional context for AI to generate questions

### Student-Teacher Chat Quiz

```yaml
id: unique-id
kind: student-teacher-chat
topic: "Set, Group, and Modulo operation"
firstMessage: "Hey! :blush: So, we're diving into {topic} today, huh? Cool!"
section: false
context: "Direct conversation in line of how $G$ is related to $H$."
```

- `topic`: The topic of the quiz
- `firstMessage`: Optional first message from the student
- `section`: Whether to include all chapters of the section in the quiz reference content (default: false)
- `context`: Additional context for AI to guide the conversation

## Writing Style

- Use clear, concise language.
- Explain complex concepts step-by-step.
- Use examples to illustrate points.
- Define all technical terms and acronyms on first use.

## Cryptography-Specific Guidelines

- Use standard notation for cryptographic algorithms and protocols.
- Include visual aids (diagrams, charts) for complex processes when possible.
- Highlight security considerations and potential vulnerabilities.
- Provide context for how and when to use specific cryptographic techniques.

Remember, these guidelines are here to help maintain quality and consistency. If you have suggestions for improving these guidelines, please open an issue or submit a pull request.

Happy content creating!