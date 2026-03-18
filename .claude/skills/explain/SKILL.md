---
name: explain
description: Explain code, a file, or a concept in simple terms. Use when you need to understand what something does or how it works.
user-invocable: true
allowed-tools: Read, Grep, Glob
argument-hint: "[file path, function name, or concept]"
---

# Explain

Explain in simple, clear language: $ARGUMENTS

## Rules for explaining

1. **No jargon without definition.** If you use a technical term, immediately explain it in parentheses.
2. **Use analogies.** Compare code concepts to real-world things.
3. **Start with the "what" before the "how".** First say what this code accomplishes, then explain how.
4. **Be specific.** Reference actual file names, line numbers, and variable names.
5. **Show the flow.** If explaining a feature, walk through what happens step by step when a user interacts with it.

## Format

### What is this?
(1-2 sentences: what this code/file/concept does, in plain language)

### How does it work?
(Step-by-step walkthrough. Use numbered steps.)

### Why is it done this way?
(Explain the reasoning behind the approach)

### Key things to know
(Bullet points of important details, gotchas, or things that might be confusing)

### Related files
(List other files that connect to this one and how they relate)
