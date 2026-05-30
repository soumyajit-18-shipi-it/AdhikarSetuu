from __future__ import annotations

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
SCHEMES_FILE = DATA_DIR / "schemes.json"
DISTRICTS_FILE = DATA_DIR / "districts.json"
MOCK_MSMES_FILE = DATA_DIR / "mock_msmes.json"

APP_NAME = "Adhikar Setu API"
API_PREFIX = "/api"
ALLOWED_ORIGINS = ["*"]
