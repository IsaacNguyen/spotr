import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Button from './Button.jsx'
import './index.css'
import ParentComponent from './ParentComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
