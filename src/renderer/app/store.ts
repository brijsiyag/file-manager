import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import fileManagerReducer from 'renderer/features/main/fileManagerSlice';
export const store = configureStore({
  reducer: {
    fileManager: fileManagerReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
