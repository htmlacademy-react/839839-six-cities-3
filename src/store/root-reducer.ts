import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appParams } from './app-params/app-params';
import { dataProcess } from './data-precess/data-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.App]: appParams.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
