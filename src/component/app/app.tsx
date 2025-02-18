import MainScreen from '../../pages/main-screen/main-screen';

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
    <MainScreen
      offersCount={offersCount}
      offersData={offersData}
    />
  );
}

export default App;
