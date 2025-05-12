import { createReducer } from '@reduxjs/toolkit';
import { DestinationCities } from '../const';
import { offers } from '../mocks/offers';
import { selectCity, filterOffers } from './action';

const initialCity = DestinationCities[0];

const initialState = {
  cityName: initialCity,
  offers: offers.filter((offer) => offer.city.name === initialCity),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload.cityName;
    })
    .addCase(filterOffers, (state) => {
      state.offers = offers.filter((offer) => offer.city.name === state.cityName);
    });
});

export { reducer };
