import { Link } from 'react-router-dom';
import Header from '../../component/header/header';
import { AppRoute } from '../../const';
import FavoritesList from '../../component/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks';

function FavoritesScreen(): JSX.Element {
  const offersData = useAppSelector((state) => state.offers);
  const favoriteOffers = offersData.filter((offer) => offer.isFavorite);
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favoriteOffers={favoriteOffers}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
