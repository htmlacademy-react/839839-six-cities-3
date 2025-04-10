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
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.previewImage}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default PlaceList;
