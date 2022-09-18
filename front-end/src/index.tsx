import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing';
import './style/Login.css';
import './style/Home.css';
import './style/Register.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});


root.render(
  <ApolloProvider client = { client }>
    <React.StrictMode>
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet"></link>
    <Router>
      <Routing />
    </Router>
  </React.StrictMode>
  </ApolloProvider>
);


