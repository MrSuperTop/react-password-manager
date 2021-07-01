import { UPDATE_DATA, CLEAR_DATA, SET_INITIAL, EXPAND_INITIAL, SET_CLEAR_MIDDLEWARE } from '../types';

const handlers = {
  [SET_INITIAL]: (state, { payload }) => ({
    ...state,
    initial: { ...payload }
  }),

  [EXPAND_INITIAL]: (state, { payload }) => ({
    ...state,
    initial: { ...state.initial, ...payload }
  }),

  [UPDATE_DATA]: (state, { payload }) => ({
    ...state,
    values: {
      ...state.values,
      ...payload
    }
  }),

  [SET_CLEAR_MIDDLEWARE]: (state, { payload }) => ({
    ...state,
    clearMiddleware: payload
  }),

  [CLEAR_DATA]: (state) => ({ ...state, values: { ...state.initial } }),

  DEFAULT: (state) => state
};

export const inputsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

