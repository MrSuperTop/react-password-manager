import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

import { logIn, register } from '../../api';
import RegisterInputs from './Inputs/RegisterInputs';
import LoginInputs from './Inputs/LoginInputs';
import AuthContext from '../../context/auth/authContext';

const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
};

const AuthPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const formTypeString = isRegister ? 'Register' : 'Log In';
  const toggleText = isRegister ? [
    'Have an account?', 'Login!'
  ] : ['Don\'t have an account?', 'Register!']

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isRegister) {
      const success = auth.register(formData);
      if (success) {
        setIsRegister(false);
        setFormData(initialState);
      }
    } else {
      auth.logIn(formData, history);
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => (
      {...prev, [name]: value}
    ))
  };

  const toggleMode = () => [
    setIsRegister((prev) => !prev)
  ];

  return (
    <div className="login-container ">
      <form className="login-form" onSubmit={submitHandler}>
        <div className="icon-container bg-primary text-white">
          <FontAwesomeIcon icon={faUserLock} size="lg" />
        </div>
        <h5 className="title">
          {formTypeString}
        </h5>

        <div className="input-container">
          {
            isRegister ?
            <RegisterInputs formData={formData} changeHandler={changeHandler} /> :
            <LoginInputs formData={formData} changeHandler={changeHandler} />
          }
        </div>
        <button className="btn btn-primary" type="submit">
          {formTypeString}
        </button>
      </form>

      <div className="toggle-text">
        <span>{toggleText[0]}</span>&nbsp;
        <span
          className="text-primary"
          onClick={toggleMode}
        >{toggleText[1]}</span>
      </div>
    </div>
  );
};

export default AuthPage;
