import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OffersType } from '../types/offers';
import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { loadComments, loadFavorites, loadNearbyOffers, loadOfferById, loadOffers, redirectToRoute, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthDataType } from '../types/auth-data';
import { UserDataType } from '../types/user-data';
import { store } from './index';
import { OfferByIdType } from '../types/offer-by-id';
import { CommentsType } from '../types/comments';
import { FeedbackType } from '../types/feedback';
import { processErrorHandle } from '../services/process-error-handle';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OffersType>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferByIdType>(`${APIRoute.Offers}/${offerId}`);
    dispatch(loadOfferById(data));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersType>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void,
  string | undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<CommentsType>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadComments(data));
  }
);


export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersType>(APIRoute.Favorite);
    dispatch(loadFavorites(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async(_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  },
);

export const postCommentAction = createAsyncThunk<void,
  [string | undefined, FeedbackType],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/postComment',
  async ([offerId, comment], {extra: api}) => {
    await api.post<FeedbackType>(`${APIRoute.Comments}/${offerId}`, comment);
  }
);

export const setFavoriteStatusAction = createAsyncThunk<void,
  [string | undefined, number],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/setFavoriteStatus',
    async ([offerId, status], {dispatch, getState, extra: api }) => {
      const { authorizationStatus } = getState();

      if (authorizationStatus !== AuthorizationStatus.Auth) {
        dispatch(redirectToRoute(AppRoute.Login));
        return;
      }

      try {
        await api.post<OfferByIdType>(`${APIRoute.Favorite}/${offerId}/${status}`);
        dispatch(fetchFavoritesAction());
        dispatch(fetchOfferByIdAction(offerId));
        dispatch(fetchOffersAction());
      } catch(error) {
        processErrorHandle(String(error));
      }
    }
  );
