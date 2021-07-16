import React from 'react';

const RegisterInputs = ({ formData, changeHandler }) => {
  return (
    <>
      <input
        id="email-field"
        required
        className="form-control"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={changeHandler}
      />
      <input
        id="password-field"
        required
        className="form-control"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={changeHandler}
      />
      <input
        id="confirm-password-field"
        required
        className="form-control"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={changeHandler}
      />
    </>
  );
};

export default RegisterInputs;
