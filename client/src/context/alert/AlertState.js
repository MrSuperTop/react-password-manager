import React, { useReducer } from 'react';

import { SHOW_ALERT, HIDE_ALERT } from '../types';
import { AlertContext } from './alertContext';
import { alertReducer } from './alertReducer';


const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, {
    text: 'Placeholder Test Text',
    type: 'primary',
    shown: false
  });

  const show = (
    text = '',
    type = 'primary',
    closable = true,
    timeout = 0
  ) => {
    dispatch({ type: SHOW_ALERT, payload: { text, type, closable } });

    if (timeout !== 0) {
      setTimeout(() => hide(), timeout * 1000);
    }
  }

  const hide = () => {
    dispatch({ type: HIDE_ALERT });
  }

  const showWithTimeout = (
    text = '',
    type = 'primary',
    timeout = 2.5,
    closable = false
  ) => {
    show(text, type, closable);
    setTimeout(() => hide(), timeout * 1000);
  };

  return (
    <AlertContext.Provider value={{
      show, hide, showWithTimeout,
      ...state
    }}>
      { children }
    </AlertContext.Provider>
  );
};

export default AlertState;
