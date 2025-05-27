import { Link } from 'react-router-dom';
import { AppRoute, DestinationCities } from '../../const';
import { OffersType } from '../../types/offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/data-precess/selectors';
import MemorizedPlaceCard from '../place-card/place-card';
import { selectCity } from '../../store/app-params/app-params';

type FavoritesLocationsItemsProps = {
  offersData: OffersType;
  city: string;
}

function FavoritesPlaces({offersData, city}: FavoritesLocationsItemsProps) {
  return (
    offersData.filter((offer) => offer.city.name === city).map((offer) => (
      <MemorizedPlaceCard
        key={offer.id}
        offer={offer}
      />))
  );
}

function FavoritesLocationsItems({offersData, city}: FavoritesLocationsItemsProps) {
  const dispatch = useAppDispatch();
  const isOffer = offersData.find((offer) => offer.city.name === city);

  const handleCityClick = (cityName: string) => () => {
    dispatch(selectCity(cityName));
  };

  if (isOffer) {
    return (
      <li className="favorites__locations-items" key={city}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.Root}
              onClick={handleCityClick(city)}
            >
              <span>{city}</span>
            </Link>
          </div>
        </div>
        <div className="favorites__places">
          <FavoritesPlaces offersData={offersData} city={city}/>
        </div>
      </li>
    );
  }
}

function FavoritesList(): JSX.Element | null {
  const favoriteOffers = useAppSelector(getFavorites);

  if (!favoriteOffers?.length) {
    return null;
  }

  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {DestinationCities.map((city) => (
          <FavoritesLocationsItems
            key={city}
            offersData={favoriteOffers}
            city={city}
          />
        ))}
      </ul>
    </>
  );
}

export default FavoritesList;
