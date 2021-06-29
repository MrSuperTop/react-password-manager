import React, { useReducer, useEffect } from 'react';

import { UPDATE_DATA, CLEAR_DATA, SET_INITIAL } from '../types';
import { InputsContext } from './inputsContext';
import { inputsReducer } from './inputsReducer';

const initialStates = {
  'e&p': {
    name: '',
    email: '',
    password: ''
  },
  'pass-gen': {
    uppercase: true,
    lowercase: true,
    specialSymbols: true,
    numbers: true,
    passwordLength: ""
  }
}

const InputsState = ({ children, type = 'e&p' }) => {
  // TODO: Про loading в этом стейте, или создать отдельный стейт для лоадингв
  const [state, dispatch] = useReducer(inputsReducer, {
    values: {}
  });

  useEffect(() => {
    setValues(initialStates[type]);
  }, []);
  
  const setType = (typeString) => {
    dispatch({
      type: SET_INITIAL,
      payload: initialStates[typeString]
    });
  };

  const expandType = (typeString) => {
    dispatch({
      type: SET_INITIAL,
      payload: { ...state.initial, ...initialStates[typeString] }
    });
  };

  const setValue = (inputAttrName, value) => {
    dispatch({ type: UPDATE_DATA, payload: { [inputAttrName]: value } });
  };

  const setValues = (values) => {
    dispatch({
      type: SET_INITIAL,
      payload: values
    });
  }

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    dispatch({ type: UPDATE_DATA, payload: { [name]: value } });
  };

  const checkboxChangeHandler = (e) => {
    const value = e.target.checked;
    const name = e.target.name;

    dispatch({ type: UPDATE_DATA, payload: { [name]: !!value } });
  };

  const selectChangeHandler = (e, attrName) => {
    dispatch({ type: UPDATE_DATA, payload: { [attrName]: e.value } });
  };

  const setupSelect = (value, attrName) => {
    dispatch({ type: UPDATE_DATA, payload: { [attrName]: value } });
    dispatch({ type: SET_INITIAL, payload: {
      ...state.values, [attrName]: value
    } });
  }

  const clear = () => {
    dispatch({ type: CLEAR_DATA })
  };

  return (
    <InputsContext.Provider value={{
      changeHandler, clear, setType, expandType,
      setValues, setValue,
      selectChangeHandler, setupSelect,
      checkboxChangeHandler,
      values: state.values
    }}>
      { children }
    </InputsContext.Provider>
  );
};

export default InputsState;
