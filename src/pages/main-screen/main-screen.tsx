import { useCallback, useState } from 'react';
import { OfferType } from '../../types/offers';
import Map from '../../component/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MemorizedPlacesSorting from '../../component/places-sorting/places-sorting';
import { SortOrder } from '../../const';
import { getSelectCity, getSortOrder } from '../../store/app-params/selectors';
import { getOffers } from '../../store/data-precess/selectors';
import { selectSortOrder } from '../../store/app-params/app-params';
import EmptyCity from '../../component/empty-city/empty-city';
import MemorizedPlaceList from '../../component/place-list/place-list';
import MemorizedCitiesList from '../../component/cities-list/cities-list';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCityName = useAppSelector(getSelectCity);
  const offersData = useAppSelector(getOffers);
  const currentSort = useAppSelector(getSortOrder);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  const selectedCityOffers = offersData.filter((offer) => offer.city.name === selectedCityName);
  const selectedCity = selectedCityOffers[0].city;

  const getSortedOffers = () => {
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

  const sortedOffers = getSortedOffers();

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
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <MemorizedCitiesList />
      <div className="cities">
        {selectedCityOffers && selectedCityOffers.length > 0
          ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{selectedCityOffers.length} place{selectedCityOffers.length > 1 && 's'} to stay in {selectedCityName}</b>
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
          )
          : (<EmptyCity />)}
      </div>
    </main>
  );
}

export default MainScreen;
