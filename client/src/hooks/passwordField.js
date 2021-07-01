import { useContext } from "react";
import InputsContext from "../context/inputs/inputsContext";

const charSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  specialSymbols: `!"#$%&'()*+,-./:;<=>?@[\]^_\\{|}~`,
  numbers: '0123456789'
};

const usePasswordField = () => {
  const inputs = useContext(InputsContext);

  const choice = (array) => {
    return array[Math.ceil(Math.random() * array.length - 1)];
  }

  const generate = (values) => {
    let charSet = '';
    let result = '';
    const {
      passwordLength,
      uppercase,
      lowercase,
      specialSymbols,
      numbers 
    } = values;

    if (uppercase) charSet += charSets.uppercase;
    if (lowercase) charSet += charSets.lowercase;
    if (specialSymbols) charSet += charSets.specialSymbols;
    if (numbers) charSet += charSets.numbers;

    if (charSet) {
      const length = Math.abs(Number.parseInt(passwordLength));
  
      if (isNaN(length)) {
        alert.showWithTimeout('Invalid Password Length', 'warning');
        return '';
      }
  
      for (let i = 0; i < length; i++) {
        result += choice(charSet);
      }
    }

    if (inputs) inputs.setValue('password', result);
    return result;
  };

  return { generate };
};

export default usePasswordField;
