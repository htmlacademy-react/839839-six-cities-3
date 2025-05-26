import { MouseEventHandler } from 'react';
import { store } from '../store';
import { fetchFavoritesAction, fetchOfferByIdAction, fetchOffersAction, setFavoriteStatusAction } from '../store/api-actions';
import { selectCity } from '../store/app-params/app-params';
import { processErrorHandle } from '../services/process-error-handle';

const getRatingPercentage = (rating: number): number =>
  Math.round(rating) * 20;

const handleCityClick = (cityName: string) => () => {
  store.dispatch(selectCity(cityName));
};

const handleFavoriteClick = (
  offerId: string,
  status: number
): MouseEventHandler<HTMLButtonElement> => (evt) => {
  evt.preventDefault();
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

export {getRatingPercentage, handleCityClick, handleFavoriteClick};
