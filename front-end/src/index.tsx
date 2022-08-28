import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing';
import './style/Login.css';
import './style/Home.css';
import './style/Register.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet"></link>
    <Router>
      <Routing />
    </Router>
  </React.StrictMode>
);


