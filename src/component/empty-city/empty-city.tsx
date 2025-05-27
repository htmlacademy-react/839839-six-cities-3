import { useSearchParams } from 'react-router-dom';
import { DestinationCities } from '../../const';
import MemorizedCitiesList from '../cities-list/cities-list';
import Header from '../header/header';

function EmptyCity(): JSX.Element {
  const [searchParams] = useSearchParams();
  const searchCityParams = searchParams.get('city') || DestinationCities[0];
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <MemorizedCitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in {searchCityParams}
                </p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmptyCity;
