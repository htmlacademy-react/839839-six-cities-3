import { Link } from 'react-router-dom';
import Header from '../../component/header/header';
import { AppRoute } from '../../const';
import { OffersType } from '../../types/offers';
import FavoritesList from '../../component/favorites-list/favorites-list';

type FavoritesScreenProps = {
  offersData: OffersType;
}

function FavoritesScreen ({offersData}: FavoritesScreenProps): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offersData={offersData}/>
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
