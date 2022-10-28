import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CourseState {
  course: object;
  courses: [object];
  loading: boolean;
  error: object;
}

const initialState: CourseState = {
  course: null,
  courses: [],
  loading: true,
  error: {},
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

/*export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  }
}*/
