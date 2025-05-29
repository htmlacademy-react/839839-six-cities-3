import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction, logoutAction } from '../../store/api-actions';
import { getAuthCheckedStatus, getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';
import { getFavorites, getFavoritesLength } from '../../store/data-precess/selectors';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const favorites = useAppSelector(getFavorites);
  const favoritesLength = useAppSelector(getFavoritesLength);
  const favoritesCount = favoritesLength || favorites?.length;
  const userData = useAppSelector(getUserData);
  const email = userData?.email;
  const avatarUrl = userData?.avatarUrl;
  const name = userData?.name;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction())
      .then(() => {
        dispatch(fetchOffersAction);
      });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              { isAuthChecked && isAuth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          src={avatarUrl}
                          alt={name}
                        />
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Root}
                      onClick={handleLogoutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
