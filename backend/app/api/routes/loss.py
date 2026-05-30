from __future__ import annotations

from fastapi import APIRouter

from ...schemas.loss import LossCalculationRequest
from ...services.scheme_matcher import SchemeMatcher


router = APIRouter(prefix="/loss", tags=["loss"])
matcher = SchemeMatcher()


def _project_scheme(scheme: dict) -> dict:
    total = int(scheme.get("potential_benefit", scheme.get("benefit_amount", 0)))
    y1 = int(total * 0.4)
    y2 = int(total * 0.35)
    y3 = int(total * 0.25)
    return {"scheme": scheme.get("name"), "year1": y1, "year2": y2, "year3": y3, "total": y1 + y2 + y3}


@router.post("/calculate")
async def calculate_loss(payload: LossCalculationRequest) -> dict:
    matched = matcher.match(payload)

    items = []
    total_potential = 0
    for s in matched:
        # s may be a pydantic model or plain dict
        if hasattr(s, "model_dump"):
            sd = s.model_dump()
        elif hasattr(s, "dict"):
            sd = s.dict()
        elif hasattr(s, "__dict__"):
            sd = s.__dict__
        else:
            sd = dict(s)

        proj = _project_scheme(sd)
        items.append(proj)
        total_potential += proj["total"]

    # create cumulative chart points (coarse)
    cumulative = []
    running = 0
    checkpoints = [3, 6, 9, 12, 24, 36]
    per_month = int(total_potential / max(checkpoints)) if checkpoints else total_potential
    for cp in checkpoints:
        running = min(total_potential, running + per_month * (cp if cp == 3 else (cp - (checkpoints[checkpoints.index(cp)-1] if checkpoints.index(cp)>0 else 0))))
        cumulative.append({"period": f"Month {cp}", "amount": running})

    # pie data
    pie = []
    colors = ["#1a4fa0", "#d4a017", "#2a7d4f", "#c0392b", "#6c3483", "#2c3e50"]
    for i, it in enumerate(items):
        pie.append({"name": it["scheme"], "value": it["total"], "color": colors[i % len(colors)]})

    return {
        "totalPotential": total_potential,
        "breakdown": items,
        "cumulativeChart": cumulative,
        "pieData": pie,
    }
