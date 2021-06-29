import React, { useReducer } from 'react';

import { SHOW_ALERT, HIDE_ALERT } from '../types';
import { AlertContext } from './alertContext';
import { alertReducer } from './alertReducer';

// FIX_ME: More alerts about stuff at auth page
// FIX_ME: Move all stuff to the Trello
// FIX_ME: Implament tags and search using names and tags
// FIX_ME: More types of data, which can be stored
// FIX_ME: Selector for email in create page input form using react-select
// FIX_ME: Customn and icons presents for diffrent types of alerts + make show into show with timeout if timeout is diffrent from 0

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
