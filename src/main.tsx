import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ReactGA from "react-ga4";
import './index.css'

// const measurementId = import.meta.env.VITE_MEASUREMENT_ID
// ReactGA.initialize(measurementId)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
