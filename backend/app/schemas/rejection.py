from __future__ import annotations

from pydantic import BaseModel, Field


class RejectionExplanationResponse(BaseModel):
    rejection_reason: str
    plain_english: str
    required_documents: list[str]
    fix_checklist: list[str]


class RejectionExplainerMetadata(BaseModel):
    file_name: str = Field(..., min_length=1)
    content_type: str = Field(..., min_length=1)
