import React, { useState } from 'react';
import { FiSearch, FiLoader } from 'react-icons/fi';
import '../styles/DetectionForm.css';

function DetectionForm({ onDetect, loading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onDetect(message);
    }
  };

  const handleExample = (exampleText) => {
    setMessage(exampleText);
  };

  return (
    <div className="detection-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Enter Message to Analyze:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste your message here... (max 5000 characters)"
            maxLength="5000"
            disabled={loading}
            rows="6"
          />
          <div className="char-count">{message.length}/5000</div>
        </div>

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="detect-button"
        >
          {loading ? (
            <>
              <FiLoader className="spinner" />
              Analyzing...
            </>
          ) : (
            <>
              <FiSearch />
              Detect Scam
            </>
          )}
        </button>
      </form>

      <div className="examples">
        <h3>Try Examples:</h3>
        <div className="example-buttons">
          <button
            className="example-btn scam"
            onClick={() => handleExample("Congratulations! You've won $1,000,000! Click here to claim your prize immediately!!!")}
          >
            Scam Example 1
          </button>
          <button
            className="example-btn scam"
            onClick={() => handleExample("URGENT: Verify your bank account now or it will be closed forever!")}
          >
            Scam Example 2
          </button>
          <button
            className="example-btn legitimate"
            onClick={() => handleExample("Hi! Can we schedule a meeting tomorrow at 2 PM to discuss the project?")}
          >
            Legitimate Example
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetectionForm;
