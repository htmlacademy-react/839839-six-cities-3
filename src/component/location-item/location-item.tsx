import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCity } from '../../store/action';

type LocationItemProps = {
  location: string;
}

function LocationItem({location}: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCityName = useAppSelector((state) => state.cityName);

  const handleLocationItemClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(selectCity(location));
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
