@echo off
setlocal
cd /d "%~dp0backend"
if not exist .venv\Scripts\python.exe (
  where py >nul 2>nul
  if errorlevel 1 (
    python -m venv .venv
  ) else (
    py -3 -m venv .venv
  )
)
if not exist .venv\Scripts\python.exe (
  echo Install Python 3.11 or later, then run this file again.
  pause
  exit /b 1
)
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 (
  echo Installation failed. Check the message above and your internet connection.
  pause
  exit /b 1
)
if not exist .env copy .env.example .env >nul
echo API docs: http://127.0.0.1:8000/api/docs
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
