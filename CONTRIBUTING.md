# Contributing

Thanks for your interest in improving BladeRunner.

## Getting Started

1. Clone the repository.
2. Follow the run instructions in the root `README.md`.
3. Make your changes in a focused branch.

## Branch Naming

Use short, descriptive branch names:

* `feat/<short-description>`
* `fix/<short-description>`
* `docs/<short-description>`
* `chore/<short-description>`

## Commit Message Format

Keep commit messages concise and imperative:

* `docs: reorganize repo documentation`
* `chore: add root gitignore and ci workflow`
* `fix: correct carriage status handling`

## Pull Requests

When opening a PR:

1. Explain what changed and why.
2. List how you tested the change.
3. Include screenshots or recordings for UI changes.

## Linting, Formatting, and Tests

Run these before submitting a PR:

```bash
npm --prefix website/code run lint
npm --prefix website/code run format
npm --prefix website/code run test
npm --prefix website/code run build
```
