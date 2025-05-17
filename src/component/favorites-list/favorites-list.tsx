import { Link } from 'react-router-dom';
import { DestinationCities } from '../../const';
import { OffersType } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type FavoritesListProps = {
  favoriteOffers: OffersType;
}

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

function FavoritesList({favoriteOffers}: FavoritesListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {DestinationCities.map((city) => <FavoritesLocationsItems key={city} offersData={favoriteOffers} city={city}/>)}
    </ul>
  );
}

export default FavoritesList;
