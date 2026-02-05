# Architecture Design

## System Overview

The AI Scam Message Detector follows a modern, scalable microservices architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Applications                      │
│                  (Web, Mobile, Third-party)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   Nginx Reverse Proxy                        │
│            (Load Balancing, SSL/TLS, Compression)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────┐         ┌─────────▼────────┐
│  Flask Backend │         │  React Frontend  │
│   (API Layer)  │         │   (UI Layer)     │
└───────┬────────┘         └──────────────────┘
        │
┌───────▼──────────────────────────────────────┐
│        ML Detection Engine                    │
│  ┌─────────────────────────────────────┐    │
│  │    Ensemble Model Prediction         │    │
│  │  ┌─────────────────────────────────┐ │    │
│  │  │  Naive Bayes  │ Random Forest    │ │    │
│  │  │  XGBoost      │ Neural Network   │ │    │
│  │  └─────────────────────────────────┘ │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  Feature Extraction & Preprocessing │    │
│  └─────────────────────────────────────┘    │
└────────────────────────────────────────────┘
        │
        │
┌───────▼──────────────────────────────────────┐
│        Data & Persistence Layer              │
│  ┌─────────────────────────────────────┐    │
│  │     PostgreSQL Database              │    │
│  │  (Messages, Results, Analytics)      │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │     Model Storage (ML Models)        │    │
│  └─────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

## Components

### 1. Frontend (React)

**Location**: `frontend/`

**Responsibilities**:
- User interface for message input
- Real-time detection results display
- Batch analysis interface
- Analytics dashboard
- Data visualization

**Technology**:
- React 18
- Material-UI / Custom CSS
- Axios (HTTP client)
- Chart.js (Analytics)

**Features**:
- Responsive design (desktop, tablet, mobile)
- Real-time form validation
- Error handling and user feedback
- Analytics visualization

### 2. Backend API (Flask)

**Location**: `backend/`

**Responsibilities**:
- REST API endpoints
- Request validation
- Response formatting
- Error handling
- Rate limiting
- Logging and monitoring

**Technology**:
- Flask 2.3
- Flask-CORS
- Gunicorn (WSGI server)

**Endpoints**:
- `POST /api/detect` - Single message detection
- `POST /api/detect-batch` - Batch analysis
- `GET /api/health` - Health check
- `GET /api/analytics` - Model analytics
- `GET /api/statistics` - Platform statistics
- `GET /api/docs` - Documentation

### 3. ML Detection Engine

**Location**: `ml_model/`

**Responsibilities**:
- Message preprocessing
- Feature extraction
- Model prediction
- Ensemble voting
- Confidence scoring

**Architecture**:

```
Input Message
    ↓
┌─────────────────────────────────┐
│ Text Preprocessing              │
│ - Lowercase conversion          │
│ - URL/email removal             │
│ - Tokenization                  │
│ - Lemmatization                 │
│ - Stopword removal              │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ Feature Extraction              │
│ - TF-IDF vectorization          │
│ - Hand-crafted features         │
│ - Statistical features          │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ Ensemble Prediction             │
│ ┌─────────────────────────────┐ │
│ │ Naive Bayes (25% weight)    │ │
│ │ Random Forest (35% weight)  │ │
│ │ XGBoost (40% weight)        │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ Post-Processing                 │
│ - Confidence aggregation        │
│ - Scam type classification      │
│ - Risk level assignment         │
│ - Explanation generation        │
└─────────────────────────────────┘
    ↓
Detection Result
```

**Models**:

1. **Naive Bayes**
   - Probabilistic classifier
   - Fast inference
   - Good baseline

2. **Random Forest**
   - 100 trees
   - Feature importance analysis
   - Handles non-linear patterns

3. **XGBoost**
   - Gradient boosting
   - Highest individual accuracy
   - Complex pattern recognition

**Feature Engineering**:
- TF-IDF (Term Frequency-Inverse Document Frequency)
- Message length statistics
- Character distribution analysis
- Urgency keywords scoring
- Financial terminology detection
- Suspicious pattern matching

### 4. Database Layer (PostgreSQL)

**Responsibilities**:
- Store detection results
- User analytics
- Model performance metrics
- Message history

**Schema**:
```sql
-- Messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    is_scam BOOLEAN,
    confidence FLOAT,
    scam_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Results table
CREATE TABLE detection_results (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES messages(id),
    result JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100),
    metric_value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Reverse Proxy (Nginx)

**Responsibilities**:
- Load balancing
- SSL/TLS termination
- Request routing
- Compression
- Security headers

**Configuration**:
- HTTP → HTTPS redirect
- API routing to Flask backend
- Frontend routing to React
- Static asset caching
- Gzip compression

## Data Flow

### Single Message Detection Flow

```
1. User enters message in frontend
2. Frontend validates input (length, type)
3. Frontend sends POST /api/detect with message
4. Nginx receives request, forwards to Flask
5. Flask validates request
6. Flask passes to ML detector
7. Detector preprocesses message
8. Detector extracts features
9. Ensemble models predict
10. Detector aggregates predictions
11. Detector generates explanation
12. Flask returns result to frontend
13. Frontend displays result with visualization
14. Result optionally saved to database
```

### Batch Detection Flow

```
1. User uploads file or enters multiple messages
2. Frontend chunks messages into batches
3. Frontend sends each batch to /api/detect-batch
4. Backend processes batch in parallel
5. Results aggregated with summary statistics
6. Results returned to frontend
7. Frontend displays table with all results
8. Optional: Export results as CSV/JSON
```

## Scalability Considerations

### Horizontal Scaling

```
Load Balancer
    ├─ Backend Instance 1 (Port 5001)
    ├─ Backend Instance 2 (Port 5002)
    ├─ Backend Instance 3 (Port 5003)
    └─ Backend Instance N (Port 500N)
         ↓
    Shared Database (PostgreSQL)
    Shared Model Cache (Redis)
```

### Caching Strategy

- **Model Cache**: Cache trained model in memory
- **Prediction Cache**: Cache results for identical messages
- **Feature Cache**: Cache extracted features
- **API Response Cache**: Cache frequently accessed analytics

### Load Balancing

- Round-robin distribution
- Sticky sessions for stateful operations
- Connection pooling to database
- Connection pooling to cache

## Security Architecture

### Authentication & Authorization

- Currently: Open API (development)
- Production: JWT tokens with roles
- RBAC (Role-Based Access Control)
- API key authentication

### Data Protection

- SSL/TLS encryption in transit
- Database encryption at rest
- Input validation and sanitization
- SQL injection prevention (ORM)
- XSS prevention (framework defaults)

### Network Security

- Firewall rules
- DDoS protection
- Rate limiting
- CORS restrictions
- Security headers

## Deployment Architecture

### Docker Containers

```
Docker Network (scam-detector-network)
    ├─ Backend Container (Port 5000)
    │   └─ Python 3.10 + Flask + ML
    ├─ Frontend Container (Port 3000)
    │   └─ Node.js + React
    ├─ Database Container (Port 5432)
    │   └─ PostgreSQL 15
    └─ Nginx Container (Port 80/443)
        └─ Reverse Proxy + Load Balancer
```

### Environment Separation

**Development**:
- Single container per service
- SQLite database
- No SSL
- Debug logging

**Production**:
- Multiple containers per service
- PostgreSQL database
- SSL/TLS enabled
- Structured logging
- Monitoring & alerting

## Performance Metrics

### Response Times

- **Single Detection**: < 100ms (p95)
- **Batch (100 messages)**: < 5s (p95)
- **Analytics Query**: < 200ms (p95)

### Throughput

- **API Requests**: 1000+ req/sec
- **Concurrent Users**: 500+ simultaneous
- **Detection Capacity**: 10,000+ messages/day

### Resource Usage

- **Memory**: 2GB (backend + models)
- **CPU**: 2 vCPU recommended
- **Storage**: 1GB (models + data)

## Monitoring & Observability

### Metrics

- Request count by endpoint
- Response time distribution
- Error rate (4xx, 5xx)
- Model accuracy
- Detection confidence distribution
- Scam type distribution

### Logging

- Structured JSON logs
- Log levels: DEBUG, INFO, WARNING, ERROR
- Request/response logging
- Model prediction logging
- Error tracebacks

### Alerting

- High error rate (> 5%)
- API latency (> 1s)
- Database connection errors
- Model prediction failures
- Disk space warnings

## Technology Stack Summary

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Backend** | Flask | 2.3.2 |
| **ML** | scikit-learn, XGBoost | Latest |
| **Database** | PostgreSQL | 15 |
| **Cache** | Redis | 7.0 |
| **Proxy** | Nginx | Latest |
| **Container** | Docker | 20.10+ |
| **Orchestration** | Docker Compose | 3.8 |
| **Testing** | Pytest | 7.4 |
| **CI/CD** | GitHub Actions | - |

## Future Enhancements

1. **Multi-language Support**: Extend to Spanish, French, Chinese
2. **Deep Learning**: Add BERT-based transformer models
3. **Active Learning**: User feedback integration
4. **Graph Analysis**: Social network scam detection
5. **Real-time Streaming**: Message stream processing
6. **Mobile App**: Native iOS/Android applications
7. **Browser Extension**: In-browser detection
8. **API Versioning**: Support multiple API versions

---

For more details, see [SETUP.md](../SETUP.md) and [README.md](../README.md)
