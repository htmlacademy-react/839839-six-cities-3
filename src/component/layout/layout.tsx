import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import Header from '../header/header';
import { getFavorites } from '../../store/data-precess/selectors';

function Layout(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const location = useLocation();

  let pageFavoritesEmptyClass = '';

  if (location.pathname.includes(AppRoute.Favorites)) {
    pageFavoritesEmptyClass = favorites?.length === 0 ? 'page--favorites-empty' : '';
  }

  return (
    <div className={`page ${pageFavoritesEmptyClass}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
