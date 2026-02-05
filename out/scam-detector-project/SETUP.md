# Installation & Setup Guide

## System Requirements

- **OS**: Linux, macOS, or Windows (with WSL2)
- **Python**: 3.9 or higher
- **Node.js**: 16 or higher
- **Docker**: 20.10+ (optional, for containerized deployment)
- **Git**: 2.30+

## Local Development Setup

### 1. Clone the Repository

```bash
cd AI-Scam-Message-Detector
```

### 2. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4. Train the ML Model

```bash
cd ml_model
python train.py
cd ..
```

This will create a trained model at `ml_model/models/scam_detector_model.pkl`

### 5. Run Backend API

```bash
cd backend
python app.py
```

The API will start on http://localhost:5000

**Available endpoints**:
- `GET /api/health` - Health check
- `POST /api/detect` - Single message detection
- `POST /api/detect-batch` - Batch detection
- `GET /api/analytics` - Model analytics
- `GET /api/docs` - API documentation

### 6. Setup Frontend (in new terminal)

```bash
cd frontend
npm install
npm start
```

Frontend will open on http://localhost:3000

## Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services**:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- Database: postgres:5432 (localhost)

### Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
FLASK_ENV=production
FLASK_PORT=5000
SECRET_KEY=your-strong-secret-key
DATABASE_URL=postgresql://user:password@db:5432/scam_detector
```

## Running Tests

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=backend --cov=ml_model -v

# Run specific test file
pytest tests/test_model.py -v

# Run specific test class
pytest tests/test_api.py::TestDetectionEndpoint -v
```

## Project Structure Reference

```
AI-Scam-Message-Detector/
├── backend/              # Flask REST API
│   ├── app.py           # Flask application factory
│   ├── routes.py        # API endpoints
│   ├── config.py        # Configuration management
│   └── requirements.txt  # Backend dependencies
├── ml_model/            # Machine learning components
│   ├── detector.py      # Scam detection engine
│   ├── preprocessor.py  # Text preprocessing
│   ├── train.py         # Training pipeline
│   └── models/          # Trained model files
├── frontend/            # React web application
│   ├── src/            # React components
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── tests/              # Test suite
│   ├── test_api.py
│   ├── test_model.py
│   └── conftest.py
├── docker-compose.yml  # Docker orchestration
├── Dockerfile          # Backend container
├── nginx.conf          # Reverse proxy config
└── README.md          # This file
```

## Troubleshooting

### NLTK Data Error
```python
# Install NLTK data if needed
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error
Ensure PostgreSQL is running and credentials in `.env` are correct.

### Frontend Can't Connect to API
Check that backend is running and REACT_APP_API_URL is configured correctly.

## Production Deployment

### Using Docker Compose

1. Configure environment:
```bash
cp .env.example .env
# Edit .env with production values
```

2. Generate SSL certificates:
```bash
mkdir ssl
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

3. Deploy:
```bash
docker-compose -f docker-compose.yml up -d
```

### Using Kubernetes (Optional)

Create Kubernetes manifests for production deployment:

```yaml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: scam-detector
spec:
  replicas: 3
  # ... (see k8s documentation)
```

## Performance Optimization

### Backend Optimization
- Use Gunicorn with multiple workers
- Enable database connection pooling
- Cache model predictions

### Frontend Optimization
- Enable gzip compression
- Use code splitting
- Minify assets

### Database Optimization
- Create indexes on frequently queried columns
- Implement caching layer (Redis)

## Monitoring & Logging

### View Logs
```bash
# Docker logs
docker-compose logs -f backend

# Application logs
tail -f logs/app.log
```

### Health Monitoring
```bash
# Check API health
curl http://localhost:5000/api/health

# Check database
docker-compose exec db psql -U scam_detector -c "SELECT 1"
```

## Support & Documentation

- **API Docs**: http://localhost:5000/api/docs
- **README**: See [README.md](./README.md)
- **Architecture**: See [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

For issues or questions, please refer to the documentation or open an issue on GitHub.
