@echo off
REM AI Scam Message Detector - Quick Start Script

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║   🛡️  AI SCAM MESSAGE DETECTOR - QUICK START 🛡️              ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if we're in the right directory
if not exist "backend" (
    echo ❌ Error: Please run this script from the project root directory
    echo.
    echo Current directory: %CD%
    echo Expected: ...\AI-Scam-Message-Detector
    pause
    exit /b 1
)

echo ✅ Project directory verified
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python 3.9+ first
    pause
    exit /b 1
)
echo ✅ Python installed

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first
    pause
    exit /b 1
)
echo ✅ Node.js installed
echo.

REM Create startup script
echo Creating startup scripts...

REM Start Backend
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Starting Backend API on http://localhost:5000               ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

start "Backend API" cmd /k "cd backend && python app.py"

REM Wait a moment
timeout /t 3 /nobreak

REM Start Frontend
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Starting Frontend on http://localhost:3000                  ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

start "Frontend" cmd /k "cd frontend && npm start"

REM Final message
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  🚀 Applications starting...                                  ║
echo ║                                                                ║
echo ║  Backend:  http://localhost:5000                             ║
echo ║  Frontend: http://localhost:3000                             ║
echo ║  API Docs: http://localhost:5000/api/docs                    ║
echo ║                                                                ║
echo ║  Window 1: Backend API                                        ║
echo ║  Window 2: Frontend React App                                 ║
echo ║                                                                ║
echo ║  Press Ctrl+C in each window to stop                         ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
pause
