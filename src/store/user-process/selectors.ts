import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserDataType } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserData = (state: State): UserDataType | null => state[NameSpace.User].userData;
