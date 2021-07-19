import React, { useReducer, useContext } from 'react';

import * as api from '../../api';
import AlertContext from '../alert/alertContext';
import { FETCH_CREDENTIALS, SET_LOADING, ADD_ONE, DELETE_ONE, UPDATE_ONE, CLEAR_DATA } from '../types';
import CredentialsContext from './credentialsContext';
import { credentialsReducer } from './credentialsReducer';

const CredentialsState = ({ children }) => {
  // TODO: Про loading в этом стейте, или создать отдельный стейт для лоадингв
  const [state, dispatch] = useReducer(credentialsReducer, {
    loading: true,
    list: [],
    post: {}
  });

  const alert = useContext(AlertContext);

  // TODO: Нормально?
  const setLoading = (value) => {
    dispatch({ type: SET_LOADING, payload: value });
  };

  const fetch = async () => {
    // TODO: Делать автоматом loading: true в reducer-е или и так нормально?
    setLoading(true);
    const { data: { data } } = await api.fetchCredentials();
    dispatch({ type: FETCH_CREDENTIALS, payload: data });
    setLoading(false);
  };

  const clearData = async () => {
    dispatch({ type: CLEAR_DATA });
  };

  const addItem = async (formData) => {
    const { data } = await api.addOne(formData);

    alert.show(data.message, 'success', 2.5, true);
    dispatch({ type: ADD_ONE, payload: formData });
  };

  const deleteItem = async (id) => {
    // TODO: Нормально тут так делать или нет смысла нагружать API
    // TODO: Кнопку для отмены
    const { data: { itemId, message } } = await api.deleteOne(id);

    alert.show(message, 'danger');
    dispatch({ type: DELETE_ONE, payload: itemId });
  };

  const fetchOne = async (id) => {
    setLoading(true);
    const { data: { item } } = await api.getOne(id);

    setLoading(false);

    return item;
  };

  const editItem = async (id, formData) => {
    const { data: { item, message } } = await api.editOne(id, formData);

    alert.show(message, 'primary');
    dispatch({ type: UPDATE_ONE, payload: item });
  };

  return (
    <CredentialsContext.Provider value={{
      fetch, fetchOne, addItem, editItem,
      clearData, deleteItem,
      loading: state.loading,
      list: state.list
    }}>
      { children }
    </CredentialsContext.Provider>
  );
};

export default CredentialsState;
