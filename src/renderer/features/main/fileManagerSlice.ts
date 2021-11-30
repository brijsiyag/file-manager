import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
export interface MainState {
  currPath: string;
  selected: string[];
  historyFwd: string[];
  view: string;
  bodyForceRerenderer: boolean;
  searchText: string;
  cutCopy: { type: string; arr: string[] };
  infoPath: string;
  tabs: string[];
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
  tabs: ['/Users/birju/Desktop/FileManagerTest'],
};

export const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState,
  reducers: {
    changePath: (state, action: PayloadAction<string>) => {
      if (state.tabs.length > 1) {
        state.tabs.forEach((element: string, index: number) => {
          if (element === state.currPath) {
            state.tabs[index] = action.payload;
            return true;
          }
        });
      }
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
    serachTexhChange: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setInfoPath: (state, action: PayloadAction<string>) => {
      state.infoPath = action.payload;
    },
    newTab: (state, action: PayloadAction<string>) => {
      state.tabs.push(action.payload);
    },
    tabClose: (state, action: PayloadAction<string>) => {
      const index = state.tabs.indexOf(action.payload);
      if (index > -1) {
        state.tabs.splice(index, 1);
      }
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
  setInfoPath,
  newTab,
  tabClose,
} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;
