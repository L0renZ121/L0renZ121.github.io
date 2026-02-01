"""
Training Pipeline - Data Loading and Model Training
"""

import numpy as np
import pandas as pd
from detector import ScamDetector
from preprocessor import TextPreprocessor
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_training_data():
    """Load and prepare training data"""
    logger.info("Loading training data...")
    
    # Sample training data - In production, use larger labeled datasets
    training_data = {
        'messages': [
            # Legitimate messages
            "Hi, can we schedule a meeting tomorrow at 2 PM?",
            "Your order has been shipped and will arrive in 3-5 business days",
            "The project deadline is next Friday. Please submit your report",
            "Weather looks nice today, let's have lunch together",
            "Here's the report you requested. Please review and provide feedback",
            
            # Phishing scams
            "Urgent! Verify your account immediately by clicking here: bit.ly/verify",
            "Your bank account has been compromised. Confirm your password now",
            "URGENT: Click to confirm your identity and update payment information",
            "Your account will be deleted in 24 hours. Act now!",
            "Suspicious activity detected. Verify your information immediately",
            
            # Financial fraud
            "Congratulations! You've won $1,000,000! Claim your prize here",
            "Make $5000/week from home! Easy money, no experience needed",
            "Western Union money transfer - Send $500 and receive $10,000 back",
            "Tax refund ready! Claim your $2,500 refund now at taxrefund.info",
            "Bitcoin millionaire club - Invest $100 and earn $10,000 daily",
            
            # Impersonation
            "Hi, it's your bank manager. Please confirm your account details",
            "Amazon Security: Your account access is restricted. Verify details",
            "PayPal Alert: Unusual activity. Contact us immediately",
            "IRS Notice: You have unpaid taxes. Payment required immediately",
            "Apple ID Security: Your account was used in China. Verify now",
            
            # Urgent/Manipulation
            "FINAL NOTICE! This is your last chance!!!",
            "ACT NOW - Limited offer expires in 2 hours!!!",
            "EXCLUSIVE DEAL - Only available today! DO NOT MISS OUT!",
            "Your membership expires tomorrow - RENEW NOW to keep access",
            "Emergency: Your credit card has been compromised - CALL US NOW",
            
            # Tech support scams
            "Your computer has a virus! Download our antivirus now: badsite.com",
            "Tech Support Alert: System malfunction detected. Call 1-800-XXX-XXXX",
            "ERROR: Your device is infected. Click here to clean it",
            "Warning: Microsoft detected illegal files. Contact support immediately",
            "Browser notification: Your PC has been compromised",
        ],
        'labels': [
            # Legitimate (0)
            0, 0, 0, 0, 0,
            # Phishing (1)
            1, 1, 1, 1, 1,
            # Financial (1)
            1, 1, 1, 1, 1,
            # Impersonation (1)
            1, 1, 1, 1, 1,
            # Urgent (1)
            1, 1, 1, 1, 1,
            # Tech support (1)
            1, 1, 1, 1, 1,
        ]
    }
    
    return training_data['messages'], np.array(training_data['labels'])


def train_scam_detector():
    """Train the scam detection model"""
    logger.info("Starting scam detector training...")
    
    # Load data
    messages, labels = load_training_data()
    logger.info(f"Loaded {len(messages)} training examples")
    logger.info(f"Scam: {np.sum(labels)} | Legitimate: {np.sum(labels == 0)}")
    
    # Initialize detector
    detector = ScamDetector()
    
    # Train model
    detector.train(messages, labels)
    
    # Evaluate on training data (simple sanity check)
    logger.info("Evaluating on training data...")
    correct = 0
    for msg, label in zip(messages, labels):
        result = detector.detect(msg)
        pred = 1 if result['confidence'] > 0.5 else 0
        if pred == label:
            correct += 1
    
    accuracy = correct / len(messages)
    logger.info(f"Training Accuracy: {accuracy*100:.1f}%")
    
    # Save model
    model_dir = 'models'
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'scam_detector_model.pkl')
    detector.save(model_path)
    logger.info(f"Model saved to {model_path}")
    
    return detector


def test_detector(detector):
    """Test the detector with sample messages"""
    logger.info("\n" + "="*80)
    logger.info("TESTING SCAM DETECTOR")
    logger.info("="*80 + "\n")
    
    test_cases = [
        ("Hi, can we meet tomorrow?", False),
        ("Congratulations! You've won $1,000,000! Click here to claim", True),
        ("Your account has been compromised. Verify password now!", True),
        ("The weather is beautiful today", False),
        ("URGENT: Tax refund ready! Claim $5000 immediately!!!", True),
    ]
    
    for message, expected_scam in test_cases:
        result = detector.detect(message)
        
        print(f"\nMessage: {message[:60]}...")
        print(f"Is Scam: {result['is_scam']} (Expected: {expected_scam})")
        print(f"Confidence: {result['confidence']:.2%}")
        print(f"Scam Type: {result['scam_type']}")
        print(f"Risk Level: {result['risk_level']}")
        print(f"Explanation: {result['explanation']}")
        print(f"Features: {result['features']}")
        print("-" * 80)


if __name__ == "__main__":
    # Train the model
    detector = train_scam_detector()
    
    # Test it
    test_detector(detector)
    
    logger.info("\nTraining complete! Model is ready for deployment.")
