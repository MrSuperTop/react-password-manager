import React, { useReducer, useEffect, useContext } from 'react';

import { SET_VISIBILITY, SET_REF, SET_POSITION } from '../types';
import { generatorReducer } from './generatorReducer';
import { GeneratorContext } from './generatorContext';
import { InputsContext } from '../inputs/inputsContext';

const charSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  specialSymbols: `!"#$%&'()*+,-./:;<=>?@[\]^_\\{|}~`,
  numbers: '0123456789'
};

const GeneratorState = ({ children }) => {
  const inputs = useContext(InputsContext);
  const [state, dispatch] = useReducer(generatorReducer, {
    visible: false,
    container: null,
    position: {},
    objects: 0
  });

  useEffect(() => {
    // TODO: Как это сжделать красивее?
    inputs.expandType('pass-gen');
  }, []);

  // TODO: Так делают?
  const setRef = (ref) => {
    console.log(ref)
    dispatch({ type: SET_REF, payload: ref });
  };

  const show = () => {
    dispatch({ type: SET_VISIBILITY, payload: true });

    console.log(state)
    const dimentions = state.refs.inputContainer.getBoundingClientRect();
    let { top, left, width, height } = dimentions;
    top += height + 16;
    left += (width / 2 - state.refs.generator.clientWidth / 2);

    setPosition({
      top,
      left
    });
  };

  const hide = () => {
    dispatch({ type: SET_VISIBILITY, payload: false })
  };

  const setPosition = (position) => {
    dispatch({ type: SET_POSITION, payload: position })
  };

  const choice = (array) => {
    return array[Math.ceil(Math.random() * array.length - 1)];
  }

  const genPassword = () => {
    let charSet = '';
    let result = '';
    const { uppercase, lowercase, specialSymbols, numbers } = inputs.values;

    if (uppercase) charSet += charSets.uppercase;
    if (lowercase) charSet += charSets.lowercase;
    if (specialSymbols) charSet += charSets.specialSymbols;
    if (numbers) charSet += charSets.numbers;

    if (!charSet) return '';
    
    console.log(charSet)
    const length = Number.parseInt(inputs.values.passwordLength)
    for (let i = 0; i < length; i++) {
      result += choice(charSet);
    }

    return result;
  };

  return (
    <GeneratorContext.Provider value={{
      setRef, show, hide, setPosition, genPassword,
      objects: state.refs,
      visible: state.visible,
      position: state.position
    }}>
      { children }
    </GeneratorContext.Provider>
  );
};

export default GeneratorState;
