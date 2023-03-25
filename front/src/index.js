import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.onload = function() {
  sessionStorage.clear();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);