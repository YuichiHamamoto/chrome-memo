import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Setting {
  language: Language;
};

export type Language = "ja" | "en";

const initialState: Setting = {
  language: "ja"
};

export const getBrowserLanguage = createAsyncThunk("setting/fetchLanguage", () => {
  const lang: Language = navigator.language === "ja-JP" ? "ja" : "en";

  return lang;
});

export const settingSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    switchLanguage(state) {
      state.language = state.language === "en" ? "ja" : "en";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrowserLanguage.fulfilled, (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    });
  }
});

export const { switchLanguage } = settingSlice.actions;
export default settingSlice.reducer;