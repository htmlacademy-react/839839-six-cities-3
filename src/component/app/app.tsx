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
import MainLayout from '../layout/main-layout';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={AppRoute.Root} element={<MainScreen />}/>
        </Route>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
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
  );
}

export default App;
