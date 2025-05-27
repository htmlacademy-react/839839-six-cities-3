import { useCallback, useState } from 'react';
import { OffersType, OfferType } from '../../types/offers';
import Map from '../../component/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MemorizedPlacesSorting from '../../component/places-sorting/places-sorting';
import { SortOrder } from '../../const';
import { getSelectCity, getSortOrder } from '../../store/app-params/selectors';
import { getOffers } from '../../store/data-precess/selectors';
import { selectSortOrder } from '../../store/app-params/app-params';
import MemorizedPlaceList from '../../component/place-list/place-list';
import MemorizedCitiesList from '../../component/cities-list/cities-list';
import Header from '../../component/header/header';

import EmptyCity from '../../component/empty-city/empty-city';

const getSortedOffers = (selectedCityOffers: OffersType, currentSort: string) => {
  switch (currentSort) {
    case SortOrder.PriceLowToHigh:
      return [...selectedCityOffers].sort((a, b) => a.price - b.price);
    case SortOrder.PriceHighToLow:
      return [...selectedCityOffers].sort((a, b) => b.price - a.price);
    case SortOrder.TopRatedFirst:
      return [...selectedCityOffers].sort((a, b) => b.rating - a.rating);
    default:
      return selectedCityOffers;
  }
};

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  // const searchCityParams = searchParams.get('city') || DestinationCities[0];
  const selectedCityName = useAppSelector(getSelectCity);
  const offersData = useAppSelector(getOffers);
  const currentSort = useAppSelector(getSortOrder);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  const selectedCityOffers = offersData.filter((offer) => offer.city.name === selectedCityName);
  const selectedCity = selectedCityOffers[0].city;
  const placeCount = selectedCityOffers.length;

  if (placeCount === 0) {
    <EmptyCity />;
  }

  const sortedOffers = getSortedOffers(selectedCityOffers, currentSort);

  const handleSortChange = useCallback((sortType: SortOrder) => {
    dispatch(selectSortOrder(sortType));
  }, [dispatch]);


  const handleListItemHover = useCallback((offerId: string) => {
    const currentOffer = selectedCityOffers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  }, [selectedCityOffers]);

  const handleMouseLeave = useCallback(() => {
    setSelectedOffer(undefined);
  }, []);

  return (
    <div className="page page--gray page--main" data-testid="main-page">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MemorizedCitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placeCount} {placeCount > 1 ? 'places' : 'place'} to stay in {selectedCityName}</b>
              <MemorizedPlacesSorting
                onSortChange={handleSortChange}
              />

              <MemorizedPlaceList
                offersData={sortedOffers}
                onListItemHover={handleListItemHover}
                onMouseLeave={handleMouseLeave}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  location={selectedCity.location}
                  points={selectedCityOffers}
                  selectedPoint={selectedOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
