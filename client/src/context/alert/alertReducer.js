import { SHOW_ALERT, HIDE_ALERT } from '../types';

const handlers = {
  [SHOW_ALERT]: (state, { payload: { text, type, closable } }) => ({
    ...state,
    text: text || '',
    type: type || 'primary',
    closable,
    shown: true
  }),

  [HIDE_ALERT]: (state) => ({
    ...state,
    shown: false
  }),

  DEFAULT: (state) => state
};

export const alertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
