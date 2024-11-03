import { TextField, TextFieldProps } from "@mui/material";

type Input = {
  label?: string,
  placeholder?: string,
} & TextFieldProps;;

const Input = ({ label, placeholder, ...props }: Input) => {
  return <div className="my-2 min-w-[250px]">
    <TextField label={label} placeholder={placeholder} {...props} />
  </div>
}

export default Input;