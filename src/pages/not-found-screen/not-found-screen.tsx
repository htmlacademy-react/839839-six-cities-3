import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to="/">Hа главную страницу</Link>
    </>
  );
}

export default NotFoundScreen;
