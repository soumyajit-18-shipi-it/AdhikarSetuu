# AGENTS.md

# AdhikarSetu – Agent Instructions

This document provides guidance for AI coding agents contributing to the AdhikarSetu repository.

---

## Project Overview

AdhikarSetu is a civic-tech platform that helps MSMEs:

1. Discover eligible government schemes.
2. Estimate missed financial benefits.
3. Understand application rejection notices.
4. Provide exclusion analytics for policymakers.

The project consists of:

* FastAPI backend
* Next.js frontend
* Static JSON datasets
* AI-assisted rejection analysis

---

## Repository Structure

```text
adhikarsetu/
├── backend/
│   ├── app/
│   ├── data/
│   └── tests/
│
├── docs/
│
└── frontend/
    ├── frontend/      # Actual Next.js application
    └── services/
```

Important:

* Backend root = `backend/app`
* Frontend root = `frontend/frontend`

Do not assume the first `frontend/` directory is the Next.js app.

---

## Core Features

### Incentive Discovery

Matches MSME profiles with schemes.

Relevant areas:

```text
backend/app/services/
backend/data/schemes.json
```

---

### Benefit Loss Calculator

Calculates cumulative benefits from matched schemes.

Relevant areas:

```text
backend/app/services/
frontend/frontend/app/calculator/
```

---

### AI Rejection Explainer

Processes uploaded rejection notices and returns:

* Rejection reason
* Explanation
* Suggested fixes
* Checklist

Relevant areas:

```text
backend/app/services/
frontend/frontend/app/rejection/
```

---

### Policymaker Dashboard

Displays district-level analytics.

Relevant areas:

```text
backend/data/mock_msmes.json
backend/data/districts.json
frontend/frontend/app/policymaker/
```

---

## Development Principles

### Keep Changes Small

Prefer focused pull requests.

Good:

* Add one API endpoint.
* Improve one dashboard.
* Fix one bug.

Avoid:

* Large repository-wide refactors.
* Reorganizing directories.

---

### Preserve Existing APIs

Before modifying endpoints:

* Check frontend usage.
* Maintain backward compatibility whenever possible.

If breaking changes are required:

* Update all affected frontend calls.

---

### Reuse Existing Components

Before creating new UI components:

Check:

```text
frontend/frontend/components/
```

Reuse existing patterns where possible.

---

## Backend Guidelines

### Framework

* FastAPI
* Pydantic

### Preferred Structure

```text
api/routes/
schemas/
services/
models/
```

Business logic belongs in:

```text
services/
```

Keep route handlers thin.

---

### Data Files

Current datasets are stored as JSON.

Examples:

```text
backend/data/schemes.json
backend/data/mock_msmes.json
```

Do not introduce database dependencies unless explicitly required.

---

## Frontend Guidelines

### Framework

* Next.js
* TypeScript
* Tailwind CSS

### Page Locations

```text
app/dashboard/
app/profile/
app/calculator/
app/rejection/
app/policymaker/
```

### UI

Prefer:

* Existing UI components
* Consistent spacing
* Mobile responsiveness

Avoid introducing additional UI libraries.

---

## Testing Checklist

Before submitting changes:

### Backend

* API starts successfully.
* No schema validation errors.
* Existing endpoints remain functional.

### Frontend

* Build completes successfully.
* No TypeScript errors.
* Pages render without runtime errors.

---

## Preferred Improvements

High-value contributions include:

### Scheme Engine

* Better eligibility rules
* Additional schemes
* Improved matching logic

### Rejection Analysis

* Better prompt engineering
* Improved OCR handling
* Structured output validation

### Dashboard

* Better visualizations
* Filtering
* Export functionality

### Accessibility

* Keyboard navigation
* Color contrast
* Screen-reader support

### Documentation

* README improvements
* API examples
* Deployment instructions

---

## Avoid

Do not:

* Remove existing features.
* Rename directories without necessity.
* Commit secrets or credentials.
* Hardcode API keys.
* Introduce heavy infrastructure dependencies.

---

## Success Criteria

A contribution is successful if it:

1. Improves user value.
2. Preserves existing functionality.
3. Follows repository structure.
4. Is understandable by future contributors.
5. Can be demonstrated during a hackathon presentation.

```
```
