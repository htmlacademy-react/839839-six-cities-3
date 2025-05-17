import { createReducer } from '@reduxjs/toolkit';
import { DestinationCities, SortOrder } from '../const';
import { offers } from '../mocks/offers';
import { selectCity, selectSortOrder } from './action';

const initialCity = DestinationCities[0];

const initialState = {
  cityName: initialCity,
  offers: offers,
  sortOrder: SortOrder.Popular as SortOrder,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(selectSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    });
});

export { reducer };
