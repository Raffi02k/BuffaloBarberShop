#!/bin/sh
set -eu
cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)/backend"
command -v python3 >/dev/null 2>&1 || { echo "Install Python 3.11 or later first."; exit 1; }
[ -x .venv/bin/python ] || python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
[ -f .env ] || cp .env.example .env
echo "API docs: http://127.0.0.1:8000/api/docs"
exec .venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
