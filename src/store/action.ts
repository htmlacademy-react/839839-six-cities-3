import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortOrder } from '../const';
import { OffersType } from '../types/offers';

export const selectCity = createAction<string>('data/selectCity');

export const selectSortOrder = createAction<SortOrder>('data/selectSortOrder');

export const loadOffers = createAction<OffersType>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');
