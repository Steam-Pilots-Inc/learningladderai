# Contributing

Thanks for helping improve Learning Ladder AI! Follow these guidelines to keep changes easy to review.

1. **Set up tooling**
   - Use the provided `.editorconfig` and run Prettier or your editor's formatter before committing frontend changes.
   - For backend edits, run `pytest` to keep the CLI helpers covered.

2. **Branching**
   - Create feature branches from `main` with descriptive names (e.g. `feature/chatbot-auth`).

3. **Commits**
   - Keep commits focused and include context in the message (what changed and why).

4. **Pull Requests**
   - Summarise the change, include screenshots for UI work, and mention test coverage or manual validation steps.

5. **Secrets**
   - Never commit `.env` files or API keys. Use `.env.example` as reference.
