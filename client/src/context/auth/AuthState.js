import React, { useReducer, useEffect, useContext } from 'react';
import decode from 'jwt-decode';

import * as api from '../../api';
import AlertContext from '../alert/alertContext';
import CredentialsContext from '../credentials/credentialsContext';
import { LOG_IN, LOG_OUT, IMPORT_DATA } from '../types';
import AuthContext from './authContext';
import { authReducer } from './authReducer';
import useUser from '../../hooks/user.hook';

const keyName = 'userData';

const AuthState = ({ children }) => {
  const alert = useContext(AlertContext);
  const credentials = useContext(CredentialsContext);
  const { user } = useUser();
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    userId: null
  });

  useEffect(() => {
    if (user) {
      dispatch({ type: IMPORT_DATA, payload: user });
    }
  }, []);

  const register = async (formData) => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      return alert.show('Passwords Don\'t Match!', 'warning');
    }

    const { status, data } = await api.register(formData);

    if (status === 201) {
      alert.show('You have registered successfully!', 'success');
    } else {
      alert.show(data.message, 'danger');
    }

    return status === 201;
  };

  const logIn = async (formData, history) => {
    const { data } = await api.logIn(formData);
    const neededData = {
      token: data.token,
      id: data.userId,
      email: data.email
    };

    dispatch({
      type: LOG_IN,
      payload: neededData
    });
    alert.show(data.message, 'success');

    localStorage.setItem(keyName, JSON.stringify(neededData));

    history.push('/home');
  };

  const logOut = (history, message = 'You have just logged out') => {
    dispatch({ type: LOG_OUT });

    alert.show(message, 'danger');

    credentials.clearData();
    localStorage.removeItem(keyName);
    history.push('/auth');
  };

  const expiresIn = () => {
    const decodedToken = decode(state.token);

    return decodedToken.exp * 1000;
  };

  return (
    <AuthContext.Provider value={{
      logIn, register, logOut,
      expiresIn,
      user: state
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthState;
