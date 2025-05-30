import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { UserDataType } from './user-data';

export type UserProcessType = {
  authorizationStatus: AuthorizationStatus;
  userData: UserDataType | null;
  isLoginFormDisabled: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
