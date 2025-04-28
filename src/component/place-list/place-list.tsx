import { OffersType } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
  offersData: OffersType;
}

function PlaceList({offersData}: PlaceListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersData.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default PlaceList;
