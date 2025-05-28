import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  isFavoriteLoading: boolean;
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
  isFavoriteLoading: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOfferById: (state, action: PayloadAction<boolean>) => {
      if (state.offerById) {
        state.offerById.isFavorite = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
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
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoriteLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.isFavoriteLoading = false;
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
        const updatedOffer = action.payload;
        const index = state.favorites.findIndex((offer) => offer.id === updatedOffer.id);
        if (index >= 0) {
          state.favorites.splice(index, 1);
        } else {
          state.favorites.push(updatedOffer);
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

export const { loadOfferById } = dataProcess.actions;
