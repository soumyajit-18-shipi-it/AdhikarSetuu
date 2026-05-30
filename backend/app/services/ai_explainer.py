from __future__ import annotations

from ..schemas.rejection import RejectionExplanationResponse


class AIExplainer:
    def build_explanation(self, extracted_text: str, file_name: str) -> RejectionExplanationResponse:
        normalized_text = f"{extracted_text} {file_name}".lower()

        if "gst" in normalized_text:
            return RejectionExplanationResponse(
                rejection_reason="GST certificate missing",
                plain_english="Your application was rejected because GST proof was not attached.",
                required_documents=["GST Certificate"],
                fix_checklist=[
                    "Upload GST Certificate",
                    "Verify GST Number",
                    "Resubmit Application",
                ],
            )

        if "bank" in normalized_text or "account" in normalized_text:
            return RejectionExplanationResponse(
                rejection_reason="Bank proof missing",
                plain_english="Your application was rejected because bank account proof was not attached.",
                required_documents=["Bank Passbook or Cancelled Cheque"],
                fix_checklist=[
                    "Upload bank proof",
                    "Check account name and IFSC",
                    "Resubmit the application",
                ],
            )

        if "udyam" in normalized_text:
            return RejectionExplanationResponse(
                rejection_reason="Udyam registration unavailable",
                plain_english="Your application was rejected because the Udyam registration proof was not found.",
                required_documents=["Udyam Registration Certificate"],
                fix_checklist=[
                    "Upload Udyam certificate",
                    "Verify Udyam number",
                    "Resubmit the application",
                ],
            )

        return RejectionExplanationResponse(
            rejection_reason="Supporting document mismatch",
            plain_english="Your application was rejected because one or more required supporting documents were missing or unclear.",
            required_documents=["Application Form", "Identity Proof", "Business Registration Proof"],
            fix_checklist=[
                "Review the rejection note",
                "Attach the missing documents",
                "Check all file scans for clarity",
                "Resubmit the application",
            ],
        )
