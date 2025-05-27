import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
