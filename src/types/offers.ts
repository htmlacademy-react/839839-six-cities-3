export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityType = {
  name: string;
  location: LocationType;
}

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OffersType = OfferType[];
