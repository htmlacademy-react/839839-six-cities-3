import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectCity } from '../../store/app-params/selectors';
import { selectCity } from '../../store/app-params/app-params';

type LocationItemProps = {
  location: string;
}

function LocationItem({location}: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCityName = useAppSelector(getSelectCity);

  const handleLocationItemClick = () => {
    dispatch(selectCity(location));
  };

  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${location === selectedCityName ? 'tabs__item--active' : ''}`}
        to={`${AppRoute.Root}?city=${location}`}
        onClick={handleLocationItemClick}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

export default LocationItem;
