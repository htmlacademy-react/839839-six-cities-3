import { OffersType } from '../../types/offers';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type PlaceListProps = {
  offersData: OffersType;
}

function PlaceList({offersData}: PlaceListProps): JSX.Element {
  const [, setActivePlaceCardId] = useState('');
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersData.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseOver={(offerId) => setActivePlaceCardId(offerId)}
          onMouseLeave={() => setActivePlaceCardId('')}
        />
      ))}
    </div>
  );
}

export default PlaceList;
