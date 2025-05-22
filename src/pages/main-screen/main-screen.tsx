import { useState } from 'react';
import { OfferType } from '../../types/offers';
import Header from '../../component/header/header';
import PlaceList from '../../component/place-list/place-list';
import Map from '../../component/map/map';
import CitiesList from '../../component/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PlacesSorting from '../../component/places-sorting/places-sorting';
import { AuthorizationStatus, SortOrder } from '../../const';
import { selectSortOrder } from '../../store/action';
import { fetchFavoritesAction } from '../../store/api-actions';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCityName = useAppSelector((state) => state.cityName);
  const offersData = useAppSelector((state) => state.offers);
  const currentSort = useAppSelector((state) => state.sortOrder);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  const selectedCityOffers = offersData.filter((offer) => offer.city.name === selectedCityName);
  const selectedCity = selectedCityOffers[0].city;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(fetchFavoritesAction());
  }

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

  const handleSortChange = (sortType: SortOrder) => {
    dispatch(selectSortOrder(sortType));
  };


  const handleListItemHover = (offerId: string) => {
    const currentOffer = selectedCityOffers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{selectedCityOffers.length} place{selectedCityOffers.length > 1 && 's'} to stay in {selectedCityName}</b>
              <PlacesSorting
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />

              <PlaceList
                offersData={sortedOffers}
                onListItemHover={handleListItemHover}
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
