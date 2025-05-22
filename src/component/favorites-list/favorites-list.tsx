import { Link } from 'react-router-dom';
import { DestinationCities } from '../../const';
import { OffersType } from '../../types/offers';
import PlaceCard from '../place-card/place-card';
import { useAppSelector } from '../../hooks';

type FavoritesLocationsItemsProps = {
  offersData: OffersType;
  city: string;
}

function FavoritesPlaces({offersData, city}: FavoritesLocationsItemsProps) {
  return (
    offersData.filter((offer) => offer.city.name === city).map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
      />))
  );
}

function FavoritesLocationsItems({offersData, city}: FavoritesLocationsItemsProps) {
  const isOffer = offersData.find((offer) => offer.city.name === city);
  if (isOffer) {
    return (
      <li className="favorites__locations-items" key={city}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to="#">
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
  const favoriteOffers = useAppSelector((state) => state.favorites);

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
