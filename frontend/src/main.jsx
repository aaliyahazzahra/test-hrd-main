import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Ini CSS (Sudah ada) - Biar tampilan bagus
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. TAMBAHKAN INI (JS) - Biar tombol di HP bisa dipencet
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)