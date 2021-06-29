import { LOG_IN, LOG_OUT, IMPORT_DATA } from '../types';

const handlers = {
  [LOG_IN]: (state, {payload}) => ({...state, ...payload}),
  [LOG_OUT]: (state) => ({...state, token: null, id: null}),
  [IMPORT_DATA]: (state, {payload}) => ({...state, ...payload}),
  DEFAULT: (state) => state
};

export const authReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
