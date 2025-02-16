type LocationItemProps = {
  location: string;
}

function LocationItem ({location}: LocationItemProps): JSX.Element{
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item " href="#">
        <span>{location}</span>
      </a>
    </li>
  );
}

export default LocationItem;
