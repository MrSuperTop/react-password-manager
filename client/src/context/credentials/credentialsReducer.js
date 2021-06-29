import { FETCH_CREDENTIALS, SET_LOADING, DELETE_ONE, ADD_ONE, GET_ONE, UPDATE_ONE } from '../types';

const handlers = {
  [SET_LOADING]: (state, { payload }) => ({ ...state, loading: payload }),
  [FETCH_CREDENTIALS]: (state, { payload }) => ({
    ...state,
    loading: true,
    list: [ ...payload ]
  }),

  [ADD_ONE]: (state, { payload }) => ({
    ...state,
    list: [ ...state.list, payload ]
  }),

  [DELETE_ONE]: (state, { payload }) => ({
    ...state,
    list: state.list.filter((item) => item._id !== payload)
  }),

  [GET_ONE]: (state, { payload }) => ({ ...state, post: payload, loading: true }),

  [UPDATE_ONE]: (state, { payload }) => ({
    ...state,
    list: state.list.map((item) => (
      item._id === payload._id ? payload : item
    ))
  }),

  DEFAULT: (state) => state
};

export const credentialsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

