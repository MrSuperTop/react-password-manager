import { UPDATE_DATA, CLEAR_DATA, SET_INITIAL } from '../types';

const handlers = {
  [SET_INITIAL]: (state, { payload }) => ({
    ...state,
    initial: payload,
    values: payload
  }),

  [UPDATE_DATA]: (state, { payload }) => ({
    ...state,
    values: {
      ...state.values,
      ...payload
    }
  }),

  [CLEAR_DATA]: (state) => ({ ...state, values: { ...state.initial } }),

  DEFAULT: (state) => state
};

export const inputsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

