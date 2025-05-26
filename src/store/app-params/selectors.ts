import { NameSpace, SortOrder } from '../../const';
import { State } from '../../types/state';

export const getSelectCity = (state: State): string => state[NameSpace.App].cityName;

export const getSortOrder = (state: State): SortOrder => state[NameSpace.App].sortOrder;
