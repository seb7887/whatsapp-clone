import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles/main.scss';
import App from './App';
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
