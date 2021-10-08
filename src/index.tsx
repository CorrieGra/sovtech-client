import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import './index.css';
import { StoreProvider } from 'easy-peasy';
import App from './components/App/App';
import { store } from './store';

const client = new ApolloClient({
  uri: process.env.REACT_APP_DEFAULT_PORT,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ client }>
      <StoreProvider store={ store }>
        <Router>
          <App />
        </Router>
      </StoreProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
