from __future__ import annotations

from ..schemas.schemes import BusinessProfile, LossCalculationResponse
from .scheme_matcher import SchemeMatcher


class LossCalculator:
    def __init__(self, scheme_matcher: SchemeMatcher | None = None) -> None:
        self._scheme_matcher = scheme_matcher or SchemeMatcher()

    def calculate(self, profile: BusinessProfile) -> LossCalculationResponse:
        matched_schemes = self._scheme_matcher.match(profile)
        total_benefit = sum(scheme.benefit_amount for scheme in matched_schemes)

        return LossCalculationResponse(
            matched_schemes=matched_schemes,
            total_benefit=total_benefit,
            three_year_projection=total_benefit,
        )
