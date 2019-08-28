import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';

import App from './App';
import './styles/main.scss';
import client from './utils/client';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2c6157' },
    secondary: { main: '#6fd056' }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
