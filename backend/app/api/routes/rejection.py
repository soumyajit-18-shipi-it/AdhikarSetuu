from __future__ import annotations

from fastapi import APIRouter, File, HTTPException, UploadFile

from ...schemas.rejection import RejectionExplanationResponse
from ...services.ai_explainer import AIExplainer
from ...services.ocr_service import OCRService


router = APIRouter(prefix="/rejection", tags=["rejection"])
ocr_service = OCRService()
ai_explainer = AIExplainer()


@router.post("/explain", response_model=RejectionExplanationResponse)
async def explain_rejection(file: UploadFile = File(...)) -> RejectionExplanationResponse:
    allowed_types = {"application/pdf", "image/png", "image/jpeg"}
    allowed_suffixes = {".pdf", ".png", ".jpg", ".jpeg"}
    filename = (file.filename or "").lower()

    if file.content_type not in allowed_types and not any(filename.endswith(suffix) for suffix in allowed_suffixes):
        raise HTTPException(status_code=400, detail="Only PDF, PNG, and JPG files are supported")

    extracted_text = await ocr_service.extract_text(file)
    return ai_explainer.build_explanation(extracted_text=extracted_text, file_name=file.filename or "document")
