import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DestinationCities, SortOrder } from '../const';
import { loadOffers, requireAuthorization, selectCity, selectSortOrder, setError, setOffersDataLoadingStatus } from './action';
import { OffersType } from '../types/offers';

const initialCity = DestinationCities[0];

type initialStateType = {
  cityName: string;
  offers: OffersType;
  sortOrder: SortOrder;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  cityName: initialCity,
  offers: [],
  sortOrder: SortOrder.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(selectSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
