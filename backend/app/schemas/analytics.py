from __future__ import annotations

from pydantic import BaseModel, Field


class DistrictAnalytics(BaseModel):
    district: str
    registered: int = Field(..., ge=0)
    applied: int = Field(..., ge=0)
    approved: int = Field(..., ge=0)
    application_rate: float
    approval_rate: float
    participation_rate: float
    exclusion_rate: float


class HighExclusionZone(BaseModel):
    district: str
    exclusion_rate: float
    participation_rate: float


class ExclusionAnalyticsResponse(BaseModel):
    districts: list[DistrictAnalytics]
    high_exclusion_zones: list[HighExclusionZone]
