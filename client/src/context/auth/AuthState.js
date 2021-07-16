import React, { useReducer, useEffect, useContext } from 'react';

import { logIn as logInAPI, register as registerAPI } from '../../api';
import AlertContext from '../alert/alertContext';
import CredentialsContext from '../credentials/credentialsContext';
import { LOG_IN, LOG_OUT, IMPORT_DATA } from '../types';
import AuthContext from './authContext';
import { authReducer } from './authReducer';

const keyName = 'userData';

const AuthState = ({ children }) => {
  const alert = useContext(AlertContext);
  const credentials = useContext(CredentialsContext);
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

  const register = async (formData) => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      return alert.show('Passwords Don\'t Match!', 'warning');
    }

    const { status, data } = await registerAPI(formData);

    if (status === 201) {
      alert.show('You have registered successfully!', 'success');
    } else {
      alert.show(data.message, 'danger');
    }

    return status === 201;
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
    alert.show(data.message, 'success');

    localStorage.setItem(keyName, JSON.stringify(neededData));

    history.push('/home');
  }

  const logOut = () => {
    dispatch({ type: LOG_OUT });
    alert.show('You have just logged out', 'danger');

    credentials.clearData();
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
