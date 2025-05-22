import { OfferType } from './offers';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferByIdType = Omit<OfferType, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}
