import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import '../styles/Analytics.css';

function Analytics({ stats }) {
  if (!stats) {
    return <div className="analytics">Loading analytics...</div>;
  }

  return (
    <div className="analytics">
      <h2>Platform Analytics & Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Messages Analyzed</h3>
          <p className="stat-value">{stats.total_messages_analyzed.toLocaleString()}</p>
        </div>

        <div className="stat-card warning">
          <h3>Scams Detected</h3>
          <p className="stat-value">{stats.scams_detected.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Detection Accuracy</h3>
          <p className="stat-value">{stats.detection_accuracy.toFixed(1)}%</p>
        </div>

        <div className="stat-card">
          <h3>False Positive Rate</h3>
          <p className="stat-value">{stats.false_positive_rate.toFixed(2)}%</p>
        </div>

        <div className="stat-card">
          <h3>Average Confidence</h3>
          <p className="stat-value">{(stats.average_confidence * 100).toFixed(1)}%</p>
        </div>

        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-value">{stats.active_users.toLocaleString()}</p>
        </div>

        <div className="stat-card warning">
          <h3>Last 24H Scams</h3>
          <p className="stat-value">{stats.last_24h_scams.toLocaleString()}</p>
        </div>
      </div>

      <div className="trends-section">
        <h3>Trending Scam Types (24H)</h3>
        <div className="trends-list">
          {stats.trending_scam_types && stats.trending_scam_types.map((trend, idx) => (
            <div key={idx} className="trend-item">
              <span className="trend-type">{trend.type.replace('_', ' ')}</span>
              <div className="trend-bar">
                <div
                  className="trend-fill"
                  style={{
                    width: `${(trend.count / stats.last_24h_scams) * 100}%`
                  }}
                />
              </div>
              <span className="trend-count">{trend.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3>Model Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span>Algorithm</span>
            <strong>Ensemble Learning</strong>
          </div>
          <div className="info-item">
            <span>Models</span>
            <strong>Naive Bayes, Random Forest, XGBoost</strong>
          </div>
          <div className="info-item">
            <span>Training Samples</span>
            <strong>15,000+ messages</strong>
          </div>
          <div className="info-item">
            <span>Languages</span>
            <strong>English</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
