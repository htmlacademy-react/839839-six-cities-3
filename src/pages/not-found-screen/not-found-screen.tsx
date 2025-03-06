import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Root}>Hа главную страницу</Link>
    </>
  );
}

export default NotFoundScreen;
