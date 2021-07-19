import { useContext } from "react";
import AlertContext from '../context/alert/alertContext';
import useField from "./field.hook";

const charSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  specialSymbols: `!"#$%&'()*+,-./:;<=>?@[]^_\\{|}~`,
  numbers: '0123456789'
};

const usePasswordField = () => {
  const passwordField = useField('password');
  const alert = useContext(AlertContext);

  const choice = (array) => {
    return array[Math.ceil(Math.random() * array.length - 1)];
  };

  const generate = (values) => {
    let charSet = '';
    let result = '';
    const {
      passwordLength,
      uppercase,
      lowercase,
      specialSymbols,
      numbers,
      useCustomCharset,
      customCharset,
      excludeFromCharset,
      excludeSymbols
    } = values;

    if (useCustomCharset && customCharset) {
      charSet = customCharset;
    } else {
      if (uppercase) charSet += charSets.uppercase;
      if (lowercase) charSet += charSets.lowercase;
      if (specialSymbols) charSet += charSets.specialSymbols;
      if (numbers) charSet += charSets.numbers;
    }

    if (excludeSymbols) {
      charSet = charSet.split('').filter((item) => (
        !excludeFromCharset.includes(item)
      ));
    }

    if (charSet.length) {
      let length = Math.abs(Number.parseInt(passwordLength));
      length = length > 2048 ? 2048 : length;

      if (isNaN(length)) {
        alert.show('Invalid Password Length', 'warning');
        return '';
      }
  
      for (let i = 0; i < length; i++) {
        result += choice(charSet);
      }
    }

    if (passwordField) passwordField.set(result);
    return result;
  };

  return { generate };
};

export default usePasswordField;
