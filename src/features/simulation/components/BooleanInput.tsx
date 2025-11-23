import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

const BooleanInput = () => {
  const [GCP, setGCP] = useState(true);
  const [CFZ, setCFZ] = useState(false);

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        label="Green Policy"
        control={
          <Switch
            defaultChecked
            onChange={(_, checked) => setGCP(checked)}
            checked={GCP}
          />
        }
      />
      <FormControlLabel
        label="Car Free Zone"
        control={
          <Switch onChange={(_, checked) => setCFZ(checked)} checked={CFZ} />
        }
      />
    </FormControl>
  );
};

export default BooleanInput;
