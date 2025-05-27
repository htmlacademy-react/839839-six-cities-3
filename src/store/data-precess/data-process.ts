import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchCommentsAction, fetchFavoritesAction, fetchNearbyOffersAction, fetchOfferByIdAction, fetchOffersAction } from '../api-actions';
import { OffersType } from '../../types/offers';
import { OfferByIdType } from '../../types/offer-by-id';
import { CommentsType } from '../../types/comments';
import { setError } from '../action';

type initialStateType = {
  offers: OffersType;
  isOffersDataLoading: boolean;
  error: string | null;
  favorites: OffersType;
  offerById: OfferByIdType | null;
  nearbyOffers: OffersType;
  comments: CommentsType;
}

const initialState: initialStateType = {
  offers: [],
  isOffersDataLoading: false,
  error: null,
  favorites: [],
  offerById: null,
  nearbyOffers: [],
  comments: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offerById = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
