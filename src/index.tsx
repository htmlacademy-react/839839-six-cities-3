import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={Setting.OffersCount}
      offersData={offers}
      commentsData={comments}
    />
  </React.StrictMode>
);
