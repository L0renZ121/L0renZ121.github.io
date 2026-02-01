"""
API Tests - Flask API endpoint testing
"""

import pytest
import json
from backend.app import create_app
from backend.config import TestingConfig


@pytest.fixture
def app():
    """Create Flask app for testing"""
    app = create_app(TestingConfig)
    return app


@pytest.fixture
def client(app):
    """Create test client"""
    return app.test_client()


class TestHealthEndpoint:
    """Test health check endpoint"""
    
    def test_health_check(self, client):
        """Test health endpoint returns 200"""
        response = client.get('/api/health')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['status'] == 'healthy'


class TestDetectionEndpoint:
    """Test scam detection endpoint"""
    
    def test_detect_valid_message(self, client):
        """Test detection with valid message"""
        response = client.post(
            '/api/detect',
            json={'message': 'Hi, can we schedule a meeting?'},
            content_type='application/json'
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'is_scam' in data
        assert 'confidence' in data
        assert 'scam_type' in data
    
    def test_detect_empty_message(self, client):
        """Test detection with empty message"""
        response = client.post(
            '/api/detect',
            json={'message': ''},
            content_type='application/json'
        )
        assert response.status_code == 400
    
    def test_detect_missing_message(self, client):
        """Test detection with missing message field"""
        response = client.post(
            '/api/detect',
            json={},
            content_type='application/json'
        )
        assert response.status_code == 400
    
    def test_detect_invalid_json(self, client):
        """Test detection with invalid JSON"""
        response = client.post(
            '/api/detect',
            data='invalid json',
            content_type='application/json'
        )
        assert response.status_code == 400


class TestBatchEndpoint:
    """Test batch detection endpoint"""
    
    def test_batch_detect_valid(self, client):
        """Test batch detection with valid messages"""
        response = client.post(
            '/api/detect-batch',
            json={
                'messages': [
                    'Hi there',
                    'Congratulations you won',
                    'Let\'s meet tomorrow'
                ]
            },
            content_type='application/json'
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'results' in data
        assert 'summary' in data
        assert len(data['results']) == 3
        assert data['summary']['total'] == 3
    
    def test_batch_detect_empty(self, client):
        """Test batch detection with empty list"""
        response = client.post(
            '/api/detect-batch',
            json={'messages': []},
            content_type='application/json'
        )
        assert response.status_code == 400


class TestAnalyticsEndpoint:
    """Test analytics endpoint"""
    
    def test_get_analytics(self, client):
        """Test analytics endpoint"""
        response = client.get('/api/analytics')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'model_info' in data
        assert 'scam_categories' in data


class TestInfoEndpoint:
    """Test info endpoint"""
    
    def test_get_info(self, client):
        """Test info endpoint"""
        response = client.get('/api/info')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'api_name' in data
        assert 'endpoints' in data
