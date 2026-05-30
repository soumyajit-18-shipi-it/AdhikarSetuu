from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from ..core.data_loader import load_schemes
from ..schemas.schemes import BusinessProfile, EligibleScheme


SECTOR_CATEGORY_MAP: dict[str, list[str]] = {
    "manufacturing": ["manufacturing", "credit", "quality", "technology"],
    "service": ["credit", "registration", "innovation", "technology"],
    "services": ["credit", "registration", "innovation", "technology"],
    "food": ["manufacturing", "agri", "quality", "credit"],
    "food processing": ["manufacturing", "agri", "quality", "credit"],
    "textile": ["artisan", "manufacturing", "women", "credit"],
    "handloom": ["artisan", "manufacturing", "women", "credit"],
    "export": ["export", "credit", "quality"],
    "technology": ["technology", "innovation", "credit", "quality"],
    "it": ["technology", "innovation", "credit", "registration"],
    "artisan": ["artisan", "cluster", "women", "credit"],
    "women": ["women", "credit", "registration", "cluster"],
    "agri": ["agri", "cluster", "credit", "manufacturing"],
    "rural": ["cluster", "artisan", "credit", "women"],
}


CATEGORY_TURNOVER_LIMITS: dict[str, int] = {
    "credit": 250_000_000,
    "registration": 250_000_000,
    "quality": 150_000_000,
    "manufacturing": 200_000_000,
    "women": 75_000_000,
    "cluster": 100_000_000,
    "innovation": 150_000_000,
    "export": 500_000_000,
    "procurement": 200_000_000,
    "artisan": 75_000_000,
    "technology": 150_000_000,
    "agri": 150_000_000,
}


@dataclass(frozen=True)
class MatchContext:
    profile: BusinessProfile
    scheme: dict[str, Any]


def _normalize_text(value: str) -> str:
    return " ".join(value.lower().replace("-", " ").replace("_", " ").split())


def _resolve_sector_categories(sector: str) -> list[str]:
    normalized = _normalize_text(sector)
    for key, categories in SECTOR_CATEGORY_MAP.items():
        if key in normalized:
            return categories
    return ["credit", "registration"]


def _category_turnover_limit(category: str) -> int:
    return CATEGORY_TURNOVER_LIMITS.get(category, 200_000_000)


def _scheme_matches_profile(context: MatchContext) -> EligibleScheme | None:
    profile = context.profile
    scheme = context.scheme
    category = str(scheme["category"]).lower()
    scheme_text = _normalize_text(f"{scheme['name']} {scheme['category']} {scheme['description']}")
    sector_categories = _resolve_sector_categories(profile.sector)
    reasons: list[str] = []
    score = 0

    if scheme["gst_required"] and not profile.gst_registered:
        return None

    if scheme["exporter_required"] and not profile.exporter:
        return None

    if profile.annual_turnover > _category_turnover_limit(category):
        return None

    if category in sector_categories:
        score += 3
        reasons.append(f"Sector fit: {profile.sector} aligns with {scheme['category']} support.")
    elif any(term in scheme_text for term in _normalize_text(profile.sector).split()):
        score += 2
        reasons.append("Business sector appears in the scheme description.")

    if scheme["women_owned_bonus"] and profile.women_owned:
        score += 2
        reasons.append("Women-owned bonus applies.")

    if scheme["gst_required"] and profile.gst_registered:
        score += 1
        reasons.append("GST registration requirement satisfied.")

    if scheme["exporter_required"] and profile.exporter:
        score += 2
        reasons.append("Exporter requirement satisfied.")

    if profile.annual_turnover <= _category_turnover_limit(category) / 2:
        score += 1
        reasons.append("Turnover sits comfortably within the scheme band.")

    if score < 2:
        return None

    mapped_scheme = {
        "id": scheme.get("id"),
        "name": scheme.get("name"),
        "category": scheme.get("category"),
        "benefit_amount": int(scheme.get("potential_benefit", scheme.get("benefit_amount", 0))),
        "gst_required": bool(scheme.get("gst_required", False)),
        "women_owned_bonus": bool(scheme.get("women_owned_bonus", False)),
        "exporter_required": bool(scheme.get("exporter_required", False)),
        "description": scheme.get("description", ""),
    }

    return EligibleScheme(
        **mapped_scheme,
        match_score=score,
        match_reasons=reasons,
    )


class SchemeMatcher:
    def __init__(self) -> None:
        self._schemes = load_schemes()

    def match(self, profile: BusinessProfile) -> list[EligibleScheme]:
        matches: list[EligibleScheme] = []
        for scheme in self._schemes:
            matched = _scheme_matches_profile(MatchContext(profile=profile, scheme=scheme))
            if matched is not None:
                matches.append(matched)

        matches.sort(key=lambda item: (item.match_score, item.benefit_amount), reverse=True)
        return matches
