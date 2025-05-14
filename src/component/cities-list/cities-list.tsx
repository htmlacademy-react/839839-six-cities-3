import { DestinationCities } from '../../const';
import LocationItem from '../location-item/location-item';

type CitiesListProps = {
  cities: typeof DestinationCities;
  selectedCityName: string;
  onLocationItemClick: (cityName:string) => void;
}

function CitiesList({cities, selectedCityName, onLocationItemClick}: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((dest) => (
              <LocationItem
                location={dest}
                key={dest}
                selectedCityName={selectedCityName}
                onLocationItemClick={onLocationItemClick}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
