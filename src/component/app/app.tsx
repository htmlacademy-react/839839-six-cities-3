import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function App({authorizationStatus}: AppScreenProps): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen />}/>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen />
          </PrivateRoute>
        }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen authorizationStatus={authorizationStatus}/>}/>
        <Route path='*' element={<NotFoundScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
