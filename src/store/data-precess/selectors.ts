import { State } from '../../types/state';
import { OffersType } from '../../types/offers';
import { NameSpace } from '../../const';
import { OfferByIdType } from '../../types/offer-by-id';
import { CommentsType } from '../../types/comments';

export const getOffers = (state: State): OffersType => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOfferById = (state: State): OfferByIdType | null => state[NameSpace.Data].offerById;
export const getError = (state: State): string | null => state[NameSpace.Data].error;
export const getNearbyOffers = (state: State): OffersType => state[NameSpace.Data].nearbyOffers;
export const getComments = (state: State): CommentsType => state[NameSpace.Data].comments;
export const getFavorites = (state: State): OffersType => state[NameSpace.Data].favorites;
export const getCommentFormDisabledStatus = (state: State): boolean => state[NameSpace.Data].isCommentFormDisabled;
export const getFavoriteLoadingStatus = (state: State): boolean => state[NameSpace.Data].isFavoriteLoading;
