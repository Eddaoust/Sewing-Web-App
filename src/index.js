import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Create redux Store
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/index'
// Material UI Theming
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import './index.css';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const font = "'Comfortaa'";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2C58B5',
        },
        secondary: {
            main: '#42CAA4',
        }
    },
    typography: {
        fontFamily: font,
        h6: {
            fontSize: 35,
            fontWeight: "bold",
        }
    },
});

ReactDOM.render(
      <MuiThemeProvider theme={theme}>
          <Provider store={store}>
              <App/>
          </Provider>
      </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
