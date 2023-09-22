import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';

import './assets/styles/main.scss';

import Auth from './reducers/containers';

import store from './reducers/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth>
          <App />
        </Auth>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


