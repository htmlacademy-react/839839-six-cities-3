import { NavLink } from 'react-router-dom';

type LocationItemProps = {
  location: string;
}

function LocationItem ({location}: LocationItemProps): JSX.Element{
  return (
    <li className="locations__item">
      <NavLink className="locations__item-link tabs__item " to="#">
        <span>{location}</span>
      </NavLink>
    </li>
  );
}

export default LocationItem;
