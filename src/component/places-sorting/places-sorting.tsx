import { useRef } from 'react';
import { SortOrder } from '../../const';

type SortOptionsProps = {
  currentSort: SortOrder;
  onSortChange: (sortType: SortOrder) => void;
};

function PlacesSorting({currentSort, onSortChange}: SortOptionsProps): JSX.Element {
  const sortMenuRef = useRef<HTMLUListElement>(null);
  const sortOptions = Object.values(SortOrder);

  const handleToggleClick = () => {
    sortMenuRef.current?.classList.toggle('places__options--opened');
  };


  const handleSortClick = (sortType: SortOrder) => {
    onSortChange(sortType);
    sortMenuRef.current?.classList.remove('places__options--opened');
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleClick}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className="places__options places__options--custom"
        ref={sortMenuRef}
      >
        {sortOptions.map((option) => (
          <li
            className={`places__option ${currentSort === option ? 'places__option--active' : ''}`}
            key={option}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
