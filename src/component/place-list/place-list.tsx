import { memo } from 'react';
import { OffersType } from '../../types/offers';
import MemorizedPlaceCard from '../place-card/place-card';

type PlaceListProps = {
  offersData: OffersType;
  onListItemHover?: (offerId: string) => void;
  onMouseLeave?: () => void;
}

function PlaceList({offersData, onListItemHover, onMouseLeave}: PlaceListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersData.map((offer) => (
        <MemorizedPlaceCard
          offer={offer}
          key={offer.id}
          onCardHover={onListItemHover}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
}

const MemorizedPlaceList = memo(PlaceList);

export default MemorizedPlaceList;
