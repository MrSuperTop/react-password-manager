import React, { useReducer, useEffect } from 'react';

import { SET_VISIBILITY, SET_REF, SET_POSITION } from '../types';
import { generatorReducer } from './generatorReducer';
import GeneratorContext from './generatorContext';

const GeneratorState = ({ children }) => {
  const [state, dispatch] = useReducer(generatorReducer, {
    visible: false,
    container: null,
    position: {},
    objects: 0
  });

  useEffect(() => {
    window.addEventListener('resize', updatePostion);

    return (() => {
      window.removeEventListener('resize', updatePostion);
    });
  }, []);

  // TODO: Так делают?
  const setRef = (ref) => {
    dispatch({ type: SET_REF, payload: ref });
  };

  const show = () => {
    dispatch({ type: SET_VISIBILITY, payload: true });
    updatePostion();
  };

  const updatePostion = () => {
    try {
      const dimentions = state.refs.inputContainer.getBoundingClientRect();
      let { top, left, width, height } = dimentions;
      top += height + 16;
      left += (width / 2 - state.refs.generator.clientWidth / 2);
      setPosition({ top, left });
    } catch (error) {}
  }

  const hide = () => {
    dispatch({ type: SET_VISIBILITY, payload: false })
  };

  const setPosition = (position) => {
    dispatch({ type: SET_POSITION, payload: position })
  };

  return (
    <GeneratorContext.Provider value={{
      setRef, show, hide, setPosition,
      objects: state.refs,
      visible: state.visible,
      position: state.position
    }}>
      { children }
    </GeneratorContext.Provider>
  );
};

export default GeneratorState;
