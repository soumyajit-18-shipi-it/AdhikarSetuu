from __future__ import annotations

from fastapi import APIRouter, File, HTTPException, UploadFile
from datetime import datetime

from ...services.ai_explainer import AIExplainer
from ...services.ocr_service import OCRService


router = APIRouter(prefix="/rejection", tags=["rejection"])
ocr_service = OCRService()
ai_explainer = AIExplainer()


@router.post("/explain")
async def explain_rejection(file: UploadFile = File(...)) -> dict:
    allowed_types = {"application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg"}
    allowed_suffixes = {".pdf", ".png", ".jpg", ".jpeg", ".docx"}
    filename = (file.filename or "").lower()

    if file.content_type not in allowed_types and not any(filename.endswith(suffix) for suffix in allowed_suffixes):
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, PNG, and JPG files are supported")

    extracted_text = await ocr_service.extract_text(file)
    analysis = ai_explainer.build_explanation(extracted_text=extracted_text, file_name=file.filename or "document")

    response = {
        "analysis_id": analysis.get("analysis_id"),
        "document": {
            "name": file.filename or "document",
            "mime_type": file.content_type or "application/octet-stream",
            "size_bytes": 0,
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
        },
        "summary": analysis.get("summary"),
        "reasons": analysis.get("reasons", []),
        "required_fixes": analysis.get("requiredFixes", []),
        "estimated_resolution_days": 3,
    }

    return response
