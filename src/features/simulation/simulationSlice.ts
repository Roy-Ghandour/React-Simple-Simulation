import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SimulationState {
  numberOfCars: number;
  publicTransportQuality: number; // 1–10
  averageTripLength: number; // km
  greenPolicy: boolean;
  carFreeZone: boolean;
  trafficIndex: number;
  pollution: number;
}

const initialState: SimulationState = {
  numberOfCars: 5000,
  publicTransportQuality: 4,
  averageTripLength: 20,
  greenPolicy: true,
  carFreeZone: false,
  trafficIndex: 0,
  pollution: 0,
};

const recalculateResults = (state: SimulationState) => {
  const baseTraffic =
    state.numberOfCars * (1 - state.publicTransportQuality * 0.05);

  const policyFactor =
    (state.greenPolicy ? 0.8 : 1) * (state.carFreeZone ? 0.9 : 1);

  const trafficIndex = Math.round(baseTraffic * policyFactor);

  const basePollution =
    baseTraffic * state.averageTripLength * (state.greenPolicy ? 0.7 : 1);

  const pollution = Math.round(basePollution * policyFactor);
  return { pollution, trafficIndex };
};

const initalResults = recalculateResults(initialState);
initialState.trafficIndex = initalResults.trafficIndex;
initialState.pollution = initalResults.pollution;

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setNumberOfCars(state, action: PayloadAction<number>) {
      state.numberOfCars = action.payload;
      const { pollution, trafficIndex } = recalculateResults(state);
      state.pollution = pollution;
      state.trafficIndex = trafficIndex;
    },
    setPublicTransportQuality(state, action: PayloadAction<number>) {
      state.publicTransportQuality = action.payload;
      const { pollution, trafficIndex } = recalculateResults(state);
      state.pollution = pollution;
      state.trafficIndex = trafficIndex;
    },
    setAverageTripLength(state, action: PayloadAction<number>) {
      state.averageTripLength = action.payload;
      const { pollution, trafficIndex } = recalculateResults(state);
      state.pollution = pollution;
      state.trafficIndex = trafficIndex;
    },
    setGreenPolicy(state, action: PayloadAction<boolean>) {
      state.greenPolicy = action.payload;
      const { pollution, trafficIndex } = recalculateResults(state);
      state.pollution = pollution;
      state.trafficIndex = trafficIndex;
    },
    setCarFreeZone(state, action: PayloadAction<boolean>) {
      state.carFreeZone = action.payload;
      const { pollution, trafficIndex } = recalculateResults(state);
      state.pollution = pollution;
      state.trafficIndex = trafficIndex;
    },
  },
});

export const {
  setNumberOfCars,
  setPublicTransportQuality,
  setAverageTripLength,
  setGreenPolicy,
  setCarFreeZone,
} = simulationSlice.actions;

export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
