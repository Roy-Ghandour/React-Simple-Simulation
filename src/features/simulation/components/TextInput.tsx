import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

type TextInputProps = TextFieldProps & {
  value: string;
  onRawChange?: (value: string) => void;
  onValidChange?: (value: number) => void;
  unit?: string;
};

const isValidPositiveNumber = (str: string) => {
  const trimmed = str.trim();
  if (trimmed === "") return false;
  const num = Number(trimmed);
  return Number.isFinite(num) && num > 0 && Number.isInteger(num);
};

const TextInput = ({
  value,
  onRawChange,
  onValidChange,
  unit = "km",
  ...props
}: TextInputProps) => {
  const valid = isValidPositiveNumber(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onRawChange?.(raw);

    if (isValidPositiveNumber(raw)) {
      onValidChange?.(Number(raw.trim()));
    }
  };

  return (
    <TextField
      value={value}
      error={!valid}
      helperText={!valid && "Enter a positive whole number"}
      onChange={handleChange}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        },
      }}
      inputMode="numeric"
      sx={{ m: 1, width: "25ch" }}
      {...props}
    />
  );
};

export default TextInput;
