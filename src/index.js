import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // ✅ Import Redux Provider
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom'; // ✅ Use BrowserRouter or RouterProvider properly

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
);

reportWebVitals();
