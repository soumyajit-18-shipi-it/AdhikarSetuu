from __future__ import annotations

from dataclasses import dataclass

import pandas as pd

from ..core.data_loader import load_districts, load_mock_msmes
from ..schemas.analytics import DistrictAnalytics, ExclusionAnalyticsResponse, HighExclusionZone


@dataclass(frozen=True)
class DistrictMetrics:
    district: str
    registered: int
    applied: int
    approved: int
    application_rate: float
    approval_rate: float
    participation_rate: float
    exclusion_rate: float


class AnalyticsService:
    def build_exclusion_report(self) -> ExclusionAnalyticsResponse:
        districts = load_districts()
        records = load_mock_msmes()
        frame = pd.DataFrame(records)

        if frame.empty:
            return ExclusionAnalyticsResponse(districts=[], high_exclusion_zones=[])

        frame["registered"] = frame["registered"].astype(bool)
        frame["applied"] = frame["applied"].astype(bool)
        frame["approved"] = frame["approved"].astype(bool)

        grouped = frame.groupby("district", dropna=False)
        district_metrics: list[DistrictMetrics] = []

        for district in districts:
            district_frame = grouped.get_group(district) if district in grouped.groups else frame.iloc[0:0]
            registered = int(district_frame["registered"].sum())
            applied = int(district_frame["applied"].sum())
            approved = int(district_frame["approved"].sum())

            application_rate = round(applied / registered, 4) if registered else 0.0
            approval_rate = round(approved / applied, 4) if applied else 0.0
            participation_rate = round(approved / registered, 4) if registered else 0.0
            exclusion_rate = round(1 - participation_rate, 4)

            district_metrics.append(
                DistrictMetrics(
                    district=district,
                    registered=registered,
                    applied=applied,
                    approved=approved,
                    application_rate=application_rate,
                    approval_rate=approval_rate,
                    participation_rate=participation_rate,
                    exclusion_rate=exclusion_rate,
                )
            )

        ordered_metrics = sorted(district_metrics, key=lambda item: item.participation_rate)
        high_exclusion_zones = ordered_metrics[:2]

        return ExclusionAnalyticsResponse(
            districts=[
                DistrictAnalytics(
                    district=metric.district,
                    registered=metric.registered,
                    applied=metric.applied,
                    approved=metric.approved,
                    application_rate=metric.application_rate,
                    approval_rate=metric.approval_rate,
                    participation_rate=metric.participation_rate,
                    exclusion_rate=metric.exclusion_rate,
                )
                for metric in sorted(district_metrics, key=lambda item: item.district)
            ],
            high_exclusion_zones=[
                HighExclusionZone(
                    district=metric.district,
                    exclusion_rate=metric.exclusion_rate,
                    participation_rate=metric.participation_rate,
                )
                for metric in high_exclusion_zones
            ],
        )
