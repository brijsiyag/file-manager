import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
const { shell } = window.require('electron');
export interface MainState {
  currPath: string;
  selected: string[];
  historyFwd: string[];
  view: string;
  bodyForceRerenderer: boolean;
  searchText: string;
  cutCopy: { type: string; arr: string[] };
  infoPath: string;
}

const initialState: MainState = {
  currPath: '/Users/birju/Desktop/FileManagerTest',
  selected: [],
  historyFwd: [],
  view: 'grid',
  bodyForceRerenderer: true,
  searchText: '',
  cutCopy: { type: 'copy', arr: [] },
  infoPath: '',
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
    copyCutHandler: (state, action: PayloadAction<string>) => {
      state.cutCopy = { type: action.payload, arr: state.selected };
      state.selected = [];
    },
    pasted: (state) => {
      state.cutCopy = { type: 'copy', arr: [] };
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
    deleteAll: (state) => {
      const newSelected = state.selected;
      state.selected = [];
      newSelected.forEach((element) => {
        shell
          .trashItem(element)
          .then(() => {
            return true;
          })
          .catch((err) => {
            console.log(err);
          });
      });
      state.bodyForceRerenderer = !state.bodyForceRerenderer;
    },
    serachTexhChange: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setInfoPath: (state, action: PayloadAction<string>) => {
      state.infoPath = action.payload;
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
  copyCutHandler,
  pasted,
  deleteAll,
  setInfoPath,
} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
