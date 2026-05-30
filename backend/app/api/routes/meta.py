from __future__ import annotations

from fastapi import APIRouter

from ...core.data_loader import load_districts


router = APIRouter(prefix="/meta", tags=["meta"])


SECTORS = [
    "Manufacturing",
    "Food Processing",
    "Textiles & Apparel",
    "IT & Software Services",
    "Agro-processing",
    "Pharmaceuticals",
    "Engineering & Metal Works",
    "Handicrafts & Artisans",
    "Retail & Trading",
    "Construction & Infrastructure",
]


@router.get("/sectors")
async def get_sectors() -> dict:
    return {"sectors": SECTORS}


@router.get("/districts")
async def get_districts() -> dict:
    districts = load_districts()
    return {"districts": districts}
