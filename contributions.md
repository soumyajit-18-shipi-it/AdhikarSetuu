# CONTRIBUTIONS.md

# AdhikarSetu – Contribution Guidelines

Thank you for your interest in contributing to **AdhikarSetu**!
This document outlines how developers, designers, and contributors can safely improve the repository.

---

## Table of Contents

1. How to Contribute
2. Branching & Pull Requests
3. Code Standards
4. Feature Guidelines
5. Testing
6. Reporting Issues
7. Best Practices

---

## 1. How to Contribute

### Steps

1. **Fork the repository** and clone locally.
2. Create a **new branch** for your feature/fix.
3. Make your changes.
4. Test locally (frontend and backend).
5. Submit a **Pull Request** to the main repository.

### Communication

* Use clear commit messages describing changes.
* Link issues or tasks when applicable.
* Add reviewers if unsure.

---

## 2. Branching & Pull Requests

### Branch Naming

* Features: `feature/<short-description>`
* Bugfixes: `bugfix/<short-description>`
* Experiments: `experiment/<short-description>`

### Pull Request Guidelines

* PR title should be concise and descriptive.
* Include screenshots or examples for UI changes.
* Reference relevant issues (if any).
* Ensure all tests pass before merging.

---

## 3. Code Standards

### Backend

* Language: Python 3.x
* Framework: FastAPI
* Use **Pydantic** for schemas.
* Keep route handlers thin; place logic in `services/`.

### Frontend

* Language: TypeScript
* Framework: Next.js
* Styling: Tailwind CSS
* Follow existing component patterns under `components/`.

### General

* Use meaningful variable names.
* Write inline comments for complex logic.
* Avoid committing secrets or `.env` files.

---

## 4. Feature Guidelines

### High-Impact Contributions

* Adding new government schemes to `schemes.json`.
* Enhancing the **Incentive Discovery Engine**.
* Improving AI Rejection Explainer accuracy.
* Upgrading **dashboard visualizations** or analytics.
* Accessibility improvements (keyboard navigation, screen readers, color contrast).

### Avoid

* Breaking existing APIs without frontend updates.
* Large-scale refactors during hackathon.
* Introducing heavy dependencies or new frameworks.

---

## 5. Testing

### Backend

* Run the FastAPI app locally.
* Use `pytest` for unit tests under `backend/tests/`.
* Ensure API endpoints respond correctly.

### Frontend

* Run `npm run dev` and verify UI.
* Ensure forms, dashboards, and calculators work correctly.
* Check responsiveness on mobile and desktop.

---

## 6. Reporting Issues

* Use GitHub Issues to report bugs or propose enhancements.
* Provide:

  * Steps to reproduce
  * Expected vs. actual behavior
  * Screenshots if applicable
* Tag issues clearly: `bug`, `enhancement`, `question`.

---

## 7. Best Practices

* **Keep Pull Requests small**: One logical change per PR.
* **Document changes**: Update README, USER_MANUAL.md, or AGENTS.md if needed.
* **Collaborate actively**: Communicate with other contributors to avoid duplicate work.
* **Demo readiness**: Ensure new features are presentable for hackathon judges.

---

> Thank you for helping AdhikarSetu improve access to government benefits for MSMEs. Every contribution makes the platform more effective and user-friendly!
