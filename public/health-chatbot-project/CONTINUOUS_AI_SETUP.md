# MindCare AI - Continuous Running Setup

## Quick Start Options

### Option 1: Simple Background Start (Recommended)
**Windows:**
```bash
START_AI.bat
```
This starts both Ollama and the backend server in the background.

**Linux/Mac:**
```bash
chmod +x START_AI.sh
./START_AI.sh
```

### Option 2: Advanced - With PM2 (Production Grade)
PM2 is a process manager that keeps your services running continuously and auto-restarts them if they crash.

**Windows:**
```bash
START_AI_PM2.bat
```

**Linux/Mac:**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save      # Save so it auto-starts on reboot
pm2 startup   # Enable auto-start on system reboot
```

## How It Works

Once you run either startup script:

1. **Ollama Server** starts on `http://localhost:11434`
2. **MindCare Backend** starts on `http://localhost:5000`
3. Both services run in the background continuously
4. Multiple users can access the AI features simultaneously
5. If a service crashes, it automatically restarts (with PM2)

## Using Multiple Users

The AI will now work for any user accessing the website because:
- The backend server stays running continuously
- Ollama model stays loaded in memory
- No need to restart services for each user
- All requests are handled through the persistent server

## Common Commands

### View running services
```bash
pm2 status      # With PM2
netstat -ano | findstr :5000     # Windows - check if port 5000 is in use
netstat -ano | findstr :11434    # Windows - check if port 11434 is in use
```

### Stop services
```bash
pm2 stop all    # Stop all PM2 services
# Or close the terminal windows running the services
```

### View logs
```bash
pm2 logs        # View service logs
pm2 logs mindcare-backend   # Specific service logs
```

### Restart services
```bash
pm2 restart all # Restart all services
```

## Troubleshooting

**"Ollama is not installed":**
- Download and install from https://ollama.ai

**"Port 5000 already in use":**
- Another service is using port 5000
- Change PORT in .env to a different number (e.g., 5001)

**"Port 11434 already in use":**
- Ollama is already running or another service uses it
- Change OLLAMA_URL in .env to point to a different port

**Services keep crashing:**
- Check logs with `pm2 logs`
- Make sure dependencies are installed: `npm install` in backend folder
- Ensure Ollama model is downloaded: `ollama pull mistral`

