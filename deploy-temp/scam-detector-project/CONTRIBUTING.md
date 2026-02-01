# Contributing Guidelines

## Welcome! 👋

Thank you for your interest in contributing to the AI Scam Message Detector project. This document provides guidelines and instructions for contributing.

## How to Contribute

### 1. Report Issues

If you find a bug or have a feature request:

1. Check existing issues to avoid duplicates
2. Create a new issue with a clear title and description
3. Include steps to reproduce (for bugs)
4. Add relevant labels (bug, feature, documentation)

### 2. Submit Pull Requests

#### Before You Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write tests for new features
5. Run tests: `pytest tests/ -v`
6. Check code style: `flake8 backend/ ml_model/`

#### PR Process

1. Push to your fork
2. Submit a pull request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots (if UI changes)
   - Test results

3. Address review feedback
4. Ensure CI/CD passes
5. Wait for approval and merge

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/AI-Scam-Message-Detector.git
cd AI-Scam-Message-Detector

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development tools
pip install pytest black flake8 mypy

# Run tests
pytest tests/ -v
```

## Code Style Guidelines

### Python

- Follow PEP 8
- Use type hints
- Maximum line length: 100 characters
- Use meaningful variable names

```python
# Good
def detect_scam_message(message: str) -> Dict[str, Any]:
    """Detect if message is a scam."""
    result = model.predict(message)
    return result

# Avoid
def ds(m):
    r = m.pred()
    return r
```

### JavaScript/React

- Use ES6+ features
- Use functional components
- Use React hooks
- Keep components small and focused

```javascript
// Good
function MessageAnalyzer({ message }) {
  const [result, setResult] = useState(null);
  
  return (
    <div className="analyzer">
      {/* Component logic */}
    </div>
  );
}

// Avoid
const MessageAnalyzer = function(props) {
  // Class component for simple logic
  // Very large component
};
```

## Testing Requirements

- Add tests for all new features
- Maintain or improve code coverage
- Test edge cases and error conditions
- Use descriptive test names

```python
def test_detect_scam_with_urgency_keywords():
    """Test detection of scam messages with urgency keywords."""
    detector = ScamDetector()
    detector.train(training_messages, training_labels)
    
    message = "URGENT: Verify your account immediately!"
    result = detector.detect(message)
    
    assert result['is_scam'] is True
    assert result['confidence'] > 0.7
    assert 'urgency' in result['scam_type']
```

## Documentation

- Update README.md for new features
- Add docstrings to functions
- Include usage examples
- Document configuration options

```python
def detect(self, message: str) -> Dict[str, Any]:
    """
    Detect if a message is a scam.
    
    Args:
        message: The text message to analyze
        
    Returns:
        Dict containing:
            - is_scam: Boolean indicating if message is scam
            - confidence: Float between 0-1
            - scam_type: String indicating scam category
            - explanation: Human-readable explanation
            
    Raises:
        ValueError: If message is empty or too long
        
    Examples:
        >>> detector = ScamDetector()
        >>> result = detector.detect("Free money now!")
        >>> print(result['is_scam'])
        True
    """
```

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
fix: correct detection accuracy for phishing scams
feat: add batch analysis endpoint
docs: update API documentation
test: add tests for preprocessor
refactor: optimize ensemble model voting
```

Format: `<type>: <subject>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactor
- `test`: Tests
- `chore`: Build, dependencies

## Performance Optimization

### Backend

- Profile code with cProfile
- Use async/await for I/O operations
- Cache model predictions
- Optimize database queries

```python
# Use connection pooling
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://...',
    poolclass=QueuePool,
    pool_size=10
)
```

### Frontend

- Use React.memo for pure components
- Implement code splitting
- Lazy load heavy components
- Optimize bundle size

```javascript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Security Considerations

- Never commit secrets or credentials
- Validate all user input
- Use parameterized queries
- Keep dependencies updated
- Follow OWASP guidelines

```python
# Good: Parameterized query
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))

# Bad: String concatenation
query = f"SELECT * FROM users WHERE id = {user_id}"
cursor.execute(query)
```

## Review Process

1. Code review by maintainers
2. Automated tests (GitHub Actions)
3. Coverage check (> 80%)
4. Performance review (if applicable)
5. Approval and merge

## Areas for Contribution

### High Priority

- [ ] Multi-language support (Spanish, French, Chinese)
- [ ] BERT-based transformer models
- [ ] Real-time message streaming
- [ ] Mobile app (React Native)
- [ ] Browser extension

### Medium Priority

- [ ] Advanced analytics dashboard
- [ ] User feedback integration
- [ ] A/B testing framework
- [ ] API rate limiting improvements
- [ ] Kubernetes deployment

### Low Priority

- [ ] Documentation improvements
- [ ] Code examples
- [ ] Tutorial videos
- [ ] Use case studies

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Credited in release notes
- Featured in quarterly reports
- Eligible for rewards program

## Questions?

- Open a discussion in GitHub Discussions
- Check existing documentation
- Ask on the development channel
- Email: dev@scamdetector.ai

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making the AI Scam Message Detector better! 🚀
