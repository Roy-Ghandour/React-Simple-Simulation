import { Box, Grid, Slider as MaterialSlider, Typography } from "@mui/material";
import type { SliderProps } from "@mui/material";

interface Props extends SliderProps {
  min: number;
  max: number;
}

const Slider = ({ min, max, value, ...props }: Props) => {
  return (
    <>
      <Box sx={{ width: 250 }}>
        <Grid container spacing={2} sx={{}}>
          <Grid size="grow">
            <MaterialSlider
              valueLabelDisplay="auto"
              {...props}
              min={min}
              max={max}
              value={value}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                {min} min
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                {max} max
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
              {value}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Slider;
