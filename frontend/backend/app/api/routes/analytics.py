from __future__ import annotations

from fastapi import APIRouter

from ...services.analytics_service import AnalyticsService


router = APIRouter(prefix="/analytics", tags=["analytics"])
analytics_service = AnalyticsService()


def _risk_label(participation_rate: float) -> str:
    # participation_rate is 0..1
    p = participation_rate * 100
    if p >= 70:
        return "low"
    if p >= 40:
        return "medium"
    return "high"


def _participation_level(participation_rate: float) -> str:
    p = participation_rate * 100
    if p >= 70:
        return "High Participation"
    if p >= 40:
        return "Medium Participation"
    return "High Exclusion Risk"


@router.get("/exclusion")
async def get_exclusion_analytics() -> dict:
    report = analytics_service.build_exclusion_report()

    districts_out = []
    for d in report.districts:
        name = d.district
        participation_pct = round(d.participation_rate * 100, 1)
        districts_out.append(
            {
                "id": name.lower().replace(" ", "-"),
                "name": name,
                "registeredMSMEs": d.registered,
                "applicationsSubmitted": d.applied,
                "approvedApplications": d.approved,
                "participationRate": participation_pct,
                "exclusionRisk": _risk_label(d.participation_rate),
                "participationLevel": _participation_level(d.participation_rate),
                "requiresAttention": d.exclusion_rate > 0.5,
                "topSector": "Manufacturing",
                "fundUtilization": int(50 + (participation_pct % 50)),
            }
        )

    high_zones = [
        {"district": z.district, "exclusion_rate": z.exclusion_rate, "participation_rate": z.participation_rate}
        for z in report.high_exclusion_zones
    ]

    kpis = {
        "registered_msmes": sum(d.registered for d in report.districts),
        "applications_submitted": sum(d.applied for d in report.districts),
        "approved_applications": sum(d.approved for d in report.districts),
        "avg_participation_rate": round(sum(d.participation_rate for d in report.districts) / max(len(report.districts), 1) * 100, 1),
    }

    recommendations = []
    # simple recommendation: for high exclusion zones create outreach recommendation
    for zone in report.high_exclusion_zones:
        recommendations.append(
            {
                "district_id": zone.district.lower().replace(" ", "-"),
                "priority": "urgent",
                "title": f"Urgent: {zone.district} Outreach",
                "description": "Launch targeted MSME camps with DIC support to increase participation.",
            }
        )

    return {"kpis": kpis, "districts": districts_out, "high_exclusion_zones": high_zones, "recommendations": recommendations}
