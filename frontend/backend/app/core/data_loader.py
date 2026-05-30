from __future__ import annotations

import json
import random
from functools import lru_cache
from pathlib import Path
from typing import Any

from .config import DISTRICTS_FILE, MOCK_MSMES_FILE, SCHEMES_FILE


DEFAULT_DISTRICTS = [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
]


def _read_json(path: Path) -> Any:
    if not path.exists() or path.stat().st_size == 0:
        return None

    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def _write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)


@lru_cache(maxsize=1)
def load_schemes() -> list[dict[str, Any]]:
    data = _read_json(SCHEMES_FILE)
    if not isinstance(data, list) or not data:
        raise RuntimeError("schemes.json is missing or empty")
    return data


@lru_cache(maxsize=1)
def load_districts() -> list[str]:
    data = _read_json(DISTRICTS_FILE)
    if isinstance(data, list) and data:
        districts = [str(item["name"]) if isinstance(item, dict) and "name" in item else str(item) for item in data]
    else:
        districts = DEFAULT_DISTRICTS.copy()

    if not DISTRICTS_FILE.exists() or DISTRICTS_FILE.stat().st_size == 0:
        _write_json(DISTRICTS_FILE, districts)

    return districts


def _generate_mock_msmes() -> list[dict[str, Any]]:
    rng = random.Random(42)
    district_profiles = [
        ("Hyderabad", 2600, 0.95, 0.76, 0.68),
        ("Warangal", 2200, 0.91, 0.58, 0.49),
        ("Nizamabad", 1800, 0.86, 0.42, 0.34),
        ("Karimnagar", 1700, 0.88, 0.47, 0.39),
        ("Khammam", 1700, 0.89, 0.52, 0.41),
    ]

    records: list[dict[str, Any]] = []
    for district, count, registered_rate, applied_rate, approved_rate in district_profiles:
        for _ in range(count):
            registered = rng.random() < registered_rate
            applied = registered and (rng.random() < applied_rate)
            approved = applied and (rng.random() < approved_rate)
            records.append(
                {
                    "district": district,
                    "registered": registered,
                    "applied": applied,
                    "approved": approved,
                }
            )

    rng.shuffle(records)
    return records


@lru_cache(maxsize=1)
def load_mock_msmes() -> list[dict[str, Any]]:
    data = _read_json(MOCK_MSMES_FILE)
    if not isinstance(data, list) or not data:
        data = _generate_mock_msmes()
        _write_json(MOCK_MSMES_FILE, data)
    return data
