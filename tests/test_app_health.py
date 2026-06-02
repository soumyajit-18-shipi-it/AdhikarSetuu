import sys
from pathlib import Path

from fastapi.testclient import TestClient

# Ensure repo root is on sys.path for imports
REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from backend.app.main import create_app  # noqa: E402


def test_root_health_endpoint():
    app = create_app()
    client = TestClient(app)

    resp = client.get("/")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "running"
    assert "service" in body


