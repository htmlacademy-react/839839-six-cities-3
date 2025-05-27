import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import Layout from '../layout/layout';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus } from '../../store/data-precess/selectors';
import LoginLayout from '../layout/login-layout';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen />}/>
          <Route path={AppRoute.Login} element={<LoginLayout />}>
            <Route index element={<LoginScreen />}/>
          </Route>
          <Route element={<Layout />}>
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen />}/>
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path='*' element={<NotFoundScreen />}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>

  );
}

export default App;
