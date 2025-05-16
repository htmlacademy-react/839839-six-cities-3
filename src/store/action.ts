import { createAction } from '@reduxjs/toolkit';
import { SortOrder } from '../const';

const selectCity = createAction<string>('selectCity');
const selectSortOrder = createAction<SortOrder>('selectSortOrder');

export { selectCity, selectSortOrder };
