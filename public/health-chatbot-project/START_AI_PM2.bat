@echo off
REM Advanced: Start MindCare AI Services with PM2 (Process Manager)
REM PM2 keeps services running continuously and auto-restarts them if they crash

echo.
echo ========================================
echo  MindCare AI Services Setup with PM2
echo ========================================
echo.

REM Check if Ollama is installed
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Ollama is not installed or not in PATH
    echo Please install Ollama from: https://ollama.ai
    echo.
    pause
    exit /b 1
)

REM Check if PM2 is installed globally
npm list -g pm2 >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing PM2 globally (this only needs to run once)...
    call npm install -g pm2
)

REM Start Ollama in background
echo Starting Ollama server...
start "Ollama Server" /min cmd /k "ollama serve"
timeout /t 3 /nobreak

REM Install backend dependencies if needed
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)
cd ..

REM Start backend with PM2
echo Starting MindCare backend with PM2 (auto-restart enabled)...
call pm2 start ecosystem.config.js --name "mindcare-backend"

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Services Status:
pm2 status
echo.
echo Useful PM2 Commands:
echo   pm2 status          - Check service status
echo   pm2 logs            - View service logs
echo   pm2 stop all        - Stop all services
echo   pm2 start all       - Start all services
echo   pm2 restart all     - Restart all services
echo   pm2 delete all      - Remove all services
echo.
echo Ollama Server: http://localhost:11434
echo MindCare Backend: http://localhost:5000
echo.
pause
