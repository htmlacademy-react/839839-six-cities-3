import { MouseEventHandler } from 'react';
import { store } from '../store';
import { fetchFavoritesAction, fetchOfferByIdAction, fetchOffersAction, setFavoriteStatusAction } from '../store/api-actions';
import { selectCity } from '../store/app-params/app-params';
import { processErrorHandle } from '../services/process-error-handle';
import { AppRoute, AuthorizationStatus } from '../const';

const getRatingPercentage = (rating: number): number =>
  Math.round(rating) * 20;

const handleCityClick = (cityName: string) => () => {
  store.dispatch(selectCity(cityName));
};

const handleFavoriteClick = (
  offerId: string,
  status: number,
  authorizationStatus: AuthorizationStatus,
  navigate: (path: string) => void,
): MouseEventHandler<HTMLButtonElement> => (evt) => {
  evt.preventDefault();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    navigate(AppRoute.Login);
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

export {getRatingPercentage, handleCityClick, handleFavoriteClick, getRandomInt};
