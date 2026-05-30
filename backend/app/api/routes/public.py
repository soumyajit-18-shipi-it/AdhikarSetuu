from __future__ import annotations

from typing import Any
from datetime import datetime

from fastapi import APIRouter, File, HTTPException, UploadFile

from ...core.data_loader import load_districts, load_schemes
from ...schemas.schemes import SchemeMatchRequest
from ...services.ai_explainer import AIExplainer
from ...services.loss_calculator import LossCalculator
from ...services.ocr_service import OCRService
from ...services.scheme_matcher import SchemeMatcher


router = APIRouter(tags=["public"])
matcher = SchemeMatcher()
loss_calculator = LossCalculator(matcher)
ocr_service = OCRService()
ai_explainer = AIExplainer()

SECTORS = [
    "Manufacturing",
    "Food Processing",
    "Textiles & Apparel",
    "IT & Software Services",
    "Agro-processing",
    "Pharmaceuticals",
    "Engineering & Metal Works",
    "Handicrafts & Artisans",
    "Retail & Trading",
    "Construction & Infrastructure",
]


def _success(data: Any) -> dict[str, Any]:
    return {"success": True, "data": data}


def _normalize_scheme(scheme: dict[str, Any], status: str | None = None) -> dict[str, Any]:
    normalized = {
        "id": str(scheme.get("id", "")).lower(),
        "name": scheme.get("name", ""),
        "fullName": scheme.get("full_name") or scheme.get("fullName") or scheme.get("name", ""),
        "category": scheme.get("category", ""),
        "ministry": scheme.get("ministry", ""),
        "potentialBenefit": int(scheme.get("potential_benefit", scheme.get("benefit_amount", 0)) or 0),
        "benefitType": scheme.get("benefit_type", scheme.get("benefitType", "")),
        "description": scheme.get("description", ""),
        "eligibilityCriteria": scheme.get("eligibility_criteria", scheme.get("eligibilityCriteria", [])),
        "applicationUrl": scheme.get("application_url", scheme.get("applicationUrl", "#")),
        "deadline": scheme.get("deadline", "Rolling"),
        "beneficiaries": int(scheme.get("beneficiaries", 0) or 0),
    }
    if status:
        normalized["eligibilityStatus"] = status
    return normalized


def _project_scheme(scheme: dict[str, Any]) -> dict[str, Any]:
    total = int(scheme.get("potential_benefit", scheme.get("benefit_amount", 0)) or 0)
    year1 = int(total * 0.4)
    year2 = int(total * 0.35)
    year3 = int(total * 0.25)
    return {
        "scheme": scheme.get("name", ""),
        "year1": year1,
        "year2": year2,
        "year3": year3,
        "total": year1 + year2 + year3,
    }


def _build_loss_payload(matched: list[Any]) -> dict[str, Any]:
    items: list[dict[str, Any]] = []
    total_potential = 0

    for scheme in matched:
        if hasattr(scheme, "model_dump"):
            payload = scheme.model_dump()
        elif hasattr(scheme, "dict"):
            payload = scheme.dict()
        else:
            payload = dict(getattr(scheme, "__dict__", scheme))

        projected = _project_scheme(payload)
        items.append(projected)
        total_potential += projected["total"]

    cumulative = []
    checkpoints = [3, 6, 9, 12, 24, 36]
    running = 0
    previous = 0
    per_month = int(total_potential / max(checkpoints[-1], 1)) if checkpoints else total_potential

    for checkpoint in checkpoints:
        delta = checkpoint - previous
        running = min(total_potential, running + per_month * delta)
        cumulative.append({"period": f"Month {checkpoint}", "amount": running})
        previous = checkpoint

    pie = []
    colors = ["#1a4fa0", "#d4a017", "#2a7d4f", "#c0392b", "#6c3483", "#2c3e50"]
    for index, item in enumerate(items):
        pie.append({"name": item["scheme"], "value": item["total"], "color": colors[index % len(colors)]})

    return {
        "totalPotential": total_potential,
        "breakdown": items,
        "cumulativeChart": cumulative,
        "pieData": pie,
    }


@router.get("/schemes")
async def get_schemes() -> dict[str, Any]:
    return _success([_normalize_scheme(scheme) for scheme in load_schemes()])


@router.get("/schemes/{scheme_id}")
async def get_scheme(scheme_id: str) -> dict[str, Any]:
    scheme = next((item for item in load_schemes() if str(item.get("id", "")).lower() == scheme_id.lower()), None)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return _success(_normalize_scheme(scheme))


@router.post("/eligibility/check")
async def check_eligibility(payload: SchemeMatchRequest) -> dict[str, Any]:
    all_schemes = load_schemes()
    matched = matcher.match(payload)
    matched_ids = {scheme.id.lower() for scheme in matched}

    schemes: list[dict[str, Any]] = []
    eligible_count = 0
    partial_count = 0

    for scheme in all_schemes:
        scheme_id = str(scheme.get("id", "")).lower()
        status = "eligible" if scheme_id in matched_ids else "ineligible"
        if status == "eligible":
            eligible_count += 1
        elif str(scheme.get("category", "")).lower() in {"technology upgrade", "export & marketing"}:
            status = "partial"
            partial_count += 1

        schemes.append(_normalize_scheme(scheme, status=status))

    loss = _build_loss_payload(matched)
    summary = {
        "total_schemes": len(all_schemes),
        "eligible_count": eligible_count,
        "partial_count": partial_count,
        "ineligible_count": len(all_schemes) - eligible_count - partial_count,
        "max_benefit": max((int(s.get("potential_benefit", 0) or 0) for s in all_schemes), default=0),
    }

    return _success({"summary": summary, "schemes": schemes, "loss": loss})


@router.get("/rejection-reasons")
async def get_rejection_reasons() -> dict[str, Any]:
    return _success([
        {
            "id": 1,
            "title": "GST Certificate Missing",
            "original": "NON-SUBMISSION OF MANDATORY DOCUMENTS",
            "plain": "GST registration proof is required for the selected scheme.",
            "severity": "critical",
            "fix": "Attach a valid GST certificate.",
        },
        {
            "id": 2,
            "title": "Udyam Registration Mismatch",
            "original": "UDYAM REGISTRATION DISCREPANCY",
            "plain": "Your Udyam details do not match the declared business category.",
            "severity": "critical",
            "fix": "Verify your NIC code and update the application.",
        },
        {
            "id": 3,
            "title": "Bank Statement Missing",
            "original": "BANK STATEMENT DEFICIT",
            "plain": "Bank statements for the required period were not provided.",
            "severity": "moderate",
            "fix": "Upload the last two years of certified bank statements.",
        },
    ])


@router.get("/user/profile")
async def get_user_profile() -> dict[str, Any]:
    return _success(
        {
            "business_name": "",
            "sector": "",
            "annual_turnover": 0,
            "employees": 0,
            "gst_registered": False,
            "exporter": False,
            "women_owned": False,
            "district": "",
        }
    )


@router.get("/metadata/districts")
async def metadata_districts() -> dict[str, Any]:
    return _success(load_districts())


@router.get("/metadata/sectors")
async def metadata_sectors() -> dict[str, Any]:
    return _success(SECTORS)


@router.get("/analytics/exclusion")
async def analytics_exclusion() -> dict[str, Any]:
    districts = [
        {
            "id": "hyderabad",
            "name": "Hyderabad",
            "registeredMSMEs": 2500,
            "applicationsSubmitted": 2200,
            "approvedApplications": 1900,
            "participationRate": 88,
            "exclusionRisk": "low",
            "participationLevel": "High Participation",
            "requiresAttention": False,
            "topSector": "IT Services",
            "fundUtilization": 91,
        },
        {
            "id": "khammam",
            "name": "Khammam",
            "registeredMSMEs": 1700,
            "applicationsSubmitted": 540,
            "approvedApplications": 320,
            "participationRate": 32,
            "exclusionRisk": "high",
            "participationLevel": "High Exclusion Risk",
            "requiresAttention": True,
            "topSector": "Agro-processing",
            "fundUtilization": 29,
        },
    ]

    return _success(
        {
            "kpis": {
                "registered_msmes": 10000,
                "applications_submitted": 5200,
                "approved_applications": 3100,
                "avg_participation_rate": 52.0,
            },
            "districts": districts,
            "high_exclusion_zones": [{"district": "Khammam", "exclusion_rate": 0.68, "participation_rate": 0.32}],
            "recommendations": [
                {
                    "district_id": "khammam",
                    "priority": "urgent",
                    "title": "Urgent: Khammam Outreach",
                    "description": "Launch targeted MSME camps with DIC support to increase participation.",
                }
            ],
        }
    )


@router.post("/rejection/explain")
async def rejection_explain(file: UploadFile = File(...)) -> dict[str, Any]:
    allowed_types = {
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
    }
    allowed_suffixes = {".pdf", ".png", ".jpg", ".jpeg", ".docx"}
    filename = (file.filename or "").lower()

    if file.content_type not in allowed_types and not any(filename.endswith(suffix) for suffix in allowed_suffixes):
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, PNG, and JPG files are supported")

    extracted_text = await ocr_service.extract_text(file)
    analysis = ai_explainer.build_explanation(extracted_text=extracted_text, file_name=file.filename or "document")

    response = {
        "analysis_id": analysis.get("analysis_id"),
        "document": {
            "name": file.filename or "document",
            "mime_type": file.content_type or "application/octet-stream",
            "size_bytes": 0,
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
        },
        "summary": analysis.get("summary"),
        "reasons": analysis.get("reasons", []),
        "requiredFixes": analysis.get("requiredFixes", []),
        "estimated_resolution_days": 3,
    }

    return _success(response)