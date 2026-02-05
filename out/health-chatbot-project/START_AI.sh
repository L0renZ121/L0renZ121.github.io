#!/bin/bash
# Start MindCare AI Services (Linux/Mac)
# This script starts both Ollama and the backend server

echo ""
echo "========================================"
echo "  Starting MindCare AI Services"
echo "========================================"
echo ""

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo ""
    echo "ERROR: Ollama is not installed"
    echo "Please install Ollama from: https://ollama.ai"
    echo ""
    exit 1
fi

# Start Ollama in background
echo "[1/2] Starting Ollama server..."
ollama serve &
OLLAMA_PID=$!
sleep 3

# Install backend dependencies if needed
cd backend
if [ ! -d "node_modules" ]; then
    echo "[2/2] Installing backend dependencies..."
    npm install
fi

# Start the backend server in background
echo "[2/2] Starting MindCare backend server..."
npm start &
BACKEND_PID=$!

echo ""
echo "========================================"
echo "  Services Started!"
echo "========================================"
echo ""
echo "Ollama Server: http://localhost:11434"
echo "MindCare Backend: http://localhost:5000"
echo ""
echo "Process IDs:"
echo "Ollama: $OLLAMA_PID"
echo "Backend: $BACKEND_PID"
echo ""
echo "To stop services, run:"
echo "kill $OLLAMA_PID $BACKEND_PID"
echo ""

wait
