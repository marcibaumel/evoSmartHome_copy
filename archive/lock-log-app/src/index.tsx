import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}><BrowserRouter><Layout><App /></Layout></BrowserRouter></Provider>
  </React.StrictMode>

);

serviceWorkerRegistration.register();
reportWebVitals();
