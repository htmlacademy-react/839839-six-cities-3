import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SortOrder } from '../const';
import { OffersType } from '../types/offers';
import { UserData } from '../types/user-data';

export const selectCity = createAction<string>('data/selectCity');

export const selectSortOrder = createAction<SortOrder>('data/selectSortOrder');

export const loadOffers = createAction<OffersType>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setUserData = createAction<UserData | null>('user/userData');
