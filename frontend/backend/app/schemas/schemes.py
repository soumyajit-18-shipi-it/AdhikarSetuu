from __future__ import annotations

from pydantic import BaseModel, Field


class BusinessProfile(BaseModel):
    business_name: str = Field(..., min_length=1)
    sector: str = Field(..., min_length=1)
    annual_turnover: float = Field(..., ge=0)
    employees: int = Field(..., ge=0)
    gst_registered: bool
    exporter: bool
    women_owned: bool
    district: str = Field(..., min_length=1)


class SchemeData(BaseModel):
    id: str
    name: str
    category: str
    benefit_amount: int = Field(..., ge=0)
    gst_required: bool
    women_owned_bonus: bool
    exporter_required: bool
    description: str


class EligibleScheme(SchemeData):
    match_score: int
    match_reasons: list[str]


class SchemeMatchRequest(BusinessProfile):
    pass


class SchemeMatchResponse(BaseModel):
    eligible_schemes: list[EligibleScheme]


class LossCalculationResponse(BaseModel):
    matched_schemes: list[EligibleScheme]
    total_benefit: int
    three_year_projection: int
