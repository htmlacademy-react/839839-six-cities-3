import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AppRoute } from '../../const';

type OffersType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
}

type AppScreenProps = {
  offersCount: number;
  offersData: OffersType[];
}

function App({offersCount, offersData}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen offersCount={offersCount} offersData={offersData}/>}/>
          <Route path={AppRoute.Login} element={<LoginScreen />}/>
          <Route path={AppRoute.Favorites} element={<FavoritesScreen />}/>
          <Route path={AppRoute.Offer} element={<OfferScreen />}/>
          <Route path='*' element={<NotFoundScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
