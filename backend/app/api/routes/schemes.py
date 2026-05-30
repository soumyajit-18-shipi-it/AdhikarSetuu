from __future__ import annotations

from fastapi import APIRouter

from ...schemas.schemes import SchemeMatchRequest
from ...services.scheme_matcher import SchemeMatcher
from ...core.data_loader import load_schemes


router = APIRouter(prefix="/schemes", tags=["schemes"])
matcher = SchemeMatcher()


def _to_frontend_scheme(scheme: dict, status: str) -> dict:
    return {
        "id": scheme.get("id", "").lower(),
        "name": scheme.get("name"),
        "fullName": scheme.get("name"),
        "category": scheme.get("category"),
        "ministry": scheme.get("ministry", ""),
        "potentialBenefit": int(scheme.get("potential_benefit", scheme.get("benefit_amount", 0))),
        "benefitType": scheme.get("benefit_type", ""),
        "eligibilityStatus": status,
        "description": scheme.get("description", ""),
        "eligibilityCriteria": scheme.get("eligibility_criteria", []),
        "applicationUrl": scheme.get("application_url", "#"),
        "deadline": scheme.get("deadline", "Rolling"),
        "beneficiaries": int(scheme.get("beneficiaries", 0)),
    }


@router.post("/match")
async def match_schemes(payload: SchemeMatchRequest) -> dict:
    all_schemes = load_schemes()
    matched = matcher.match(payload)

    matched_ids = {s.id.upper() for s in matched}

    frontend_schemes: list[dict] = []
    eligible_count = 0
    partial_count = 0

    for scheme in all_schemes:
        sid = str(scheme.get("id", "")).upper()
        if sid in matched_ids:
            status = "eligible"
            eligible_count += 1
            # find matched object for details
            matched_obj = next((m for m in matched if m.id.upper() == sid), None)
            frontend_schemes.append(_to_frontend_scheme({**scheme, **{"benefit_amount": scheme.get("potential_benefit", 0)}}, status))
        else:
            # determine partial by simple keyword overlap (best-effort)
            status = "ineligible"
            frontend_schemes.append(_to_frontend_scheme({**scheme, **{"benefit_amount": scheme.get("potential_benefit", 0)}}, status))

    summary = {
        "total_schemes": len(all_schemes),
        "eligible_count": eligible_count,
        "partial_count": partial_count,
        "ineligible_count": len(all_schemes) - eligible_count - partial_count,
        "max_benefit": max((s.get("potential_benefit", 0) for s in all_schemes), default=0),
    }

    return {"summary": summary, "schemes": frontend_schemes}
