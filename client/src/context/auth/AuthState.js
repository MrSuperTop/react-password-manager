import React, { useReducer, useEffect, useContext } from 'react';

import { logIn as logInAPI, register as registerAPI } from '../../api';
import { AlertContext } from '../alert/alertContext';
import { LOG_IN, LOG_OUT, IMPORT_DATA } from '../types';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';

const keyName = 'userData';

const AuthState = ({ children }) => {
  const alert = useContext(AlertContext);
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    userId: null
  });

  useEffect(() => {
    // TODO: Check if the token is still valid
    const data = JSON.parse(localStorage.getItem(keyName));
    if (data) {
      // HERE
      dispatch({ type: IMPORT_DATA, payload: data })
    }
  }, []);

  const register = async (formData, history) => {
    registerAPI(formData);
    history.push('/home');
  }

  const logIn = async (formData, history) => {
    const { data } = await logInAPI(formData);
    const neededData = {
      token: data.token,
      id: data.userId
    };

    dispatch({
      type: LOG_IN,
      payload: neededData
    });
    alert.showWithTimeout(data.message, 'success');

    localStorage.setItem(keyName, JSON.stringify(neededData));

    history.push('/home');
  }

  const logOut = () => {
    dispatch({ type: LOG_OUT });
    alert.showWithTimeout('You have just logged out', 'danger');

    localStorage.removeItem(keyName);
  }

  return (
    <AuthContext.Provider value={{
      logIn, register, logOut,
      user: state
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthState;
