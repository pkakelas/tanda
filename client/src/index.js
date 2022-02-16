import 'bootstrap/dist/css/bootstrap.css';
import './static/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = 'themeValentine'

// meh
document.body.id = 'background'
document.body.className = theme

ReactDOM.render(
  <React.StrictMode>
    <App theme={theme} />
  </React.StrictMode>,
  document.getElementById('root')
);
