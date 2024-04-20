import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import Cities from './Cities.jsx'
import './index.css'
import YourComponent from './YourComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <YourComponent />
  </React.StrictMode>,
)
