import { createSlice } from "@reduxjs/toolkit";

export const TokenSlice = createSlice({
  name: "token",
  initialState: {
    value: null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = TokenSlice.actions;

export default TokenSlice.reducer;
