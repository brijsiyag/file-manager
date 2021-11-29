import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

export interface MainState {
  currPath: string;
  selected: string[];
  historyFwd: string[];
  view: string;
  bodyForceRerenderer: boolean;
  searchText: string;
}

const initialState: MainState = {
  currPath: '/Users/birju/Desktop',
  selected: [],
  historyFwd: [],
  view: 'grid',
  bodyForceRerenderer: true,
  searchText: '',
};

export const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState,
  reducers: {
    changePath: (state, action: PayloadAction<string>) => {
      state.currPath = action.payload;
      state.selected = [];
    },
    select: (state, action: PayloadAction<string>) => {
      state.selected.push(action.payload);
      console.log(current(state.selected));
    },
    deSelect: (state, action: PayloadAction<string>) => {
      state.selected = current(state).selected.filter((element) => {
        return element !== action.payload;
      });
    },
    deSelectAll: (state) => {
      state.selected = [];
    },
    pathForwarded: (state) => {
      state.historyFwd.pop();
    },
    pathBackwarded: (state) => {
      state.historyFwd.push(state.currPath);
    },
    changeView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    bodyForceRerenderer: (state) => {
      state.bodyForceRerenderer = !state.bodyForceRerenderer;
      state.selected = [];
    },
    serachTexhChange: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});
export const {
  changePath,
  select,
  deSelect,
  deSelectAll,
  pathForwarded,
  pathBackwarded,
  changeView,
  bodyForceRerenderer,
  serachTexhChange,
} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
