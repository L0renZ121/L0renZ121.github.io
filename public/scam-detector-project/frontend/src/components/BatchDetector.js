import React, { useState } from 'react';
import '../styles/BatchDetector.css';

function BatchDetector({ onDetect, loading }) {
  const [messages, setMessages] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageList = messages
      .split('\n')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    if (messageList.length > 0) {
      onDetect(messageList);
    }
  };

  return (
    <div className="batch-detector">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="batch-messages">Enter Messages (one per line):</label>
          <textarea
            id="batch-messages"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Enter multiple messages, one per line..."
            disabled={loading}
            rows="10"
          />
          <div className="message-count">
            {messages.split('\n').filter(m => m.trim()).length} messages
          </div>
        </div>

        <button type="submit" disabled={loading || !messages.trim()} className="detect-button">
          {loading ? 'Analyzing...' : 'Analyze All Messages'}
        </button>
      </form>
    </div>
  );
}

export default BatchDetector;
