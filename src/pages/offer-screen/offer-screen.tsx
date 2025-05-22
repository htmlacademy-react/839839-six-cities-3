import { useParams } from 'react-router-dom';
import { getRatingPercentage } from '../../utils/utils';
import Header from '../../component/header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Reviews from '../../component/reviews/reviews';
import Map from '../../component/map/map';
import PlaceCard from '../../component/place-card/place-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchNearbyOffersAction, fetchOfferByIdAction } from '../../store/api-actions';

const NEARBY_OFFERS_COUNT = 3;
const OFFER_IMGS_COUNT = 6;

function OfferScreen (): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentOfferId = params.id;
  const offerById = useAppSelector((state) => state.offerById);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const offersData = useAppSelector((state) => state.offers);
  const currentOffer = offersData.find((item) => item.id === currentOfferId);

  useEffect(() => {
    if (currentOfferId) {
      dispatch(fetchOfferByIdAction(currentOfferId));
      dispatch(fetchNearbyOffersAction(currentOfferId));
    }
  }, [dispatch, currentOfferId]);

  if (!offerById || !currentOffer) {
    return <NotFoundScreen />;
  }

  const currentNearbyOffers = nearbyOffers ? nearbyOffers.slice(0, NEARBY_OFFERS_COUNT) : [];
  const nearbyOffersPlusCurrent = [currentOffer, ...currentNearbyOffers];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerById.images.slice(0, OFFER_IMGS_COUNT).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerById.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offerById.title}
                </h1>
                <button className={`offer__bookmark-button button ${offerById.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${getRatingPercentage(offerById.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerById.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerById.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerById.bedrooms} {
                    offerById.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'
                  }
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerById.maxAdults} {
                    offerById.maxAdults === 1 ? 'adult' : 'adults'
                  }
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerById.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerById.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${offerById.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={offerById.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offerById.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offerById.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerById.description}
                  </p>
                </div>
              </div>
              <Reviews offerId={offerById.id} />
            </div>
          </div>
          <section className="offer__map map">
            <Map
              location={offerById.city.location}
              points={nearbyOffersPlusCurrent}
              selectedPoint={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {currentNearbyOffers.map((offer) => (
                <PlaceCard
                  offer={offer}
                  key={offer.id}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
