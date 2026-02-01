# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, the API is open without authentication. For production, implement JWT or OAuth2.

## Endpoints

### 1. Health Check

**Endpoint**: `GET /api/health`

**Description**: Check if the API is running and healthy.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-11T10:30:45.123456",
  "version": "1.0.0"
}
```

**Status Code**: `200 OK`

---

### 2. Detect Single Message

**Endpoint**: `POST /api/detect`

**Description**: Analyze a single message for scam indicators.

**Request**:
```json
{
  "message": "Congratulations! You've won $1,000,000! Click here to claim your prize."
}
```

**Response**:
```json
{
  "is_scam": true,
  "confidence": 0.987,
  "scam_type": "lottery_prize",
  "risk_level": "critical",
  "features": {
    "message_length": 78,
    "word_count": 14,
    "uppercase_ratio": 0.128,
    "digit_ratio": 0.051,
    "exclamation_count": 2,
    "question_mark_count": 0,
    "suspicious_links": 1
  },
  "confidence_breakdown": {
    "naive_bayes": 0.989,
    "random_forest": 0.985,
    "xgboost": 0.987
  },
  "explanation": "Detected as lottery_prize (98.7% confidence). Excessive exclamation marks indicating urgency or manipulation; Pressure tactics with time-sensitive language; Unusual capitalization patterns",
  "timestamp": "2024-01-11T10:30:45.123456"
}
```

**Status Codes**:
- `200 OK` - Analysis successful
- `400 Bad Request` - Invalid message
- `500 Internal Server Error` - Server error

**Error Response**:
```json
{
  "error": "Message cannot be empty"
}
```

---

### 3. Batch Detection

**Endpoint**: `POST /api/detect-batch`

**Description**: Analyze multiple messages at once.

**Request**:
```json
{
  "messages": [
    "Hi, can we meet tomorrow?",
    "You've won a prize! Click now!",
    "The project is due Friday."
  ]
}
```

**Response**:
```json
{
  "results": [
    {
      "is_scam": false,
      "confidence": 0.15,
      "scam_type": "unknown",
      "risk_level": "low",
      ...
    },
    {
      "is_scam": true,
      "confidence": 0.92,
      "scam_type": "lottery_prize",
      "risk_level": "high",
      ...
    },
    {
      "is_scam": false,
      "confidence": 0.20,
      "scam_type": "unknown",
      "risk_level": "low",
      ...
    }
  ],
  "summary": {
    "total": 3,
    "scams_detected": 1,
    "legitimate_detected": 2,
    "average_confidence": 0.4233,
    "scam_rate": 0.3333
  }
}
```

**Limits**:
- Maximum 1000 messages per request
- Maximum 5000 characters per message

**Status Codes**:
- `200 OK` - Analysis successful
- `400 Bad Request` - Invalid input
- `500 Internal Server Error` - Server error

---

### 4. Analytics

**Endpoint**: `GET /api/analytics`

**Description**: Get model performance metrics and scam categories.

**Response**:
```json
{
  "model_info": {
    "name": "AI Scam Message Detector",
    "version": "1.0.0",
    "accuracy": 0.952,
    "precision": 0.961,
    "recall": 0.948,
    "f1_score": 0.954
  },
  "scam_categories": {
    "phishing": "Phishing attempts and credential harvesting",
    "financial_fraud": "Financial frauds and money scams",
    "impersonation": "Impersonation of authority figures",
    "tech_support": "Fake technical support",
    "lottery_prize": "Fake lottery or prize winnings",
    "romantic": "Romantic scams",
    "job_offer": "Fake job offers",
    "package_delivery": "Fake package notifications",
    "urgency": "Urgency manipulation tactics",
    "cryptocurrency": "Cryptocurrency related scams"
  },
  "performance_metrics": {
    "average_detection_time_ms": 85,
    "model_type": "Ensemble (Naive Bayes, Random Forest, XGBoost)",
    "training_samples": 15000,
    "supported_languages": ["English"],
    "last_model_update": "2024-01-11"
  }
}
```

**Status Code**: `200 OK`

---

### 5. Statistics

**Endpoint**: `GET /api/statistics`

**Description**: Get platform usage statistics.

**Response**:
```json
{
  "total_messages_analyzed": 150234,
  "scams_detected": 45678,
  "detection_accuracy": 95.2,
  "false_positive_rate": 2.1,
  "average_confidence": 0.87,
  "active_users": 2341,
  "last_24h_scams": 1234,
  "trending_scam_types": [
    {"type": "phishing", "count": 456},
    {"type": "financial_fraud", "count": 389},
    {"type": "impersonation", "count": 234}
  ]
}
```

**Status Code**: `200 OK`

---

### 6. API Info

**Endpoint**: `GET /api/info`

**Description**: Get API information and available endpoints.

**Response**:
```json
{
  "api_name": "AI Scam Message Detector API",
  "version": "1.0.0",
  "description": "Advanced AI-powered API for detecting and analyzing scam messages",
  "endpoints": {
    "POST /api/detect": "Detect if a single message is a scam",
    "POST /api/detect-batch": "Detect scams in multiple messages",
    "GET /api/health": "Health check",
    "GET /api/analytics": "Get model analytics",
    "GET /api/statistics": "Get platform statistics",
    "GET /api/info": "Get API information"
  },
  "docs": "/api/docs",
  "status": "operational"
}
```

**Status Code**: `200 OK`

---

### 7. Documentation

**Endpoint**: `GET /api/docs`

**Description**: Get detailed API documentation.

**Response**: JSON with detailed endpoint documentation

**Status Code**: `200 OK`

---

## Error Handling

### Common Error Responses

**400 Bad Request**:
```json
{
  "error": "Message must be a string"
}
```

**500 Internal Server Error**:
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Rate limiting is enabled by default. Limits:
- **Default**: 100 requests per minute per IP
- **Batch endpoint**: 10 requests per minute per IP

---

## Request/Response Format

All requests and responses use JSON format.

**Content-Type**: `application/json`

---

## Field Descriptions

### Detection Result Fields

| Field | Type | Description |
|-------|------|-------------|
| `is_scam` | boolean | Whether the message is classified as a scam |
| `confidence` | float (0-1) | Confidence score from the ensemble model |
| `scam_type` | string | Category of scam (e.g., phishing, financial_fraud) |
| `risk_level` | string | Risk level (low, medium, high, critical) |
| `features` | object | Extracted message features |
| `confidence_breakdown` | object | Confidence from each model in ensemble |
| `explanation` | string | Human-readable explanation of the detection |
| `timestamp` | string | ISO format timestamp of analysis |

### Risk Levels

- **Low**: confidence < 0.50
- **Medium**: 0.50 ≤ confidence < 0.70
- **High**: 0.70 ≤ confidence < 0.85
- **Critical**: confidence ≥ 0.85

---

## Usage Examples

### Example 1: Detect Scam Message

```bash
curl -X POST http://localhost:5000/api/detect \
  -H "Content-Type: application/json" \
  -d '{"message": "Congratulations! You have won $1 million!"}'
```

### Example 2: Batch Analysis

```bash
curl -X POST http://localhost:5000/api/detect-batch \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      "Meeting at 2 PM tomorrow",
      "Claim your prize now!!!",
      "Order confirmed"
    ]
  }'
```

### Example 3: Get Analytics

```bash
curl http://localhost:5000/api/analytics
```

---

## Best Practices

1. **Batch Processing**: Use batch endpoint for multiple messages to improve efficiency
2. **Confidence Threshold**: Consider using confidence > 0.70 for production decisions
3. **Error Handling**: Always handle error responses appropriately
4. **Rate Limiting**: Implement backoff strategy for rate-limited requests
5. **Caching**: Cache model predictions when analyzing identical messages

---

## Changelog

### Version 1.0.0 (2024-01-11)
- Initial API release
- Single message detection
- Batch analysis support
- Analytics endpoints
- Full documentation

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/yourrepo/issues
- Documentation: See [SETUP.md](./SETUP.md)
- Email: support@scamdetector.ai
