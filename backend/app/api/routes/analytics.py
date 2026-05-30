from __future__ import annotations

from fastapi import APIRouter

from ...schemas.analytics import ExclusionAnalyticsResponse
from ...services.analytics_service import AnalyticsService


router = APIRouter(prefix="/analytics", tags=["analytics"])
analytics_service = AnalyticsService()


@router.get("/exclusion", response_model=ExclusionAnalyticsResponse)
async def get_exclusion_analytics() -> ExclusionAnalyticsResponse:
    return analytics_service.build_exclusion_report()
