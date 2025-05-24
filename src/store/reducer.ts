import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DestinationCities, SortOrder } from '../const';
import { loadComments, loadFavorites, loadNearbyOffers, loadOfferById, loadOffers, requireAuthorization, selectCity, selectSortOrder, setError, setOffersDataLoadingStatus, setUserData } from './action';
import { OffersType } from '../types/offers';
import { UserDataType } from '../types/user-data';
import { OfferByIdType } from '../types/offer-by-id';
import { CommentsType } from '../types/comments';

const initialCity = DestinationCities[0];

type initialStateType = {
  cityName: string;
  offers: OffersType;
  sortOrder: SortOrder;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  userData: UserDataType | null;
  favorites: OffersType;
  offerById: OfferByIdType | null;
  nearbyOffers: OffersType;
  comments: CommentsType;
}

const initialState: initialStateType = {
  cityName: initialCity,
  offers: [],
  sortOrder: SortOrder.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  userData: null,
  favorites: [],
  offerById: null,
  nearbyOffers: [],
  comments: [],
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
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(loadOfferById, (state, action) => {
      state.offerById = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    });
});

export { reducer };
