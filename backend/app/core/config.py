from __future__ import annotations

import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
SCHEMES_FILE = DATA_DIR / "schemes.json"
DISTRICTS_FILE = DATA_DIR / "districts.json"
MOCK_MSMES_FILE = DATA_DIR / "mock_msmes.json"

APP_NAME = "Adhikar Setu API"
API_PREFIX = "/api"
ALLOWED_ORIGINS = [origin.strip() for origin in os.getenv(
	"ALLOWED_ORIGINS",
	"http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001",
).split(",") if origin.strip()]
