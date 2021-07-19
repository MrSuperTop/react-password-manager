import { faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import { useReducer } from 'react';

const handlers = {
  SET_TIMEOUT_ID: (state, { payload }) => ({
    ...state, timeoutId: payload
  }),

  SET_SHOWN: (state, { payload }) => ({
    ...state, shown: payload
  }),

  SET_BLOCK_EVENTS: (state, { payload }) => ({
    ...state, blockEvents: payload
  }),

  DEFAULT: (state) => state
};

const reducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

const useShowButton = (
  objectRef,
  showDelay = 0,
  setButtonIcon = (() => {})
) => {
  const [state, dispatch] = useReducer(reducer, {
    timeoutId: 0,
    shown: false,
    blockEvents: false
  });

  const setShown = (value) => {
    if (!objectRef) return;

    setButtonIcon(value ? faLock : faEye);

    dispatch({ type: 'SET_SHOWN', payload: !!value });

    const classList = objectRef.current.classList;
    if (!!value && classList) {
      classList.add('visible');
      classList.remove('hidden');
    } else {
      classList.add('hidden');
      classList.remove('visible');
    }
  };

  const setBlockEvents = (value) => {
    dispatch({ type: 'SET_BLOCK_EVENTS', payload: !!value });
  };

  const toggleShown = () => setShown(!state.shown);
  const toggleBlockEvents = () => setBlockEvents(!state.blockEvents);

  const showData = (timeout = 0) => {
    if (state.blockEvents) return;

    const id = setTimeout(() => {
      setShown(true);
    }, timeout * 1000 || showDelay * 1000);

    dispatch({ type: 'SET_TIMEOUT_ID', payload: id });
  };

  const hideData = () => {
    if (state.blockEvents) return;

    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }

    setShown(false);
  };

  return {
    hideData, showData,
    setShown, setBlockEvents,
    toggleShown, toggleBlockEvents,
    shown: state.shown,
    blockEvents: state.blockEvents,
    timeoutId: state.timeoutId
  };
};

export default useShowButton;