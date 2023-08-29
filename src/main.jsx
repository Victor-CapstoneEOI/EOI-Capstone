import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FormTest from './components/formTest.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormTest />
    <App />
  </React.StrictMode>,
)
