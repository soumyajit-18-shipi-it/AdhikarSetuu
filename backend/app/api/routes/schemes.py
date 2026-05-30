from __future__ import annotations

from fastapi import APIRouter

from ...schemas.schemes import SchemeMatchRequest, SchemeMatchResponse
from ...services.scheme_matcher import SchemeMatcher


router = APIRouter(prefix="/schemes", tags=["schemes"])
matcher = SchemeMatcher()


@router.post("/match", response_model=SchemeMatchResponse)
async def match_schemes(payload: SchemeMatchRequest) -> SchemeMatchResponse:
    eligible_schemes = matcher.match(payload)
    return SchemeMatchResponse(eligible_schemes=eligible_schemes)
