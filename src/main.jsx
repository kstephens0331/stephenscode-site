import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { CartProvider } from './context/CartContext'; // ✅ import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* ✅ wrap App inside CartProvider */}
      <Router>
        <App />
      </Router>
    </CartProvider>
  </React.StrictMode>
);
