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
  offersCount: number;
  offersData: OffersType;
}

function App({offersCount, offersData}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen offersCount={offersCount} offersData={offersData}/>}/>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesScreen offersData={offersData.filter((offer) => offer.isFavorite)}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<OfferScreen />}/>
        <Route path='*' element={<NotFoundScreen />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
