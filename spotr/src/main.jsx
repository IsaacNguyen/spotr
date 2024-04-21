import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';
import Login from './components/Login.jsx';
import Dashboard from './components/App.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function Root() {
  // Define username state here
  const [username, setUsername] = useState('');
  //const api_key = process.env.REACT_APP_GOOGLE_MAPS_API;
  //console.log(api_key)

  return (
    <Router>
      <React.StrictMode>
        <Routes>
          {/* Pass setUsername to Login component */}
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          {/* Pass username to Dashboard component */}
          <Route path="/dashboard" element={<Dashboard username={username} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </React.StrictMode>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);