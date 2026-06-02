# AdhikarSetu

## Overview

**AdhikarSetu** is an AI-powered civic-tech platform that helps MSMEs discover government benefits, estimate missed incentives, understand application rejections, and identify policy-level exclusion gaps.

Many small businesses are unaware of schemes they qualify for, struggle with compliance requirements, or abandon applications after receiving complex rejection notices. AdhikarSetu simplifies access to public benefits through eligibility matching, loss estimation, AI-assisted guidance, and policymaker analytics.

### Live Demo

Frontend: https://adhikarsetu.vercel.app/

API Documentation: https://civictech-hackathon.onrender.com/docs

---

## Problem Statement

MSMEs frequently face three major challenges:

* Lack of awareness about eligible government schemes.
* Difficulty understanding rejection notices and compliance requirements.
* Limited visibility for policymakers into underserved regions and participation gaps.

As a result, substantial financial support remains unclaimed and many businesses are excluded from available opportunities.

---

## Solution

AdhikarSetu provides four core capabilities:

### 1. Incentive Discovery Engine

Matches MSME profiles against government schemes and identifies relevant benefits.

**Inputs**

* Business sector
* Turnover
* GST status
* Export status
* Ownership details
* District

**Output**

* Eligible schemes
* Estimated benefits
* Eligibility rationale

### 2. Benefit Loss Calculator

Estimates the potential value of incentives that an MSME may be missing.

**Output**

* Total potential benefits
* Missed opportunities
* Benefit summary dashboard

### 3. AI Rejection Explainer

Uses OCR and LLM-based analysis to convert complex rejection notices into simple actionable guidance.

**Output**

* Rejection reason
* Plain-language explanation
* Required corrections
* Compliance checklist

### 4. Exclusion Analytics Dashboard

Helps policymakers identify districts with low participation and approval rates.

**Output**

* Participation trends
* Approval statistics
* High-exclusion regions
* Policy insights

---

## Architecture

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts

### Backend

* FastAPI
* Pydantic
* Python

### AI Layer

* OCR-based document extraction
* LLM-powered rejection analysis

### Data Layer

* Scheme dataset
* District dataset
* Mock MSME participation data

---

## Repository Structure

```text
adhikarsetu/
├── backend/                 # FastAPI backend
│   ├── app/
│   ├── data/
│   └── tests/
│
├── frontend/
│   ├── package.json
│   ├── frontend/            # Actual Next.js application
│   └── services/
│
├── docs/
├── README.md
└── requirements.txt
```

### Important Notes

* FastAPI application entry point: `backend/app`
* Next.js application root: `frontend/frontend`

---

## Getting Started

### Backend

```bash
cd backend

pip install -r ../requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

API docs:

```text
http://localhost:8000/docs
```

### Frontend

```bash
cd frontend/frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## Key Features Demonstrated

* Scheme eligibility matching
* Benefit estimation
* AI-powered rejection interpretation
* District-level exclusion analytics
* Responsive dashboard experience
* Civic-tech focused decision support

---

## Impact

### For MSMEs

* Discover eligible government benefits.
* Reduce application errors.
* Improve compliance readiness.
* Increase benefit utilization.

### For Policymakers

* Monitor regional participation gaps.
* Identify underserved districts.
* Improve outreach effectiveness.
* Support evidence-based policy decisions.

---

## Future Enhancements

* Real-time government scheme integration.
* Multilingual support.
* Aadhaar/Udyam verification workflows.
* Application tracking system.
* Recommendation personalization.
* State-wise policy analytics.

---

## Security

See [SECURITY.md](./SECURITY.md) for the responsible disclosure process and security hardening.

## CI/CD

This repository includes GitLab CI jobs for linting, testing, and security scanning. See [.gitlab-ci.yml](./.gitlab-ci.yml) for details.

---

## License

This project is licensed under the **GNU Affero General Public License (AGPL) v3**. See [LICENSE](./LICENSE) for the full license text.

---

## Team

Built for the Civic Tech Hackathon to improve access, transparency, and utilization of public welfare programs for MSMEs.

