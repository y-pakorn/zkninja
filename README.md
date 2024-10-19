# zk.ninja

## Description

[zk.ninja](https://zk.ninja/) is an open-source, AI-assisted active learning platform for cryptography education. It uses language models to create interactive learning experiences that aim to help users better understand cryptographic concepts.

The platform is built on the principle that active engagement with the material leads to improved comprehension and retention of cryptographic principles.

As an open-source project, zk.ninja welcomes contributions from developers, educators, and cryptography enthusiasts to help improve and expand this educational resource.

## Features

1. **Markdown-Based Content**: The entire site, including quizzes, is rendered from markdown files. This makes it easy to add, edit, and manage content without deep technical knowledge. (Though let's face it, if you're into cryptography, you're probably already swimming in technical knowledge deeper than the Mariana Trench.)

2. **Multiple Choice Quizzes**: Test your knowledge with multiple-choice questions on various cryptography topics.

3. **AI-Powered Grading**: An AI model evaluates responses to both expert-written and AI-generated open-ended questions, providing detailed feedback to help users improve their understanding and expression of complex topics.

4. **Dynamic AI-Generated Quizzes**: The system can generate custom quizzes based on the educational content, with the ability to adjust difficulty levels and focus areas to suit individual learning needs.

5. **Teach the AI**: Explain cryptographic concepts to an AI that asks follow-up questions. This feature is designed to reinforce understanding through explanation.

6. **Active Learning Approach**: Features are designed to encourage user engagement with the material.

7. **AI-Assisted Interactions**: Uses language models to provide responsive feedback and adaptable learning experiences.

8. **Cryptography Curriculum**: Covers various aspects of cryptography, from basic principles to more advanced topics.

9. **Open-Source Codebase**: Allows for community-driven improvements and adaptability.

## Contributing

We welcome contributions to help improve and expand zk.ninja. Here are some ways you can contribute:

- **Code**: Help improve existing features or implement new ones.
- **Content**: Contribute to the question bank or help refine the curriculum. With our markdown-based system, you can easily add new quizzes and educational content.
- **Documentation**: Improve project documentation.
- **Bug Reports and Feature Requests**: Report issues or suggest enhancements.
- **UI/UX**: Help make the platform more user-friendly.

For more details on how to contribute, please check our [CONTRIBUTING.md](CONTRIBUTING.md) file. This guide includes information on our code of conduct, development process, and how to submit contributions.

We appreciate all contributions and are committed to maintaining an open and collaborative community around zk.ninja.


## Run locally

```bash
cp .env.example .env.local
```

```bash
pnpm install
```

```bash
pnpm dev
```
