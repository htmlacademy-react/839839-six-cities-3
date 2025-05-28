import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchCommentsAction, fetchFavoritesAction, fetchNearbyOffersAction, fetchOfferByIdAction, fetchOffersAction, postCommentAction, setFavoriteStatusAction } from '../api-actions';
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
  isCommentFormDisabled: boolean;
}

const initialState: initialStateType = {
  offers: [],
  isOffersDataLoading: false,
  error: null,
  favorites: [],
  offerById: null,
  nearbyOffers: [],
  comments: [],
  isCommentFormDisabled: false,
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
      })
      .addCase(setFavoriteStatusAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(setFavoriteStatusAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(setFavoriteStatusAction.fulfilled, (state, action) => {
        state.offers = state.offers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );
        if (state.offerById?.id === action.payload.id) {
          state.offerById = action.payload;
        }
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentFormDisabled = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isCommentFormDisabled = false;
        state.comments.unshift(action.payload);
      });
  }
});
