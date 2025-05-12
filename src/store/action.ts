import { createAction } from '@reduxjs/toolkit';

const selectCity = createAction<string>('selectCity');
const filterOffers = createAction('filterOffers');

export { selectCity, filterOffers };
