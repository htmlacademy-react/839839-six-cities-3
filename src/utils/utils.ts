import { store } from '../store';
import { selectCity } from '../store/action';

const getRatingPercentage = (rating: number): number =>
  Math.round(rating) * 20;

const handleCityClick = (cityName: string) => () => {
  store.dispatch(selectCity(cityName));
};

export {getRatingPercentage, handleCityClick};
