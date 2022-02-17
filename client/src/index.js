import 'bootstrap/dist/css/bootstrap.css';
import './static/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Webmaster from './Webmaster';

const theme = 'themeValentine'

// meh
document.body.id = 'background'
document.body.className = theme

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App theme={theme} />} />
        <Route path="/dj" element={<Webmaster />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
