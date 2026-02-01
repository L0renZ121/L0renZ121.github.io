import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import DetectionForm from './components/DetectionForm';
import ResultDisplay from './components/ResultDisplay';
import Analytics from './components/Analytics';
import BatchDetector from './components/BatchDetector';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('single');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/statistics');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch statistics', err);
    }
  };

  const handleDetect = async (message) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('/api/detect', { message });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze message');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchDetect = async (messages) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('/api/detect-batch', { messages });
      setResult({ batch: true, ...response.data });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => setActiveTab('single')}
          >
            Single Message
          </button>
          <button
            className={`tab-button ${activeTab === 'batch' ? 'active' : ''}`}
            onClick={() => setActiveTab('batch')}
          >
            Batch Analysis
          </button>
          <button
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {activeTab === 'single' && (
          <>
            <DetectionForm onDetect={handleDetect} loading={loading} />
            {result && !result.batch && <ResultDisplay result={result} />}
          </>
        )}

        {activeTab === 'batch' && (
          <>
            <BatchDetector onDetect={handleBatchDetect} loading={loading} />
            {result && result.batch && <ResultDisplay result={result} />}
          </>
        )}

        {activeTab === 'analytics' && <Analytics stats={stats} />}
      </div>
    </div>
  );
}

export default App;
