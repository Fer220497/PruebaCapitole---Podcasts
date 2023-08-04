import React from 'react';
import { Provider } from 'react-redux';
//import Market from './containers/Market/Market'
import reportWebVitals from './reportWebVitals';
import './index.css';
import ReactDOM from 'react-dom';
//import {  createTheme } from '@mui/material';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import podcastReducer from './shared/redux/reducers/podcasts/podcasts-reducer'
import createSagaMiddleware from 'redux-saga';
import { watchPodcasts } from '../src/shared/redux/sagas/podcasts/index'

import App from './app/App'
const sagaMiddleWare = createSagaMiddleware();
const rootReducer = combineReducers({
  podcastReducer,
})
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWare),
  preloadedState: {
    podcastReducer: {
      podcastList: [],
      podcastDetails: {},
      episodesList: [],
      episodesLoading: {},
      episodeDetails: {}
    }
  }
});

sagaMiddleWare.run(watchPodcasts)

/*const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 1000,
      md: 1200,
      lg: 1500,
      xl: 1700
    }
  },
  palette: {
    primary: {
      main: '#8cbf00',
      contrastText: '#ffffff',

    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    disabled: {
      main: '#9c9e96',
      contrastText: '#ffffff',
    }
  },
  typography: {
    body1: {
      fontFamily: 'Open Sans',
    }
  }
});*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
