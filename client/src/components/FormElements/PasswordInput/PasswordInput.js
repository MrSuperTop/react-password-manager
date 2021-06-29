import React, { useContext, useState, useRef, useEffect } from 'react';
import { InputsContext } from '../../../context/inputs/inputsContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import PasswordGenerator from '../../PasswordGenerator/PasswordGenerator';
import InputsState from '../../../context/inputs/InputsState';
import { GeneratorContext } from '../../../context/generator/generatorContext';

// FIX_ME: Переделать через контекст
// TODO: Нормально ли ту запрашивать valueName или лучше сразу предавать хначение, может вообще нету смысла ничего запрашивать, а просто брать значение с id
const PasswordInput = ({ children, valueAttrName, label, id, placeholder, notRequired, toggable, noGenerator }) => {
  const inputs = useContext(InputsContext);
  const generator = useContext(GeneratorContext)

  const [passwordLength, setPasswordLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef();
  const inputContainerRef = useRef();

  useEffect(() => {
    inputRef.current.required = !notRequired;
  }, []);

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev);
  };

  const changeHandler = (e) => {
    inputs.changeHandler(e);

    setPasswordLength(e.target.value.length);
  };

  const generatePassword = () => {
    const password = generator.genPassword();

    inputs.setValue('password', password);
    setPasswordLength(password.length);
  };

  return (
    <>
      {!noGenerator && (
        <PasswordGenerator
          inputContainerRef={inputContainerRef}
          generatePassword={generatePassword}
        />
      )}

      <div className="form-item">
        <label htmlFor={id} className="form-label">{label}</label>
        <div className="input-group" ref={inputContainerRef}>
          <span className="input-group-text">
            {children}
          </span>
          <input
            onFocus={generator.show}
            required
            ref={inputRef}
            value={inputs.values[valueAttrName] || ''}
            onChange={changeHandler}
            name={valueAttrName}
            id={id}
            type={showPassword ? "text" : "password"}
            className="form-control password-input"
            placeholder={placeholder}
          />

          {toggable ? (
            <button
              className="btn btn-outline-secondary toggle-password-icon"
              type="button"
              onClick={togglePasswordVisiblity}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          ) : null}

          <span className="input-group-text length-counter">
            {passwordLength}
          </span>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
