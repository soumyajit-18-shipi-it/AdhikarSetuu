from __future__ import annotations

from fastapi import HTTPException, UploadFile


class OCRService:
    SUPPORTED_CONTENT_TYPES = {
        "application/pdf",
        "image/png",
        "image/jpeg",
    }

    async def extract_text(self, file: UploadFile) -> str:
        if file.content_type not in self.SUPPORTED_CONTENT_TYPES:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        raw_bytes = await file.read()
        preview = raw_bytes[:4096].decode("utf-8", errors="ignore").lower()
        file_name = (file.filename or "").lower()

        inferred_text = " ".join([preview, file_name]).strip()
        if not inferred_text:
            inferred_text = "uploaded rejection document"

        return inferred_text
