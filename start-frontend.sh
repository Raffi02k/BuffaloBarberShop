#!/bin/sh
set -eu
cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)/frontend"
command -v npm >/dev/null 2>&1 || { echo "Install Node.js 22.12 or later first."; exit 1; }
[ -f .env.local ] || cp .env.example .env.local
npm install
echo "Open http://127.0.0.1:5173 when the server is ready."
exec npm run dev
