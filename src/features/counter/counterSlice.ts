import type { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // actually actions
    increment: (state) => {
      state.count += 1; // Not actually changing the variable but a copy of it, state is immutable
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const selectCounter = (state: RootState) => state.counter.count;

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
