# 🚀 [Project Name]: Civic Intelligence for MSMEs
> **Automating MSME subsidy discovery and compliance. Because businesses shouldn't need expensive consultants just to claim what is rightfully theirs.**

## 💡 The Problem: The B2B Policy Gap
Platforms like **myScheme** have revolutionized welfare discovery for individual citizens. However, there is no such unified, intelligent platform for **businesses and MSMEs**. 

Currently, navigating corporate subsidies, capital incentives, and export schemes is a bureaucratic nightmare. As a result, businesses are forced to rely on **expensive, manual consulting firms** just to find out what they are eligible for—or worse, they abandon the process entirely and leave millions on the table.

## 🎯 Our Solution
**[Project Name]** replaces costly manual consultants with an AI-driven civic tech platform. We help businesses discover incentives, quantify their financial losses from inaction, and decode complex government rejections into actionable steps.

---

## ⚙️ Core Modules

### 1️⃣ Module 1: B2B Incentive Discovery
A streamlined matching engine tailored exclusively for business profiles.
* **Inputs:** Business type, Annual Turnover, State, Employee Count, GST Status, Exporter Status, Woman-led indicator.
* **Outputs:** Curated list of eligible corporate schemes and subsidies.
* *Example Matches:* PMFME, CGTMSE, ZED Certification, State Industrial Subsidy.

### 2️⃣ Module 2: The Loss Calculator 
Instead of a generic "You are eligible" message, we quantify the cost of inaction. By framing unclaimed subsidies as a tangible financial loss, we drive immediate action.

| Scheme | Potential Value |
| :--- | :--- |
| Capital Subsidy | ₹ 5,00,000 |
| Interest Subsidy | ₹ 3,00,000 |
| Electricity Reimbursement | ₹ 2,00,000 |
| Export Incentive | ₹ 2,50,000 |
| **Total Estimated Missed Benefit** | **₹ 12,50,000 over 3 years** |

### 3️⃣ Module 3: AI Rejection Explainer
When businesses apply and get rejected, they are met with dense government jargon. Users can upload a Rejection PDF or notice screenshot, and our AI acts as a digital consultant to translate and fix it.

| Govt Reason (Jargon) | Human Explanation (Plain English) | Action Required (Fix Checklist) |
| :--- | :--- | :--- |
| Udyam details mismatch | Business details differ from your Udyam certificate. | Update Udyam portal to match current address. |
| GST inactive flag | Your GST status is currently showing as inactive. | File pending GST returns to reactivate. |
| Missing Annexure-II | You forgot to attach the required financial form. | Download Annexure-II, sign, and re-upload. |

### 4️⃣ Module 4: MSME Exclusion Detector (Civic Intelligence)
Built for policymakers. By aggregating search and rejection data, we map out which districts are experiencing structural exclusions from government benefits.
* **Output:** 🟢 High utilization zones vs. 🔴 High exclusion zones.
* **Impact:** Shifts the platform from a simple search tool into high-level **Civic Intelligence** for government nodal agencies.

---

## 💻 Tech Stack
* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Python (FastAPI)
* **Database:** PostgreSQL (Supabase)
* **AI & Document Parsing:** OpenAI/Gemini API, PyMuPDF
* **Deployment:** Vercel (Frontend), Railway/Render (Backend)

## 🛠️ Local Setup
1. Clone the repository:
   ```bash
   git clone [https://gitlab.com/yourusername/projectname.git](https://gitlab.com/yourusername/projectname.git)