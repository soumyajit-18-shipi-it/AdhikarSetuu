from __future__ import annotations

from fastapi import APIRouter

from ...schemas.loss import LossCalculationRequest
from ...schemas.schemes import LossCalculationResponse
from ...services.loss_calculator import LossCalculator


router = APIRouter(prefix="/loss", tags=["loss"])
calculator = LossCalculator()


@router.post("/calculate", response_model=LossCalculationResponse)
async def calculate_loss(payload: LossCalculationRequest) -> LossCalculationResponse:
    return calculator.calculate(payload)
