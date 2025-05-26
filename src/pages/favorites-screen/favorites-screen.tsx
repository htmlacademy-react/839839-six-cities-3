import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import FavoritesList from '../../component/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks';
import FavoritesEmpty from '../../component/favorites-empty/favorites-empty';
import { getFavorites } from '../../store/data-precess/selectors';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const hasNoFavorites = favorites?.length === 0;
  const mainFavoritesEmptyClass = hasNoFavorites ? 'page__main--favorites-empty' : '';
  const sectionFavoritesEmptyClass = hasNoFavorites ? 'favorites--empty' : '';
  return (
    <>
      <main className={`page__main page__main--favorites ${mainFavoritesEmptyClass}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${sectionFavoritesEmptyClass}`}>
            {hasNoFavorites ?
              <FavoritesEmpty /> :
              <FavoritesList />}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </>
  );
}

export default FavoritesScreen;
