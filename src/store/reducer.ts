import { createReducer } from '@reduxjs/toolkit';
import { DestinationCities } from '../const';
import { offers } from '../mocks/offers';
import { selectCity } from './action';

const initialCity = DestinationCities[0];

const initialState = {
  cityName: initialCity,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
    });
});

export { reducer };
