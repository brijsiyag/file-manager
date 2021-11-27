import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

export interface MainState {
  currPath: string;
  selected: string[];
}

const initialState: MainState = {
  currPath: '/Users/birju/Desktop',
  selected: [],
};

export const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState,
  reducers: {
    changePath: (state, action: PayloadAction<string>) => {
      state.currPath = action.payload;
    },
    select: (state, action: PayloadAction<string>) => {
      state.selected.push(action.payload);
      console.log(current(state));
    },
    deSelect: (state, action: PayloadAction<string>) => {
      state.selected = current(state).selected.filter((element) => {
        return element !== action.payload;
      });
      console.log(current(state));
    },
    deSelectAll: (state) => {
      state.selected = [];
      console.log(current(state));
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});
export const { changePath, select, deSelect, deSelectAll } =
  fileManagerSlice.actions;
export default fileManagerSlice.reducer;
