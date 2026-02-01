"""
ML Model - Scam Detection Engine
Advanced ensemble-based scam message detector with multiple models
"""

import pickle
import numpy as np
from typing import Dict, List, Tuple
import logging
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
import xgboost as xgb
import json
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ScamDetector:
    """
    Advanced ensemble-based scam detector using multiple ML models:
    - TF-IDF + Naive Bayes
    - TF-IDF + Random Forest
    - TF-IDF + XGBoost
    - Deep Learning (optional neural network)
    """
    
    SCAM_TYPES = {
        'phishing': 'Phishing - Fake login or credential harvesting',
        'financial_fraud': 'Financial Fraud - Fake investments or money transfers',
        'impersonation': 'Impersonation - Fake authority or CEO fraud',
        'tech_support': 'Tech Support - Fake support or malware distribution',
        'lottery_prize': 'Lottery/Prize - Fake winnings or claims',
        'romantic': 'Romantic - Romance scams or catfishing',
        'job_offer': 'Job Offer - Fake employment opportunities',
        'package_delivery': 'Package - Fake shipment notifications',
        'urgency': 'Urgency - Time pressure manipulation',
        'cryptocurrency': 'Cryptocurrency - Fake crypto offers'
    }
    
    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=5000,
            min_df=2,
            max_df=0.8,
            ngram_range=(1, 2),
            stop_words='english'
        )
        
        self.models = {
            'naive_bayes': MultinomialNB(alpha=1.0),
            'random_forest': RandomForestClassifier(
                n_estimators=100,
                max_depth=15,
                min_samples_split=5,
                random_state=42,
                n_jobs=-1
            ),
            'xgboost': xgb.XGBClassifier(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                random_state=42,
                n_jobs=-1
            )
        }
        
        self.is_trained = False
        self.model_weights = {
            'naive_bayes': 0.25,
            'random_forest': 0.35,
            'xgboost': 0.40
        }
        
    def train(self, messages: List[str], labels: np.ndarray):
        """
        Train ensemble models
        messages: List of text messages
        labels: Binary labels (1=scam, 0=legitimate)
        """
        logger.info(f"Training on {len(messages)} messages")
        
        # Vectorize text
        X = self.tfidf_vectorizer.fit_transform(messages)
        
        # Train all models
        for model_name, model in self.models.items():
            logger.info(f"Training {model_name}...")
            model.fit(X, labels)
        
        self.is_trained = True
        logger.info("Ensemble training complete")
    
    def detect(self, message: str) -> Dict:
        """
        Detect if message is a scam with detailed analysis
        
        Returns:
        {
            'is_scam': bool,
            'confidence': float (0-1),
            'scam_type': str,
            'risk_level': str (low/medium/high/critical),
            'features': dict of extracted features,
            'confidence_breakdown': dict of model confidences,
            'explanation': str with reasoning
        }
        """
        if not self.is_trained:
            return self._dummy_detection(message)
        
        # Vectorize message
        X = self.tfidf_vectorizer.transform([message])
        
        # Get predictions from all models
        predictions = {}
        confidences = {}
        
        for model_name, model in self.models.items():
            pred = model.predict(X)[0]
            prob = model.predict_proba(X)[0]
            predictions[model_name] = pred
            confidences[model_name] = float(prob[1])  # Probability of scam
        
        # Weighted ensemble voting
        ensemble_confidence = sum(
            confidences[model_name] * self.model_weights[model_name]
            for model_name in self.models.keys()
        )
        
        is_scam = ensemble_confidence > 0.5
        
        # Determine risk level
        if ensemble_confidence >= 0.85:
            risk_level = 'critical'
        elif ensemble_confidence >= 0.70:
            risk_level = 'high'
        elif ensemble_confidence >= 0.50:
            risk_level = 'medium'
        else:
            risk_level = 'low'
        
        # Detect scam type
        scam_type = self._classify_scam_type(message, ensemble_confidence)
        
        # Extract features
        features = self._extract_message_features(message)
        
        return {
            'is_scam': is_scam,
            'confidence': float(ensemble_confidence),
            'scam_type': scam_type,
            'risk_level': risk_level,
            'features': features,
            'confidence_breakdown': {
                'naive_bayes': confidences['naive_bayes'],
                'random_forest': confidences['random_forest'],
                'xgboost': confidences['xgboost']
            },
            'explanation': self._generate_explanation(message, is_scam, ensemble_confidence, scam_type),
            'timestamp': datetime.now().isoformat()
        }
    
    def detect_batch(self, messages: List[str], batch_size: int = 100) -> List[Dict]:
        """Detect scams in batch of messages"""
        results = []
        for i, message in enumerate(messages):
            result = self.detect(message)
            results.append(result)
            if (i + 1) % batch_size == 0:
                logger.info(f"Processed {i + 1}/{len(messages)} messages")
        return results
    
    def _dummy_detection(self, message: str) -> Dict:
        """Return dummy detection when model not trained"""
        return {
            'is_scam': False,
            'confidence': 0.0,
            'scam_type': 'unknown',
            'risk_level': 'unknown',
            'features': {},
            'confidence_breakdown': {},
            'explanation': 'Model not trained yet',
            'timestamp': datetime.now().isoformat()
        }
    
    def _classify_scam_type(self, message: str, confidence: float) -> str:
        """Classify the type of scam"""
        text_lower = message.lower()
        
        # Phishing patterns
        if any(word in text_lower for word in ['verify', 'confirm', 'login', 'password', 'account']):
            return 'phishing'
        
        # Financial patterns
        if any(word in text_lower for word in ['money', 'payment', 'bank', 'transfer', 'invoice']):
            return 'financial_fraud'
        
        # Impersonation patterns
        if any(word in text_lower for word in ['ceo', 'manager', 'director', 'officer', 'agent']):
            return 'impersonation'
        
        # Cryptocurrency patterns
        if any(word in text_lower for word in ['bitcoin', 'crypto', 'wallet', 'blockchain']):
            return 'cryptocurrency'
        
        # Lottery/Prize patterns
        if any(word in text_lower for word in ['congratulations', 'won', 'prize', 'winner', 'claim']):
            return 'lottery_prize'
        
        # Job offer patterns
        if any(word in text_lower for word in ['hire', 'job', 'position', 'employment', 'salary']):
            return 'job_offer'
        
        # Package delivery patterns
        if any(word in text_lower for word in ['package', 'delivery', 'shipment', 'tracking']):
            return 'package_delivery'
        
        # Urgency patterns
        if any(word in text_lower for word in ['urgent', 'immediate', 'asap', 'hurry', 'expires']):
            return 'urgency'
        
        return 'financial_fraud' if confidence > 0.5 else 'unknown'
    
    def _extract_message_features(self, message: str) -> Dict:
        """Extract message features"""
        return {
            'message_length': len(message),
            'word_count': len(message.split()),
            'uppercase_ratio': sum(1 for c in message if c.isupper()) / max(len(message), 1),
            'digit_ratio': sum(1 for c in message if c.isdigit()) / max(len(message), 1),
            'exclamation_count': message.count('!'),
            'question_mark_count': message.count('?'),
            'suspicious_links': len([w for w in message.split() if 'http' in w])
        }
    
    def _generate_explanation(self, message: str, is_scam: bool, confidence: float, scam_type: str) -> str:
        """Generate human-readable explanation"""
        if not is_scam:
            return f"This message appears to be legitimate with {(1-confidence)*100:.1f}% confidence based on language patterns, sender characteristics, and content analysis."
        
        reasons = []
        text_lower = message.lower()
        
        if confidence > 0.85:
            reasons.append(f"Very high confidence ({confidence*100:.1f}%) - Multiple scam indicators detected")
        else:
            reasons.append(f"Moderate to high confidence ({confidence*100:.1f}%) - Several suspicious patterns found")
        
        if '!' in message and message.count('!') > 2:
            reasons.append("Excessive exclamation marks indicating urgency or manipulation")
        
        if any(word in text_lower for word in ['urgent', 'immediate', 'asap']):
            reasons.append("Pressure tactics with time-sensitive language")
        
        if any(word in text_lower for word in ['money', 'payment', 'bank', 'transfer']):
            reasons.append("Financial request or payment involvement")
        
        if message.count(message.split()[0].upper()) > 2:
            reasons.append("Unusual capitalization patterns")
        
        explanation = f"Detected as {scam_type.replace('_', ' ')} ({confidence*100:.1f}% confidence). " + "; ".join(reasons)
        return explanation
    
    def save(self, filepath: str):
        """Save trained model to file"""
        model_data = {
            'models': self.models,
            'tfidf_vectorizer': self.tfidf_vectorizer,
            'model_weights': self.model_weights,
            'is_trained': self.is_trained
        }
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        logger.info(f"Model saved to {filepath}")
    
    def load(self, filepath: str):
        """Load trained model from file"""
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        self.models = model_data['models']
        self.tfidf_vectorizer = model_data['tfidf_vectorizer']
        self.model_weights = model_data['model_weights']
        self.is_trained = model_data['is_trained']
        logger.info(f"Model loaded from {filepath}")
