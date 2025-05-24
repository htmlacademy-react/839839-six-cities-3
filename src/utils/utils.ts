import { MouseEventHandler } from 'react';
import { store } from '../store';
import { selectCity } from '../store/action';
import { setFavoriteStatusAction } from '../store/api-actions';

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
  store.dispatch(setFavoriteStatusAction([offerId, status]));
};

export {getRatingPercentage, handleCityClick, handleFavoriteClick};
