#!/usr/bin/env pwsh
<#
.SYNOPSIS
    AI Scam Message Detector - Quick Start Script (PowerShell)

.DESCRIPTION
    Starts the complete AI Scam Message Detector application:
    - Backend Flask API on http://localhost:5000
    - Frontend React App on http://localhost:3000

.EXAMPLE
    ./START.ps1
#>

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║   🛡️  AI SCAM MESSAGE DETECTOR - QUICK START 🛡️              ║" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    Write-Host ""
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    Write-Host "Expected: ...\AI-Scam-Message-Detector" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Project directory verified" -ForegroundColor Green
Write-Host ""

# Check Python
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.9+ first" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check if models exist
if (-not (Test-Path "ml_model/models/scam_detector_model.pkl")) {
    Write-Host "⚠️  Warning: ML model not found. Training model first..." -ForegroundColor Yellow
    Write-Host ""
    
    Push-Location "ml_model"
    Write-Host "Training ML model..." -ForegroundColor Cyan
    python train.py
    Pop-Location
    
    Write-Host ""
}

# Start Backend
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Starting Backend API on http://localhost:5000               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$backendProcess = Start-Process -FilePath "pwsh" -ArgumentList "-NoExit -Command", "cd backend; python app.py" -PassThru
Write-Host "✅ Backend started (PID: $($backendProcess.Id))" -ForegroundColor Green

# Wait for backend to start
Start-Sleep -Seconds 3

# Check if frontend packages are installed
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host ""
    Write-Host "⚠️  Frontend packages not installed yet. Installing..." -ForegroundColor Yellow
    Push-Location "frontend"
    npm install --legacy-peer-deps
    Pop-Location
}

# Start Frontend
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Starting Frontend on http://localhost:3000                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$frontendProcess = Start-Process -FilePath "pwsh" -ArgumentList "-NoExit -Command", "cd frontend; npm start" -PassThru
Write-Host "✅ Frontend started (PID: $($frontendProcess.Id))" -ForegroundColor Green

# Final message
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "║  🚀 Applications starting...                                  ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "║  Backend:  http://localhost:5000                             ║" -ForegroundColor Green
Write-Host "║  Frontend: http://localhost:3000                             ║" -ForegroundColor Green
Write-Host "║  API Docs: http://localhost:5000/api/docs                    ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "║  Window 1: Backend API (PID: $($backendProcess.Id))                             ║" -ForegroundColor Green
Write-Host "║  Window 2: Frontend React App (PID: $($frontendProcess.Id))                           ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "║  ℹ️  The frontend will open in your browser automatically    ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "║  To stop: Press Ctrl+C in each window or use Stop-Process    ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "Waiting for applications to complete..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to exit this script" -ForegroundColor Yellow
Write-Host ""

# Wait for both processes
$backendProcess | Wait-Process
$frontendProcess | Wait-Process

Write-Host ""
Write-Host "Applications have stopped" -ForegroundColor Yellow
