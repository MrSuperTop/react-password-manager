import { FETCH_CREDENTIALS, SET_LOADING, DELETE_ONE, ADD_ONE, UPDATE_ONE, CLEAR_DATA } from '../types';

const handlers = {
  [SET_LOADING]: (state, { payload }) => ({ ...state, loading: payload }),
  [CLEAR_DATA]: (state) => ({ ...state, list: [], post: {} }),
  [FETCH_CREDENTIALS]: (state, { payload }) => ({
    ...state,
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

