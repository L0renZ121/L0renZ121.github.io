{
  "apps": [
    {
      "name": "mindcare-backend",
      "script": "server.js",
      "cwd": "./backend",
      "env": {
        "NODE_ENV": "production",
        "PORT": 5000,
        "OLLAMA_URL": "http://localhost:11434",
        "OLLAMA_MODEL": "mistral"
      },
      "instances": "max",
      "exec_mode": "cluster",
      "autorestart": true,
      "watch": false,
      "max_memory_restart": "1G",
      "error_file": "./logs/backend-error.log",
      "out_file": "./logs/backend-out.log",
      "log_date_format": "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
}
