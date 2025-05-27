import { MouseEventHandler } from 'react';
import { store } from '../store';
import { fetchFavoritesAction, fetchOfferByIdAction, fetchOffersAction, setFavoriteStatusAction } from '../store/api-actions';
import { processErrorHandle } from '../services/process-error-handle';
import { AppRoute, AuthorizationStatus } from '../const';
import { redirectToRoute } from '../store/action';

const getRatingPercentage = (rating: number): number =>
  Math.round(rating) * 20;

const handleFavoriteClick = (
  offerId: string,
  status: number,
  authorizationStatus: AuthorizationStatus,
): MouseEventHandler<HTMLButtonElement> => (evt) => {
  evt.preventDefault();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    store.dispatch(redirectToRoute(AppRoute.Login));
    return;
  }

  store.dispatch(setFavoriteStatusAction([offerId, status]))
    .then(() => {
      store.dispatch(fetchFavoritesAction());
      store.dispatch(fetchOfferByIdAction(offerId));
      store.dispatch(fetchOffersAction());
    })
    .catch((error) => {
      processErrorHandle(String(error));
    });
};

function getRandomInt(min: number, max: number) {
  const roundedStart = Math.ceil(min);
  const roundedEnd = Math.floor(max);
  return Math.floor(Math.random() * (roundedStart - roundedEnd)) + roundedEnd;
}

export {getRatingPercentage, handleFavoriteClick, getRandomInt};
