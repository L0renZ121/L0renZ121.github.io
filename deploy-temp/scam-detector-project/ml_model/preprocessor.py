"""
ML Model - Text Preprocessing Module
Handles tokenization, cleaning, and feature extraction for scam detection
"""

import re
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import numpy as np
from typing import List, Dict, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')


class TextPreprocessor:
    """Preprocesses text data for ML model training and inference"""
    
    def __init__(self, use_lemmatization: bool = True, remove_stopwords: bool = True):
        self.lemmatizer = WordNetLemmatizer()
        self.use_lemmatization = use_lemmatization
        self.remove_stopwords = remove_stopwords
        self.stop_words = set(stopwords.words('english'))
        
    def clean_text(self, text: str) -> str:
        """
        Clean and normalize text
        - Convert to lowercase
        - Remove URLs
        - Remove email addresses
        - Remove special characters and numbers
        - Remove extra whitespace
        """
        if not isinstance(text, str):
            return ""
        
        text = text.lower()
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        # Remove email addresses
        text = re.sub(r'\S+@\S+', '', text)
        # Remove HTML tags
        text = re.sub(r'<.*?>', '', text)
        # Remove mentions and hashtags
        text = re.sub(r'[@#]\w+', '', text)
        # Remove numbers
        text = re.sub(r'\d+', '', text)
        # Remove special characters except spaces
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def tokenize(self, text: str) -> List[str]:
        """Tokenize text into words"""
        return word_tokenize(text)
    
    def lemmatize_tokens(self, tokens: List[str]) -> List[str]:
        """Lemmatize tokens"""
        return [self.lemmatizer.lemmatize(token) for token in tokens]
    
    def remove_stopwords_fn(self, tokens: List[str]) -> List[str]:
        """Remove common stopwords"""
        return [token for token in tokens if token not in self.stop_words]
    
    def preprocess(self, text: str) -> List[str]:
        """
        Full preprocessing pipeline
        Returns list of cleaned tokens ready for feature extraction
        """
        # Clean text
        cleaned = self.clean_text(text)
        
        # Tokenize
        tokens = self.tokenize(cleaned)
        
        # Lemmatize if enabled
        if self.use_lemmatization:
            tokens = self.lemmatize_tokens(tokens)
        
        # Remove stopwords if enabled
        if self.remove_stopwords:
            tokens = self.remove_stopwords_fn(tokens)
        
        # Remove empty tokens
        tokens = [t for t in tokens if len(t) > 0]
        
        return tokens


class ScamFeatureExtractor:
    """Extract hand-crafted features indicative of scam messages"""
    
    # Scam indicator patterns
    URGENCY_KEYWORDS = {
        'urgent', 'immediate', 'act now', 'immediately', 'expires', 'limited',
        'hurry', 'asap', 'quickly', 'time sensitive', 'deadline', 'exclusive',
        'final', 'last chance', 'must act', 'don\'t wait', 'verify', 'confirm'
    }
    
    FINANCIAL_KEYWORDS = {
        'money', 'dollars', 'cash', 'payment', 'credit card', 'bank', 'account',
        'transfer', 'wire', 'bitcoin', 'crypto', 'prize', 'award', 'inheritance',
        'tax refund', 'roi', 'investment', 'profit', 'claim', 'million', 'thousand'
    }
    
    IMPERSONATION_KEYWORDS = {
        'bank', 'amazon', 'apple', 'google', 'microsoft', 'paypal', 'ebay',
        'ceo', 'agent', 'officer', 'support', 'admin', 'manager', 'director',
        'executive', 'company', 'official'
    }
    
    SUSPICIOUS_PATTERNS = {
        'misspelled_words': {
            'recieve': 'receive', 'occured': 'occurred', 'seperate': 'separate',
            'definately': 'definitely', 'wich': 'which', 'lenght': 'length'
        },
        'common_typos': {
            'ur': 'your', 'pls': 'please', 'thx': 'thanks', 'u': 'you'
        }
    }
    
    @staticmethod
    def extract_features(text: str, tokens: List[str]) -> Dict[str, float]:
        """Extract all hand-crafted features from text"""
        features = {}
        
        text_lower = text.lower()
        
        # Length features
        features['message_length'] = len(text)
        features['word_count'] = len(tokens)
        features['avg_word_length'] = np.mean([len(w) for w in tokens]) if tokens else 0
        
        # Case features
        features['uppercase_ratio'] = sum(1 for c in text if c.isupper()) / max(len(text), 1)
        features['digit_ratio'] = sum(1 for c in text if c.isdigit()) / max(len(text), 1)
        
        # Urgency features
        urgency_matches = sum(1 for keyword in ScamFeatureExtractor.URGENCY_KEYWORDS 
                             if keyword in text_lower)
        features['urgency_score'] = min(urgency_matches / 5.0, 1.0)
        features['urgency_count'] = urgency_matches
        
        # Financial features
        financial_matches = sum(1 for keyword in ScamFeatureExtractor.FINANCIAL_KEYWORDS 
                               if keyword in text_lower)
        features['financial_score'] = min(financial_matches / 5.0, 1.0)
        features['financial_count'] = financial_matches
        
        # Impersonation features
        impersonation_matches = sum(1 for keyword in ScamFeatureExtractor.IMPERSONATION_KEYWORDS 
                                   if keyword in text_lower)
        features['impersonation_score'] = min(impersonation_matches / 3.0, 1.0)
        features['impersonation_count'] = impersonation_matches
        
        # Suspicious patterns
        features['suspicious_links'] = len(re.findall(r'http\S+|www\S+', text))
        features['email_count'] = len(re.findall(r'\S+@\S+', text))
        
        # Misspelling features
        misspellings = sum(1 for word in tokens 
                          if word in ScamFeatureExtractor.SUSPICIOUS_PATTERNS['misspelled_words'])
        features['misspelling_count'] = misspellings
        features['misspelling_ratio'] = misspellings / max(len(tokens), 1)
        
        # Punctuation features
        features['exclamation_count'] = text.count('!')
        features['question_mark_count'] = text.count('?')
        features['ellipsis_count'] = text.count('...')
        
        # Grammar & syntax
        features['has_all_caps_words'] = 1.0 if any(w.isupper() and len(w) > 1 for w in tokens) else 0.0
        features['special_char_count'] = sum(1 for c in text if c in string.punctuation)
        
        return features
