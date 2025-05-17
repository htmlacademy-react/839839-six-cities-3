import { DestinationCities } from '../../const';
import LocationItem from '../location-item/location-item';

function CitiesList(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            DestinationCities.map((dest) => (
              <LocationItem
                location={dest}
                key={dest}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
