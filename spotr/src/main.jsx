import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
// import ParentComponent from './ParentComponent.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/App.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <React.StrictMode>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </React.StrictMode>,
  </Router>
)
