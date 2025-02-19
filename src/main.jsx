import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // 确保样式被加载
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
