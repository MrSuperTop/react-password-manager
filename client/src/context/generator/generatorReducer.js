import { SET_REF, SET_VISIBILITY, SET_POSITION } from '../types';

const handlers = {
  [SET_REF]: (state, { payload }) => {
    const refs = Object.values(payload).reduce((accumulator, item, index) => {
      const attributeName = Object.keys(payload)[index].slice(0, -3);

      return {
        ...accumulator,
        [attributeName]: item.current
      };
    }, Object.values(payload)[0].current);

    return {
      ...state,
      refs
    };
  },

  [SET_VISIBILITY]: (state, { payload }) => ({ ...state, visible: payload }),
  [SET_POSITION]: (state, { payload }) => ({ ...state, position: payload }),

  DEFAULT: (state) => state
};

export const generatorReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

