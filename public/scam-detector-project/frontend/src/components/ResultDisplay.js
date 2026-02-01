import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import '../styles/ResultDisplay.css';

function ResultDisplay({ result }) {
  if (result.batch) {
    return <BatchResultDisplay result={result} />;
  }

  const getRiskColor = (level) => {
    const colors = {
      critical: '#d32f2f',
      high: '#f57c00',
      medium: '#fbc02d',
      low: '#388e3c'
    };
    return colors[level] || '#757575';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.85) return '#d32f2f';
    if (confidence > 0.70) return '#f57c00';
    if (confidence > 0.50) return '#fbc02d';
    return '#388e3c';
  };

  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="result-display">
      <div className={`result-header ${result.is_scam ? 'scam' : 'legitimate'}`}>
        {result.is_scam ? (
          <>
            <FiAlertTriangle className="result-icon warning" />
            <h2>⚠️ Scam Detected</h2>
          </>
        ) : (
          <>
            <FiCheckCircle className="result-icon success" />
            <h2>✓ Appears Legitimate</h2>
          </>
        )}
      </div>

      <div className="result-content">
        <div className="confidence-section">
          <h3>Confidence Score</h3>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{
                width: `${confidencePercent}%`,
                backgroundColor: getConfidenceColor(result.confidence)
              }}
            />
          </div>
          <p className="confidence-text">{confidencePercent}% Confidence</p>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <h4>Scam Type</h4>
            <p className="detail-value">{result.scam_type.replace('_', ' ')}</p>
          </div>

          <div className="detail-card">
            <h4>Risk Level</h4>
            <p
              className="detail-value"
              style={{ color: getRiskColor(result.risk_level) }}
            >
              {result.risk_level.toUpperCase()}
            </p>
          </div>

          <div className="detail-card">
            <h4>Model Consensus</h4>
            <div className="model-breakdown">
              {Object.entries(result.confidence_breakdown).map(([model, conf]) => (
                <div key={model} className="model-item">
                  <span>{model.replace('_', ' ')}</span>
                  <span className="model-confidence">{Math.round(conf * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="explanation-section">
          <h3>Analysis Explanation</h3>
          <p>{result.explanation}</p>
        </div>

        {result.features && (
          <div className="features-section">
            <h3>Message Features</h3>
            <div className="features-grid">
              {Object.entries(result.features).map(([key, value]) => (
                <div key={key} className="feature-item">
                  <span className="feature-name">{key.replace(/_/g, ' ')}</span>
                  <span className="feature-value">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BatchResultDisplay({ result }) {
  const { summary, results } = result;

  return (
    <div className="batch-result-display">
      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Messages</h4>
          <p className="summary-value">{summary.total}</p>
        </div>
        <div className="summary-card scam">
          <h4>Scams Detected</h4>
          <p className="summary-value">{summary.scams_detected}</p>
        </div>
        <div className="summary-card legitimate">
          <h4>Legitimate</h4>
          <p className="summary-value">{summary.legitimate_detected}</p>
        </div>
        <div className="summary-card">
          <h4>Average Confidence</h4>
          <p className="summary-value">{Math.round(summary.average_confidence * 100)}%</p>
        </div>
        <div className="summary-card">
          <h4>Scam Rate</h4>
          <p className="summary-value">{Math.round(summary.scam_rate * 100)}%</p>
        </div>
      </div>

      <div className="results-table">
        <h3>Detailed Results</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Confidence</th>
              <th>Type</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx} className={r.is_scam ? 'scam-row' : 'legitimate-row'}>
                <td>{idx + 1}</td>
                <td>{r.is_scam ? '⚠️ Scam' : '✓ Legitimate'}</td>
                <td>{Math.round(r.confidence * 100)}%</td>
                <td>{r.scam_type.replace('_', ' ')}</td>
                <td>{r.risk_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultDisplay;
