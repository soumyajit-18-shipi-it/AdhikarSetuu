from __future__ import annotations

from typing import Any
import uuid


class AIExplainer:
    def build_explanation(self, extracted_text: str, file_name: str) -> dict[str, Any]:
        normalized_text = f"{extracted_text} {file_name}".lower()

        reasons: list[dict[str, Any]] = []
        fixes: list[dict[str, Any]] = []

        if "gst" in normalized_text:
            reasons.append(
                {
                    "id": 1,
                    "title": "GST Certificate Missing",
                    "original": "NON-SUBMISSION OF MANDATORY DOCUMENTS",
                    "plain": "You did not attach your GST Registration Certificate.",
                    "severity": "critical",
                    "fix": "Download GST certificate and attach as PDF.",
                }
            )
            fixes.append({"id": 1, "text": "Download and attach GST Registration Certificate (PDF)", "completed": False})

        if "udyam" in normalized_text or "udyam" in file_name.lower():
            reasons.append(
                {
                    "id": 2,
                    "title": "Udyam Registration Mismatch",
                    "original": "UDYAM REGISTRATION DISCREPANCY",
                    "plain": "The Udyam registration does not match the declared business category.",
                    "severity": "critical",
                    "fix": "Verify Udyam details and update the application.",
                }
            )
            fixes.append({"id": 2, "text": "Verify and correct NIC code on Udyam portal", "completed": False})

        if "bank" in normalized_text or "account" in normalized_text:
            reasons.append(
                {
                    "id": 3,
                    "title": "Bank Statement Missing",
                    "original": "BANK STATEMENT DEFICIT",
                    "plain": "Required bank statements for the previous two financial years were not provided.",
                    "severity": "moderate",
                    "fix": "Provide certified bank statements for the last two years.",
                }
            )
            fixes.append({"id": 3, "text": "Obtain certified bank statements for last 2 years", "completed": False})

        if not reasons:
            reasons.append(
                {
                    "id": 10,
                    "title": "Supporting Document Mismatch",
                    "original": "DOCUMENT MISMATCH",
                    "plain": "One or more supporting documents were missing or unclear.",
                    "severity": "moderate",
                    "fix": "Attach clear scans of all required documents as per the scheme checklist.",
                }
            )
            fixes.append({"id": 10, "text": "Attach clear scans of required documents", "completed": False})

        analysis = {
            "analysis_id": f"rej_{uuid.uuid4().hex[:8]}",
            "summary": f"Detected {len(reasons)} potential issues in the uploaded document.",
            "reasons": reasons,
            "requiredFixes": fixes,
        }

        return analysis
