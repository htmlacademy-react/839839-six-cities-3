import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OffersType } from '../types/offers';
import { APIRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { redirectToRoute, setError } from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthDataType } from '../types/auth-data';
import { UserDataType } from '../types/user-data';
import { store } from './index';
import { OfferByIdType } from '../types/offer-by-id';
import { CommentsType, CommentType, NewCommentType } from '../types/comments';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<OffersType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OffersType>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferByIdAction = createAsyncThunk<OfferByIdType, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferByIdType>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<OffersType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OffersType>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<CommentsType,
  string | undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<CommentsType>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);


export const fetchFavoritesAction = createAsyncThunk<OffersType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OffersType>(APIRoute.Favorite);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserDataType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<UserDataType>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserDataType>(APIRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction());
  },
);

export const postCommentAction = createAsyncThunk<CommentType,
  NewCommentType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/postComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<CommentType>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  }
);

export const setFavoriteStatusAction = createAsyncThunk<OfferByIdType,
  [string, number],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/setFavoriteStatus',
    async ([offerId, status], {dispatch, extra: api }) => {
      const {data} = await api.post<OfferByIdType>(`${APIRoute.Favorite}/${offerId}/${status}`);
      dispatch(fetchFavoritesAction());
      dispatch(fetchOffersAction());
      return data;
    }
  );
