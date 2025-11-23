import {
  Box,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import Slider from "./components/Slider";
import TextInput from "./components/TextInput";
import {
  selectSimulation,
  setAverageTripLength,
  setCarFreeZone,
  setGreenPolicy,
  setNumberOfCars,
  setPublicTransportQuality,
} from "@/features/simulation/simulationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import BarCompare from "./components/BarCompare";

const Simulation = () => {
  const dispatch = useDispatch();
  const simulation = useSelector(selectSimulation);

  const {
    numberOfCars,
    publicTransportQuality,
    averageTripLength,
    greenPolicy,
    carFreeZone,
    trafficIndex,
    pollution,
  } = simulation;

  const [averageTripLengthRaw, setAverageTripLengthRaw] = useState(
    String(averageTripLength)
  );

  return (
    <>
      <h1>Variables</h1>
      <hr />
      <Stack direction={"row"}>
        <Box sx={{ width: 300 }}>
          <h3>Number of Cars</h3>
          <Slider
            min={1000}
            max={10000}
            step={500}
            value={numberOfCars}
            onChange={(_, num) => {
              if (typeof num === "number") {
                dispatch(setNumberOfCars(num));
              }
            }}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          <h3>Public Transport Quality</h3>
          <Slider
            min={0}
            max={10}
            step={1}
            value={publicTransportQuality}
            onChange={(_, num) => {
              if (typeof num === "number") {
                dispatch(setPublicTransportQuality(num));
              }
            }}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          <h3>Average Trip Length</h3>
          <TextInput
            label="Average Trip Length"
            value={averageTripLengthRaw}
            onRawChange={(str) => setAverageTripLengthRaw(str)}
            onValidChange={(num) => dispatch(setAverageTripLength(num))}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          <h3>Policies</h3>
          <FormControl component="fieldset">
            <FormControlLabel
              label="Green Policy"
              control={
                <Switch
                  defaultChecked
                  onChange={(_, checked) => dispatch(setGreenPolicy(checked))}
                  checked={greenPolicy}
                />
              }
            />
            <FormControlLabel
              label="Car Free Zone"
              control={
                <Switch
                  onChange={(_, checked) => dispatch(setCarFreeZone(checked))}
                  checked={carFreeZone}
                />
              }
            />
          </FormControl>
        </Box>
      </Stack>

      <h1>Results</h1>
      <hr />
      <h1>Traffic: {trafficIndex}</h1>
      <h1>Pollution: {pollution}</h1>

      <Stack direction={"row"}>
        <BarCompare
          title="Initial vs Resultant Pollution"
          leftLabel="Initial kg CO₂"
          leftValue={44800}
          rightLabel="Resultant kg CO₂"
          rightValue={pollution}
          domain={80000}
          unit="kg CO₂"
        />

        <BarCompare
          title="Initial vs Resultant Traffic Index"
          leftLabel="Initial Traffic"
          leftValue={3200}
          rightLabel="Resultant Traffic"
          rightValue={trafficIndex}
          domain={8000}
        />
      </Stack>
    </>
  );
};

export default Simulation;
