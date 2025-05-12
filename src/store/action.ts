import { createAction } from '@reduxjs/toolkit';

const selectCity = createAction<{cityName: string}>('selectCity');
const filterOffers = createAction('filterOffers');

export { selectCity, filterOffers };
