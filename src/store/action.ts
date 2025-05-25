import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SortOrder } from '../const';
import { OffersType } from '../types/offers';
import { UserDataType } from '../types/user-data';
import { OfferByIdType } from '../types/offer-by-id';
import { CommentsType } from '../types/comments';
import { FeedbackType } from '../types/feedback';

export const selectCity = createAction<string>('data/selectCity');

export const selectSortOrder = createAction<SortOrder>('data/selectSortOrder');

export const loadOffers = createAction<OffersType>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setUserData = createAction<UserDataType | null>('user/userData');

export const loadFavorites = createAction<OffersType>('user/loadFavorites');

export const loadOfferById = createAction<OfferByIdType>('data/loadOfferById');

export const loadNearbyOffers = createAction<OffersType>('data/loadNearbyOffers');

export const loadComments = createAction<CommentsType>('data/loadComments');

export const postComment = createAction<FeedbackType | null>('data/postComment');
