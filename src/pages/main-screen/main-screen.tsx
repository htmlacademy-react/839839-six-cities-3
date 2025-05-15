import { useState } from 'react';
import { OfferType } from '../../types/offers';
import Header from '../../component/header/header';
import PlaceList from '../../component/place-list/place-list';
import Map from '../../component/map/map';
import CitiesList from '../../component/cities-list/cities-list';
import { useAppSelector } from '../../hooks';


function MainScreen(): JSX.Element {
  const selectedCityName = useAppSelector((state) => state.cityName);
  const offersData = useAppSelector((state) => state.offers);

  const selectedCityOffers = offersData.filter((offer) => offer.city.name === selectedCityName);
  const selectedCity = selectedCityOffers[0].city;

  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlaceList
                offersData={selectedCityOffers}
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
