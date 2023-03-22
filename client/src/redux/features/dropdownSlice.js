import { createSlice } from "@reduxjs/toolkit";

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    isDrop: false,
  },
  reducers: {
    showDrop: (state, action) => {
      state.isDrop = true;
    },
    hideDrop: (state, action) => {
      state.isDrop = false;
    },
  },
});

export const { showDrop, hideDrop } = dropdownSlice.actions;
