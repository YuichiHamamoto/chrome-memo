import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./slices/settingSlice";
const store = configureStore({
  reducer: {
    setting: settingReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
