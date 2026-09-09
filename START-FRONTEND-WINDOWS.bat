@echo off
setlocal
cd /d "%~dp0frontend"
where npm >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22.12 or later, then run this file again.
  pause
  exit /b 1
)
if not exist .env.local copy .env.example .env.local >nul
call npm install
if errorlevel 1 (
  echo Installation failed. Check the message above and your internet connection.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:5173 when the server is ready.
call npm run dev
pause
