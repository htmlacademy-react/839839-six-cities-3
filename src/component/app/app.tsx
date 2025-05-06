import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { OffersType } from '../../types/offers';

type AppScreenProps = {
  offersData: OffersType;
  authorizationStatus: AuthorizationStatus;
}

function App({offersData, authorizationStatus}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen offersData={offersData}/>}/>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen offersData={offersData.filter((offer) => offer.isFavorite)}/>
          </PrivateRoute>
        }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen offersData={offersData} authorizationStatus={authorizationStatus}/>}/>
        <Route path='*' element={<NotFoundScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
