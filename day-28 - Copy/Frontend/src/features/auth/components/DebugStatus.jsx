import { useState, useEffect } from 'react';
import '../styles/debug.css';

export default function DebugStatus() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [message, setMessage] = useState('Checking backend connection...');

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      console.log('🔍 Testing backend connection to http://localhost:3000/api/health');
      
      const response = await fetch('http://localhost:3000/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✓ Backend connection successful:', data);
        setBackendStatus('connected');
        setMessage('✓ Backend is running on http://localhost:3000');
      } else {
        console.log('✗ Backend response error:', response.status);
        setBackendStatus('error');
        setMessage(`✗ Backend returned error: ${response.status}`);
      }
    } catch (error) {
      console.error('✗ Backend connection failed:', error.message);
      setBackendStatus('disconnected');
      setMessage(`✗ Cannot connect to backend. Error: ${error.message}`);
    }
  };

  return (
    <div className={`debug-status ${backendStatus}`}>
      <h3>Backend Status</h3>
      <div className="status-indicator">
        <span className={`dot ${backendStatus}`}></span>
        <span className="status-text">{message}</span>
      </div>
      <button onClick={checkBackendConnection} className="retry-btn">
        Retry Connection
      </button>
      
      <div className="debug-info">
        <h4>Troubleshooting:</h4>
        <ul>
          <li>✓ Ensure backend is running: <code>cd Backend && npm run dev</code></li>
          <li>✓ Check backend is on port 3000</li>
          <li>✓ Ensure CORS is enabled in Backend/src/app.js</li>
          <li>✓ Check .env file exists with MONGO_URI and JWT_SECRET</li>
          <li>✓ MongoDB connection should be available</li>
        </ul>
      </div>
    </div>
  );
}
