# EMIKETIC Meteor

An opinionated starter template reflecting EMIKETIC's Meteor standard and other React / JavaScript conventions.

# JavaScript Conventions

The following conventions are mandatory for developers and staff at EMIKETIC.

If you're forking or using this template for your own project or team, we recommend you stick to them. Otherwise you can alter their behavior through the various configuration files (*`*rc.js`\* files)

## Linting and formatting

- Uses ESLint and Prettier working in pair together
- Linting and formatting are enforced (won't compile unless addressed)
- Formatting/Linting is automatically processed on saving files. If linting errors remain unresolved, commit won't go through
- In fact, linting and formatting tasks are also
  installed as a pre-commit hook through Husky

## Committing code

- Follows the [_Conventional Committing_](https://www.conventionalcommits.org/en/v1.0.0/) standard

  - Feature example: `git commit -m "feat: Closes ISS-1. Ability to login with Apple"`
  - Patch example: `git commit -m "fix: Closes ISS-2 and corrects scrolling bug"`
  - Major/Breaking change example: `git commit -m "BREAKING CHANGE: Updated Meteor version"`
  - Combines feature and breaking change:
  - Major/Breaking change example:

    `git commit -m "feat: Closes ISS-1. Ability to login with Apple BREAKING CHANGE: Updated Meteor version"`

  - Commits not impacting versioning:
    - Regular / casual example: `git commit -m "chore: ISS-4 Installed dependencies"`
    - Refactoring example: `git commit -m "refactoring: Refactored component"`
    - Other commit types: _build:, chore:, ci:, docs:, style:, refactor:, perf:, test_

- The standard is linted and Husky will prevent commits from going through if it's not compliant
- Project managers/owners can release satisfying updates and issue version bumps thanks to [standard-version](https://github.com/conventional-changelog/standard-version) by running `yarn release`. This will generate:
- Appropriate tags based on the conventional commit history
- An aggregated `CHANGELOG.md` file update.

## VSCode workspace presets

This template assumes developers are using Microsoft Visual Studio code for an optimized team experience. It contains the following defaults;

- Debugger configurations for Android and iOS
- A list of recommended EMIKETIC extensions for JavaScript and React developers (appears under the _Recommended_ filter in _Extensions_)
- Linting and formatting rules
- Spellcheck additions for common development words in English

Besides, `.editorconfig` contains default rules for file formats, end of files/lines and indentations.

# Meteor Conventions

## Overview

- `autopublish` and `insecure` are removed.
- _WIP_

## Folder structure

_WIP_

# Setup instructions

Just like any other Meteor project:

- `meteor npm run install`
- `meteor`
