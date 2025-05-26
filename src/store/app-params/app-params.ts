import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DestinationCities, NameSpace, SortOrder } from '../../const';

const initialCity = DestinationCities[0];

type InitialState = {
  cityName: string;
  sortOrder: SortOrder;
};

const initialState: InitialState = {
  cityName: initialCity,
  sortOrder: SortOrder.Popular,
};

export const appParams = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    selectSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {selectCity, selectSortOrder} = appParams.actions;
