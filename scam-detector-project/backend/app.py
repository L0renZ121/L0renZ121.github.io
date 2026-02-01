"""
Flask API Application - Main Entry Point
"""

from flask import Flask, jsonify
from flask_cors import CORS
import logging
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config import get_config
from routes import api_bp
from ml_model.detector import ScamDetector

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def create_app(config=None):
    """Application factory"""
    
    # Create Flask app
    app = Flask(__name__)
    
    # Load configuration
    if config is None:
        config = get_config()
    app.config.from_object(config)
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Initialize detector
    initialize_detector(app)
    
    # Register blueprints
    app.register_blueprint(api_bp)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({'error': 'Method not allowed'}), 405
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    # Root endpoint
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({
            'message': 'AI Scam Message Detector API',
            'version': '1.0.0',
            'docs': '/api/docs',
            'health': '/api/health'
        }), 200
    
    logger.info("Flask app created successfully")
    return app


def initialize_detector(app):
    """Initialize the scam detector model"""
    try:
        logger.info("Initializing scam detector...")
        
        detector = ScamDetector()
        
        # Try to load pre-trained model
        model_path = app.config.get('MODEL_PATH')
        if os.path.exists(model_path):
            logger.info(f"Loading model from {model_path}")
            detector.load(model_path)
            logger.info("Model loaded successfully")
        else:
            logger.warning(f"No pre-trained model found at {model_path}")
            logger.info("Using detector with default configuration")
        
        # Make detector available globally in routes
        import routes
        routes.detector = detector
        
        logger.info("Scam detector initialized")
    
    except Exception as e:
        logger.error(f"Failed to initialize detector: {str(e)}")
        # Continue without detector - API will return error


if __name__ == '__main__':
    app = create_app()
    
    # Run development server
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    
    logger.info(f"Starting Flask server on port {port}")
    logger.info(f"Debug mode: {debug}")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug,
        use_reloader=debug
    )
