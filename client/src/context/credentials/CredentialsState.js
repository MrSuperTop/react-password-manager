import React, { useReducer, useContext } from 'react';

import { fetchCredentials, deleteOne as deleteOneAPI, addOne as addOneAPI, getOne as getOneAPI, editOne as editOneAPI } from '../../api';
import { AlertContext } from '../alert/alertContext';
import { FETCH_CREDENTIALS, SET_LOADING, ADD_ONE, DELETE_ONE, GET_ONE, UPDATE_ONE, CLEAR_DATA } from '../types';
import { CredentialsContext } from './credentialsContext';
import { credentialsReducer } from './credentialsReducer';

const CredentialsState = ({ children }) => {
  // TODO: Про loading в этом стейте, или создать отдельный стейт для лоадингв
  const [state, dispatch] = useReducer(credentialsReducer, {
    loading: true,
    list: [],
    post: {}
  });

  const alert = useContext(AlertContext)

  // TODO: Нормально?
  const setLoading = (value) => {
    dispatch({ type: SET_LOADING, payload: value })
  };

  const fetch = async () => {
    // TODO: Делать автоматом loading: true в reducer-е или и так нормально?
    const { data: { data } } = await fetchCredentials();
    dispatch({ type: FETCH_CREDENTIALS, payload: data });
    setLoading(false);
  };

  const clearData = async () => {
    dispatch({ type: CLEAR_DATA });
  }

  const addItem = async (formData) => {
    const { data } = await addOneAPI(formData);

    alert.showWithTimeout(data.message, 'success', 2.5, true);
    dispatch({ type: ADD_ONE, payload: formData });
  };

  const deleteItem = async (id) => {
    // TODO: Нормально тут так делать или нет смысла нагружать API
    // TODO: Кнопку для отмены
    const { data: { itemId, message } } = await deleteOneAPI(id);

    alert.showWithTimeout(message, 'danger')
    dispatch({ type: DELETE_ONE, payload: itemId });
  };

  const fetchOne = async (id) => {
    const { data: { item } } = await getOneAPI(id);
  
    dispatch({ type: GET_ONE, payload: item });
    setLoading(false);
  };

  const editItem = async (id, formData) => {
    const { data: { item, message } } = await editOneAPI(id, formData);

    alert.showWithTimeout(message, 'primary')
    dispatch({ type: UPDATE_ONE, payload: item });
  }

  return (
    <CredentialsContext.Provider value={{
      fetch, fetchOne, addItem, editItem,
      clearData, deleteItem,
      singleItem: state.post,
      loading: state.loading,
      list: state.list
    }}>
      { children }
    </CredentialsContext.Provider>
  );
};

export default CredentialsState;
