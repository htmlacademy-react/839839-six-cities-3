import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
        404 Not Found
      </h1>
      <p className="not-found__text">
        Упс! Похоже, мы не можем найти страницу, которую вы ищете.
      </p>
      <Link
        to={AppRoute.Root}
        className="not-found__link"
      >
        На главную страницу
      </Link>
    </div>
  );
}

export default NotFoundScreen;
