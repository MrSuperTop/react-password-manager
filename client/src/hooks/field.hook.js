import { useContext } from "react";
import InputsContext from "../context/inputs/inputsContext";

const useField = (fieldName) => {
  const inputs = useContext(InputsContext);

  const set = (value) => {
    inputs?.setValue(fieldName, value);
  };

  const clear = () => {
    set(fieldName, '');
  };
  
  const undo = () => {
    set(fieldName, inputs.initials[fieldName]);
  };

  return {
    set, clear, undo,
    value: inputs?.values[fieldName]
  };
}

export default useField