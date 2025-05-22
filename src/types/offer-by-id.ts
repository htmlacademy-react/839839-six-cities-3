import { CityType, LocationType } from './offers';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferByIdType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}
