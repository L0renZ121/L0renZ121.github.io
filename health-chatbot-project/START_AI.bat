@echo off
REM Start MindCare AI Services
REM This script starts both Ollama and the backend server

echo.
echo ========================================
echo  Starting MindCare AI Services
echo ========================================
echo.

REM Check if Ollama is installed
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Ollama is not installed or not in PATH
    echo Please install Ollama from: https://ollama.ai
    echo.
    pause
    exit /b 1
)

REM Start Ollama in a new window (background)
echo [1/2] Starting Ollama server...
start "Ollama Server" /min cmd /k "ollama serve"
timeout /t 3 /nobreak

REM Check if backend dependencies are installed
cd backend
if not exist "node_modules" (
    echo [2/2] Installing backend dependencies...
    call npm install
)

REM Start the backend server
echo [2/2] Starting MindCare backend server...
start "MindCare Backend" /min cmd /k "npm start"

echo.
echo ========================================
echo  Services Started!
echo ========================================
echo.
echo Ollama Server: http://localhost:11434
echo MindCare Backend: http://localhost:5000
echo.
echo The services are running in the background.
echo You can close this window - they will continue running.
echo.
echo To open the chatbot, open your browser to:
echo http://localhost:3000 (if frontend is running)
echo or navigate to your deployed site
echo.
pause
