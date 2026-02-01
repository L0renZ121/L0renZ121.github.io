"""
Model Tests - ML model testing
"""

import pytest
import numpy as np
from ml_model.detector import ScamDetector
from ml_model.preprocessor import TextPreprocessor


class TestTextPreprocessor:
    """Test text preprocessing"""
    
    def test_clean_text(self):
        """Test text cleaning"""
        preprocessor = TextPreprocessor()
        text = "Check this URL: http://malicious.com and email: test@evil.com"
        cleaned = preprocessor.clean_text(text)
        
        assert 'http' not in cleaned
        assert '@' not in cleaned
        assert len(cleaned) > 0
    
    def test_tokenize(self):
        """Test tokenization"""
        preprocessor = TextPreprocessor()
        tokens = preprocessor.tokenize("Hello world")
        assert len(tokens) == 2
        assert 'Hello' in tokens
        assert 'world' in tokens
    
    def test_preprocess_pipeline(self):
        """Test full preprocessing pipeline"""
        preprocessor = TextPreprocessor()
        text = "You've won $1,000,000! Click here immediately!"
        tokens = preprocessor.preprocess(text)
        
        assert isinstance(tokens, list)
        assert len(tokens) > 0
        assert all(isinstance(t, str) for t in tokens)


class TestScamDetector:
    """Test scam detector"""
    
    def test_detector_initialization(self):
        """Test detector can be initialized"""
        detector = ScamDetector()
        assert detector is not None
        assert not detector.is_trained
    
    def test_detector_detect_dummy(self):
        """Test detector.detect on untrained model"""
        detector = ScamDetector()
        result = detector.detect("Test message")
        
        assert 'is_scam' in result
        assert 'confidence' in result
        assert 'scam_type' in result
        assert 'risk_level' in result
    
    def test_detector_training(self):
        """Test detector training"""
        detector = ScamDetector()
        
        messages = [
            "Hi, let's meet tomorrow",
            "Congratulations you won $1000000!",
            "Your account has been verified",
            "CLICK HERE NOW FOR FREE MONEY!!!",
        ]
        labels = np.array([0, 1, 0, 1])
        
        detector.train(messages, labels)
        assert detector.is_trained
    
    def test_detector_scam_classification(self):
        """Test scam type classification"""
        detector = ScamDetector()
        
        # Phishing
        result = detector._classify_scam_type("Verify your account immediately", 0.8)
        assert result == 'phishing'
        
        # Financial
        result = detector._classify_scam_type("Transfer money to this account", 0.8)
        assert result == 'financial_fraud'
        
        # Cryptocurrency
        result = detector._classify_scam_type("Invest in bitcoin for guaranteed returns", 0.8)
        assert result == 'cryptocurrency'
    
    def test_detector_feature_extraction(self):
        """Test feature extraction"""
        detector = ScamDetector()
        features = detector._extract_message_features("Hello world! This is a test.")
        
        assert 'message_length' in features
        assert 'word_count' in features
        assert 'uppercase_ratio' in features
        assert 'digit_ratio' in features
        assert 'exclamation_count' in features


class TestModelEnsemble:
    """Test ensemble model behavior"""
    
    def test_ensemble_predictions(self):
        """Test ensemble makes consistent predictions"""
        detector = ScamDetector()
        
        # Train detector
        messages = [
            "Hello", "Hi", "Urgent", "Claim now", "Meeting tomorrow",
            "Free money", "Transfer funds", "Verify account",
            "Click here", "Limited time"
        ]
        labels = np.array([0, 0, 1, 1, 0, 1, 1, 1, 1, 1])
        detector.train(messages, labels)
        
        # Test on same message should give consistent result
        result1 = detector.detect("Test message")
        result2 = detector.detect("Test message")
        
        assert result1['is_scam'] == result2['is_scam']
        assert result1['confidence'] == result2['confidence']
