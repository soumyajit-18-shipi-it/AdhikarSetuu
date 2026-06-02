import sys
from pathlib import Path

# Ensure repo root is on sys.path for imports
REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from backend.app.core.config import API_PREFIX


def test_api_prefix_is_non_empty():
    assert isinstance(API_PREFIX, str)
    assert API_PREFIX.startswith("/")
    assert API_PREFIX != "/"



