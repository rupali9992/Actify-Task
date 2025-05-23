// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import AddNewForm from './Add-new';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import mystore from './app/src';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={mystore}>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-new" element={<AddNewForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);

reportWebVitals();
