import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LocationItemProps = {
  location: string;
  selectedCityName: string;
  onLocationItemClick: (cityName: string) => void;
}

function LocationItem ({location, selectedCityName, onLocationItemClick}: LocationItemProps): JSX.Element {
  const handleLocationItemClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onLocationItemClick(location);
  };

  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${location === selectedCityName ? 'tabs__item--active' : ''}`}
        to={AppRoute.Root}
        onClick={handleLocationItemClick}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

export default LocationItem;
