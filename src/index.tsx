import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/app/app';
import { AuthorizationStatus } from './const';
import { offers } from './mocks/offers';

const isAuth = AuthorizationStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersData={offers}
      authorizationStatus={isAuth}
    />
  </React.StrictMode>
);
