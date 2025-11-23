import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterSlice.ts";
import simulationReducer from "@/features/simulation/simulationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    simulation: simulationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
