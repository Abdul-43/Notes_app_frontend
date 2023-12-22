import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "../node_modules/bootstrap/js/dist/util"
// import "../node_modules/bootstrap/js/dist/modal.js"
import "react-datepicker/dist/react-datepicker.js"
// import "react-datepicker/dist/react-datepicker.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)
