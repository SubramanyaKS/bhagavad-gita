from pathlib import Path
import os

def load_env():
    """
    Loads environment variables from backend/.env or root .env into os.environ.
    Only sets keys that are not already in os.environ.
    """
    backend_dir = Path(__file__).resolve().parents[2]
    candidate_paths = [
        backend_dir / '.env',
        backend_dir.parent / '.env',
        backend_dir / '.env.local',
    ]

    for env_path in candidate_paths:
        if env_path.exists() and env_path.is_file():
            try:
                with open(env_path, 'r', encoding='utf-8') as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith('#') or '=' not in line:
                            continue
                        key, val = line.split('=', 1)
                        key = key.strip()
                        val = val.strip().strip('"').strip("'")
                        if key and key not in os.environ:
                            os.environ[key] = val
            except Exception:
                pass

# Run on import
load_env()
