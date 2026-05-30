# Adhikar Setu - Backend Requirements Document (Reverse-Engineered from Frontend)

## 1) Application Structure

### 1.1 Routes and Purpose

| Route | Page Name | Purpose | Primary Actor |
|---|---|---|---|
| `/` | Landing | Product pitch, feature discovery, CTA to start profile or policymaker mode | MSME owner, policymaker |
| `/profile` | MSME Profile Form | Collect business profile for eligibility matching | MSME owner |
| `/dashboard` | Incentive Discovery Dashboard | Show eligible/partial/ineligible schemes with filters and benefit summary | MSME owner |
| `/calculator` | Financial Loss Calculator | Show 3-year missed-benefit projection with charts and breakdown | MSME owner |
| `/rejection` | AI Rejection Explainer | Upload rejection doc and view plain-language explanation + fix checklist | MSME owner |
| `/policymaker` | MSME Exclusion Analytics | District-level participation/exclusion analytics and risk heatmap | Policymaker |

### 1.2 User Journey (End-to-End)

1. User lands on `/` and clicks **Check My Eligibility**.
2. User fills `/profile` (8 fields) and submits.
3. Frontend routes to `/dashboard` and shows scheme matches plus max benefit.
4. User can open `/calculator` to view aggregate and scheme-wise 3-year impact.
5. If rejected in real life, user opens `/rejection`, uploads notice, gets AI explanation and action checklist.
6. Policymakers use `/policymaker` for district risk monitoring and intervention planning.

---

## 2) Feature Inventory

| Feature | Purpose | Inputs | Outputs | Components / Pages | Static vs Dynamic |
|---|---|---|---|---|---|
| MSME Profile Capture | Collect eligibility inputs | Business profile fields | Profile object used by matcher | `/profile` | Should be dynamic (backend-backed) |
| Incentive Discovery | Match schemes by profile | Profile + scheme rule engine | Scheme cards with eligibility states | `/dashboard` | Should be dynamic |
| Scheme Search + Status Filters | Narrow scheme list | Query text, status filter | Filtered scheme list | `/dashboard` | Dynamic list + client-side filter |
| Benefit Summary Cards | At-a-glance counts/value | Matched schemes | Total schemes, eligible count, partial count, max benefit | `/dashboard` | Dynamic |
| 3-Year Loss Calculator | Quantify missed benefits | Matched schemes + projections | Total, yearly, cumulative, pie share, row breakdown | `/calculator` | Dynamic |
| Rejection Explainer | Decode rejection document | Uploaded file | Summary, reasons, severities, fixes checklist | `/rejection` | Dynamic |
| Checklist Progress Tracker | Track remediation | Required fixes + checked state | Progress % and completion state | `/rejection` | Mixed (backend + local UI state) |
| Policymaker Exclusion Analytics | Detect district exclusion | District MSME metrics | KPI cards, risk chart, heatmap, recommendations | `/policymaker` | Dynamic |
| Navigation + CTA Flows | Move between modules | Route actions | Page transitions | `Navbar`, all pages | Static routes |

---

## 3) Data Requirements by Page/Module

## 3.1 Landing (`/`)

### Displayed data
- Hero text, feature descriptions, stats, process steps.

### Backend requirement
- Optional for demo. Can remain static.
- Optional endpoint if CMS-driven later.

### Suggested JSON (optional)
```json
{
  "hero": {
    "title": "Discover Government Benefits Your Business Is Missing",
    "subtitle": "AI-powered incentive discovery and compliance intelligence for MSMEs."
  },
  "stats": [
    { "value": "10,000+", "label": "MSMEs Analyzed" },
    { "value": "₹847 Cr", "label": "Benefits Identified" }
  ],
  "features": [
    { "key": "discovery", "title": "Incentive Discovery", "description": "..." }
  ]
}
```

## 3.2 Profile (`/profile`)

### Displayed data
- Sector dropdown options.
- District dropdown options.
- Form completion progress.

### Backend needed
- `GET /api/meta/sectors`
- `GET /api/meta/districts?state=Telangana`
- `POST /api/profile/assess` (or direct `POST /api/schemes/match`)

### JSON contracts
```json
{
  "business_name": "Sri Lakshmi Textiles Pvt. Ltd.",
  "sector": "Manufacturing",
  "annual_turnover_band": "1cr-5cr",
  "annual_turnover": 35000000,
  "employees_band": "21-50",
  "employees": 32,
  "gst_registered": true,
  "exporter": false,
  "women_owned": true,
  "district": "Hyderabad"
}
```

## 3.3 Dashboard (`/dashboard`)

### Displayed data
- Summary cards: total schemes, eligible count, partial count, max benefit.
- Scheme cards with status, ministry, category, description, potential benefit.
- Search/filter by status and keyword.

### Backend needed
- Match results from profile.
- Queryable scheme list for search/filter if server-side filtering is preferred.

### JSON response
```json
{
  "summary": {
    "total_schemes": 10,
    "eligible_count": 7,
    "partial_count": 2,
    "ineligible_count": 1,
    "max_benefit": 3680000
  },
  "schemes": [
    {
      "id": "cgtmse",
      "name": "CGTMSE",
      "full_name": "Credit Guarantee Fund Trust for Micro and Small Enterprises",
      "category": "Credit & Finance",
      "ministry": "Ministry of MSME",
      "potential_benefit": 500000,
      "benefit_type": "Collateral-free Credit",
      "eligibility_status": "eligible",
      "description": "Provides collateral-free credit up to ₹2 crore.",
      "eligibility_criteria": ["Micro/Small Enterprise"],
      "application_url": "https://...",
      "deadline": "2025-03-31",
      "beneficiaries": 3200000
    }
  ]
}
```

## 3.4 Calculator (`/calculator`)

### Displayed data
- Total potential missed support.
- Year1/Year2/Year3 cards.
- Cumulative area chart.
- Scheme-wise yearly bar chart.
- Contribution pie chart.
- Row-level table breakdown.

### Backend needed
- Deterministic projection from matched schemes.

### JSON response
```json
{
  "total_potential": 1250000,
  "yearly_totals": {
    "year1": 470000,
    "year2": 500000,
    "year3": 280000
  },
  "cumulative_chart": [
    { "period": "Month 3", "amount": 180000 },
    { "period": "Month 6", "amount": 380000 },
    { "period": "Year 3", "amount": 1250000 }
  ],
  "breakdown": [
    { "scheme": "CGTMSE", "year1": 120000, "year2": 180000, "year3": 200000, "total": 500000 }
  ],
  "pie_data": [
    { "name": "CGTMSE", "value": 500000, "color": "#1a4fa0" }
  ]
}
```

## 3.5 Rejection Explainer (`/rejection`)

### Displayed data
- Uploaded document metadata.
- AI summary.
- Reason cards with severity.
- Required fixes checklist.

### Backend needed
- File upload + extraction + AI explanation service.

### JSON response
```json
{
  "analysis_id": "rej_2026_0001",
  "document": {
    "name": "Application_Rejection.pdf",
    "mime_type": "application/pdf",
    "size_bytes": 24576,
    "uploaded_at": "2026-05-30T10:20:00Z"
  },
  "summary": "Your application was rejected due to 3 missing or incorrect documents.",
  "reasons": [
    {
      "id": 1,
      "title": "GST Certificate Missing",
      "original": "NON-SUBMISSION OF MANDATORY DOCUMENTS",
      "plain": "You did not attach your GST Registration Certificate.",
      "severity": "critical",
      "fix": "Download GST certificate and attach as PDF."
    }
  ],
  "required_fixes": [
    { "id": 1, "text": "Attach GST certificate", "completed": false }
  ],
  "estimated_resolution_days": 3
}
```

## 3.6 Policymaker (`/policymaker`)

### Displayed data
- KPI cards: registered/submitted/approved/avg participation.
- District participation chart.
- Exclusion burden chart.
- Risk heatmap cards per district.
- Recommendation cards.

### Backend needed
- District-level aggregates and computed risk labels.

### JSON response
```json
{
  "kpis": {
    "registered_msmes": 107660,
    "applications_submitted": 71110,
    "approved_applications": 55340,
    "avg_participation_rate": 57.6
  },
  "districts": [
    {
      "id": "khammam",
      "name": "Khammam",
      "registered_msmes": 12340,
      "applications_submitted": 3890,
      "approved_applications": 2340,
      "participation_rate": 31.5,
      "approval_rate": 60.15,
      "exclusion_risk": "high",
      "participation_level": "High Exclusion Risk",
      "requires_attention": true,
      "top_sector": "Agro-processing",
      "fund_utilization": 28
    }
  ],
  "recommendations": [
    {
      "district_id": "khammam",
      "priority": "urgent",
      "title": "Urgent: Khammam Outreach",
      "description": "Launch targeted MSME camps in Khammam district with DIC support."
    }
  ]
}
```

---

## 4) Forms Analysis

## 4.1 MSME Profile Form

### Fields, Types, Validations

| Field | Type | Validation |
|---|---|---|
| `business_name` | string | required, min 2, max 120 |
| `sector` | enum/string | required, must be in sector catalog |
| `annual_turnover_band` | enum | required (`under-5l`, `5l-25l`, `25l-1cr`, `1cr-5cr`, `5cr-10cr`, `above-10cr`) |
| `annual_turnover` | number | required, >= 0 (recommended normalized numeric) |
| `employees_band` | enum | required (`1-5`, `6-20`, `21-50`, `51-100`, `101-250`, `above-250`) |
| `employees` | number | required, >= 1 |
| `gst_registered` | boolean | required |
| `exporter` | boolean | required |
| `women_owned` | boolean | required |
| `district` | string | required, Telangana district list |

### Expected request payload
```json
{
  "business_name": "ABC Industries",
  "sector": "Manufacturing",
  "annual_turnover_band": "1cr-5cr",
  "annual_turnover": 5000000,
  "employees_band": "21-50",
  "employees": 30,
  "gst_registered": true,
  "exporter": false,
  "women_owned": true,
  "district": "Hyderabad"
}
```

## 4.2 Rejection Upload Form

### Fields, Types, Validations

| Field | Type | Validation |
|---|---|---|
| `file` | binary | required |
| `mime_type` | inferred | allow `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `image/jpeg`, `image/png` |
| `max_size_mb` | policy | recommended <= 10MB |

### Expected request (multipart)
- `POST /api/rejection/explain`
- Content-Type: `multipart/form-data`
- Form key: `file`

### Expected response
- Analysis payload shown in section 3.5.

---

## 5) Dashboard/Widget API Mapping

## 5.1 Incentive Dashboard (`/dashboard`)

| Widget | Endpoint | Response fields |
|---|---|---|
| Summary cards | `POST /api/schemes/match` | `summary.total_schemes`, `eligible_count`, `partial_count`, `max_benefit` |
| Scheme listing cards | `POST /api/schemes/match` | `schemes[]` |
| Search/filter support | `GET /api/schemes` (optional) | query-driven paginated list |

## 5.2 Loss Calculator (`/calculator`)

| Widget | Endpoint | Response fields |
|---|---|---|
| Hero total + yearly cards | `POST /api/loss/calculate` | `total_potential`, `yearly_totals` |
| Cumulative chart | `POST /api/loss/calculate` | `cumulative_chart[]` |
| Annual breakdown chart | `POST /api/loss/calculate` | `breakdown[]` |
| Pie contribution | `POST /api/loss/calculate` | `pie_data[]` |
| Table breakdown | `POST /api/loss/calculate` | `breakdown[]` with `total` |

## 5.3 Rejection Explainer (`/rejection`)

| Widget | Endpoint | Response fields |
|---|---|---|
| Upload + document metadata | `POST /api/rejection/explain` | `document.*` |
| AI summary/reasons/fixes | `POST /api/rejection/explain` | `summary`, `reasons[]`, `required_fixes[]` |

## 5.4 Policymaker (`/policymaker`)

| Widget | Endpoint | Response fields |
|---|---|---|
| Top KPI cards | `GET /api/analytics/exclusion` | `kpis.*` |
| District participation chart | `GET /api/analytics/exclusion` | `districts[].registered_msmes`, `applications_submitted`, `approved_applications` |
| Exclusion burden chart | `GET /api/analytics/exclusion` | derived `excluded = registered - submitted` |
| Heatmap cards | `GET /api/analytics/exclusion` | risk and district detail fields |
| Attention banner | `GET /api/analytics/exclusion` | first `requires_attention=true` district |

---

## 6) File Upload Analysis

## 6.1 Upload Types Observed in Frontend
- PDF (`application/pdf`)
- DOCX (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)
- JPG/JPEG (`image/jpeg`)
- PNG is not explicitly shown in text but should be accepted for robustness.

## 6.2 Required Backend Endpoint
`POST /api/rejection/explain` (multipart)

## 6.3 Expected Upload Response
```json
{
  "analysis_id": "rej_123",
  "rejection_reason": "GST certificate missing",
  "plain_english": "Your application was rejected because GST proof was not attached.",
  "required_documents": ["GST Certificate"],
  "fix_checklist": [
    "Upload GST Certificate",
    "Verify GST Number",
    "Resubmit Application"
  ]
}
```

---

## 7) Complete API Requirements (FastAPI Spec)

## 7.1 Health and Metadata

### `GET /`
Purpose: health check.

Response:
```json
{ "status": "running", "service": "Adhikar Setu API" }
```

### `GET /api/meta/sectors`
Purpose: sector dropdown values.

Response:
```json
{
  "sectors": ["Manufacturing", "Food Processing", "Textiles & Apparel"]
}
```

### `GET /api/meta/districts?state=Telangana`
Purpose: district dropdown values.

Response:
```json
{ "districts": ["Hyderabad", "Warangal", "Khammam"] }
```

## 7.2 Schemes and Matching

### `POST /api/schemes/match`
Purpose: compute eligibility and return dashboard-ready data.

Request:
```json
{
  "business_name": "ABC Industries",
  "sector": "Manufacturing",
  "annual_turnover": 5000000,
  "employees": 30,
  "gst_registered": true,
  "exporter": false,
  "women_owned": true,
  "district": "Hyderabad"
}
```

Response:
```json
{
  "summary": {
    "total_schemes": 10,
    "eligible_count": 7,
    "partial_count": 2,
    "ineligible_count": 1,
    "max_benefit": 3680000
  },
  "eligible_schemes": [
    {
      "id": "cgtmse",
      "name": "CGTMSE",
      "category": "Credit & Finance",
      "eligibility_status": "eligible",
      "potential_benefit": 500000,
      "description": "..."
    }
  ]
}
```

### `GET /api/schemes`
Purpose: optional full scheme catalog with filters.

Query params:
- `status`: `eligible|partial|ineligible`
- `q`: keyword
- `district`, `sector` (optional)
- `limit`, `offset`

Response:
```json
{
  "items": [],
  "total": 0,
  "limit": 20,
  "offset": 0
}
```

## 7.3 Loss Calculator

### `POST /api/loss/calculate`
Purpose: compute financial opportunity projections.

Request:
```json
{
  "business_name": "ABC Industries",
  "sector": "Manufacturing",
  "annual_turnover": 5000000,
  "employees": 30,
  "gst_registered": true,
  "exporter": false,
  "women_owned": true,
  "district": "Hyderabad"
}
```

Response:
```json
{
  "total_potential": 1250000,
  "yearly_totals": { "year1": 470000, "year2": 500000, "year3": 280000 },
  "cumulative_chart": [{ "period": "Month 3", "amount": 180000 }],
  "breakdown": [{ "scheme": "CGTMSE", "year1": 120000, "year2": 180000, "year3": 200000, "total": 500000 }],
  "pie_data": [{ "name": "CGTMSE", "value": 500000, "color": "#1a4fa0" }]
}
```

## 7.4 Rejection Explainer

### `POST /api/rejection/explain`
Purpose: upload rejection notice and generate AI explanation.

Request: multipart with `file`.

Response:
```json
{
  "analysis_id": "rej_123",
  "summary": "Your application was rejected due to 3 missing or incorrect documents.",
  "reasons": [
    {
      "id": 1,
      "title": "GST Certificate Missing",
      "severity": "critical",
      "plain": "...",
      "fix": "..."
    }
  ],
  "required_fixes": [
    { "id": 1, "text": "Upload GST certificate", "completed": false }
  ]
}
```

### `GET /api/rejection/{analysis_id}` (optional)
Purpose: fetch previous analysis for persistence/reload.

## 7.5 Policymaker Analytics

### `GET /api/analytics/exclusion`
Purpose: district participation and exclusion analytics.

Response:
```json
{
  "kpis": {
    "registered_msmes": 107660,
    "applications_submitted": 71110,
    "approved_applications": 55340,
    "avg_participation_rate": 57.6
  },
  "districts": [],
  "high_exclusion_zones": [
    { "district": "Khammam", "exclusion_rate": 68.5, "participation_rate": 31.5 }
  ],
  "recommendations": []
}
```

---

## 8) Database Requirements

## 8.1 Core Entities

1. `msme_profiles`
- `id` (uuid, pk)
- `business_name` (text)
- `sector` (text)
- `annual_turnover` (numeric)
- `annual_turnover_band` (text)
- `employees` (int)
- `employees_band` (text)
- `gst_registered` (bool)
- `exporter` (bool)
- `women_owned` (bool)
- `district` (text)
- `created_at`, `updated_at`

2. `schemes`
- `id` (text, pk)
- `name` (text)
- `full_name` (text)
- `category` (text)
- `ministry` (text)
- `benefit_type` (text)
- `potential_benefit` (numeric)
- `description` (text)
- `eligibility_rules` (jsonb)
- `application_url` (text)
- `deadline` (date/text)
- `beneficiaries` (int)

3. `scheme_matches`
- `id` (uuid, pk)
- `profile_id` (fk -> msme_profiles.id)
- `scheme_id` (fk -> schemes.id)
- `eligibility_status` (enum)
- `score` (numeric/int)
- `reasons` (jsonb)
- `computed_at` (timestamp)

4. `loss_calculations`
- `id` (uuid, pk)
- `profile_id` (fk)
- `total_potential` (numeric)
- `year1`, `year2`, `year3` (numeric)
- `breakdown` (jsonb)
- `computed_at` (timestamp)

5. `rejection_analyses`
- `id` (uuid, pk)
- `profile_id` (nullable fk)
- `document_name` (text)
- `storage_path` (text)
- `mime_type` (text)
- `summary` (text)
- `reasons` (jsonb)
- `required_fixes` (jsonb)
- `created_at` (timestamp)

6. `district_metrics`
- `id` (uuid, pk)
- `district` (text)
- `registered_msmes` (int)
- `applications_submitted` (int)
- `approved_applications` (int)
- `participation_rate` (numeric)
- `approval_rate` (numeric)
- `fund_utilization` (numeric)
- `snapshot_date` (date)

## 8.2 Relationships
- One `msme_profile` -> many `scheme_matches`.
- One `scheme` -> many `scheme_matches`.
- One `msme_profile` -> many `loss_calculations` (versioned runs).
- One `msme_profile` -> many `rejection_analyses` (optional linkage).
- `district_metrics` independent, time-series for policymaker analytics.

## 8.3 Hackathon-friendly storage option
- Keep `schemes`, `district_metrics`, mock MSME datasets as JSON seed files initially.
- Persist profiles, matches, analyses in SQLite/Postgres as needed.

---

## 9) Backend Modules / Service Architecture

```text
app/
  api/
    routes/
      health.py
      meta.py
      schemes.py
      loss.py
      rejection.py
      analytics.py
  schemas/
    profile.py
    scheme.py
    loss.py
    rejection.py
    analytics.py
  services/
    scheme_matcher.py
    loss_calculator.py
    rejection_parser.py
    ai_explainer.py
    analytics_engine.py
    metadata_service.py
  repositories/
    scheme_repository.py
    profile_repository.py
    analytics_repository.py
  core/
    config.py
    data_loader.py
    exceptions.py
```

## 9.1 Service Responsibilities

- `scheme_matcher.py`
  - Rule-based eligibility scoring.
  - Classifies `eligible` / `partial` / `ineligible`.

- `loss_calculator.py`
  - Computes yearly and cumulative opportunity projections.
  - Produces chart-ready structures.

- `rejection_parser.py`
  - Handles file text extraction (PDF/DOCX/image OCR adapter).

- `ai_explainer.py`
  - Converts extracted text into summary, reasons, and fix checklist.
  - Abstract provider interface to swap Gemini/OpenAI.

- `analytics_engine.py`
  - Computes district KPIs, risk levels, high exclusion zones, recommendations.

- `metadata_service.py`
  - Serves sectors and districts catalogs.

---

## 10) Implementation Priority

## P0 (Must Have - hackathon demo minimum)

1. `GET /` health check.
2. `POST /api/schemes/match` with profile payload.
3. `POST /api/loss/calculate` chart-ready response.
4. `POST /api/rejection/explain` mocked AI response from uploaded file.
5. `GET /api/analytics/exclusion` district KPI + high exclusion zones.
6. Seeded data: schemes + districts + mock MSME analytics dataset.

## P1 (Important)

1. `GET /api/meta/sectors` and `GET /api/meta/districts`.
2. Persist profile and analysis records (SQLite/Postgres).
3. Server-side search/pagination for schemes.
4. Improved validation and normalized enum handling.

## P2 (Nice to Have)

1. Real OCR pipeline and LLM integration (Gemini/OpenAI).
2. Auth + role separation (MSME vs policymaker).
3. District trend/time-series endpoints.
4. Notification/workflow integration for reapplication reminders.

## Minimum backend needed for successful demo
- P0 only is sufficient to power all frontend screens with realistic data and interactions.

---

## 11) Final Endpoint List (Quick Reference)

- `GET /`
- `GET /api/meta/sectors`
- `GET /api/meta/districts`
- `POST /api/schemes/match`
- `GET /api/schemes` (optional for filters/search)
- `POST /api/loss/calculate`
- `POST /api/rejection/explain`
- `GET /api/rejection/{analysis_id}` (optional)
- `GET /api/analytics/exclusion`

---

## 12) Notes from Reverse Engineering

- Frontend currently uses local mock data and no active API calls.
- Current frontend upload helper text says `PDF, DOCX, JPG`; backend should align to avoid UX mismatch.
- Dashboard and calculator are tightly coupled; both should accept the same profile identity and share a consistent scheme ID model.
- Policymaker page expects district-level computed labels, not just raw counts.
