import React, { useReducer } from 'react';
import usePasswordField from '../../hooks/passwordField.hook';

import { UPDATE_DATA, CLEAR_DATA, SET_INITIAL, EXPAND_INITIAL, SET_CLEAR_MIDDLEWARE } from '../types';
import InputsContext from './inputsContext';
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
    specialSymbols: false,
    numbers: true,
    passwordLength: '16',
    autoRegenerate: true,
    customCharset: '',
    useCustomCharset: false,
    excludeFromCharset: '',
    excludeSymbols: ''
  }
};

const InputsState = ({ children }) => {
  // TODO: Про loading в этом стейте, или создать отдельный стейт для лоадингв
  const passwordField = usePasswordField();
  const [state, dispatch] = useReducer(inputsReducer, {
    values: {},
    initial: {}
  });

  const reset = (typeName = '') => {
    if (!typeName) {
      return clear();
    }

    dispatch({
      type: UPDATE_DATA,
      payload: initialStates[typeName]
    });
  };

  const setValues = (values) => {
    dispatch({
      type: SET_INITIAL,
      payload: values
    });

    dispatch({ type: CLEAR_DATA });
  };

  const expandValues = (values) => {
    dispatch({
      type: EXPAND_INITIAL,
      payload: values
    });

    dispatch({ type: CLEAR_DATA });
  };

  const setType = (typeString, expandWith = []) => {
    setValues(initialStates[typeString]);
    for (let item of expandWith) {
      expandValues({ ...state.initial, ...initialStates[item] });
    };
  };

  const expandType = (expandWith = []) => {
    for (let item of expandWith) {
      expandValues({ ...state.initial, ...initialStates[item] });
    };
  };

  const setValue = (inputAttrName, value) => {
    dispatch({ type: UPDATE_DATA, payload: { [inputAttrName]: value } });
  };

  const changeMiddleware = (e, changedValue) => {
    const name = e.target.name;
    const isValid = Object.keys(initialStates['pass-gen']).includes(name);

    if (isValid && name !== 'autoRegenerate' && state.values.autoRegenerate) {
      const updated = {
        ...state.values,
        ...changedValue
      };

      const password = passwordField.generate(updated);
      dispatch({ type: UPDATE_DATA, payload: { password } });
    }

    if (['customCharset', 'excludeFromCharset'].includes(name)) {
      const newValue = Array.from(new Set(e.target.value)).join('');
      dispatch({ type: UPDATE_DATA, payload: { [name]: newValue } });
    }
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const payload = { [name]: value };

    dispatch({ type: UPDATE_DATA, payload });
    changeMiddleware(e, payload);
  };

  const checkboxChangeHandler = (e) => {
    const value = e.target.checked;
    const name = e.target.name;
    const payload = { [name]: !!value };

    dispatch({ type: UPDATE_DATA, payload });
    changeMiddleware(e, payload);
  };

  const selectChangeHandler = (e, attrName) => {
    dispatch({ type: UPDATE_DATA, payload: { [attrName]: e.value } });
  };

  const setupSelect = (value, attrName) => {
    dispatch({ type: UPDATE_DATA, payload: { [attrName]: value } });
    dispatch({ type: SET_INITIAL, payload: {
      ...state.values, [attrName]: value
    } });
  };

  const clear = () => {
    const middleware = state.clearMiddleware || (() => {});

    middleware();
    dispatch({ type: CLEAR_DATA });
  };

  const setClearMiddleware = (func) => {
    dispatch({ type: SET_CLEAR_MIDDLEWARE, payload: func });
  };

  return (
    <InputsContext.Provider value={{
      changeHandler, reset, clear, setType, expandType,
      setValues, setValue,
      selectChangeHandler, setupSelect,
      checkboxChangeHandler,
      setClearMiddleware,
      changeMiddleware,
      values: state.values,
      initials: initialStates
    }}>
      { children }
    </InputsContext.Provider>
  );
};

export default InputsState;
