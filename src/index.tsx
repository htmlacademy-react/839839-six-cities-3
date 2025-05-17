import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/app/app';
import { AuthorizationStatus } from './const';
import { Provider } from 'react-redux';
import { store } from './store';

const isAuth = AuthorizationStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        authorizationStatus={isAuth}
      />
    </Provider>
  </React.StrictMode>
);
