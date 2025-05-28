import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/data-precess/selectors';
import MemorizedPlaceCard from '../place-card/place-card';
import { selectCity } from '../../store/app-params/app-params';

function FavoritesList(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavorites);
  const citiesWithFavorites = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  const handleCityClick = (cityName: string) => () => {
    dispatch(selectCity(cityName));
  };


  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {citiesWithFavorites.map((city) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  to={`${AppRoute.Root}?city=${city}`}
                  onClick={handleCityClick(city)}
                >
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favoriteOffers.map((offer) => (
                offer.city.name === city ?
                  <MemorizedPlaceCard
                    key={offer.id}
                    offer={offer}
                  /> : null
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FavoritesList;
