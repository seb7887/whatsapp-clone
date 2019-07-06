import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles/main.scss';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2c6157' },
    secondary: { main: '#6fd056' }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
