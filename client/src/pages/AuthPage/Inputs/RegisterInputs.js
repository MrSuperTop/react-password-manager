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
        id="passowrd-field"
        required
        className="form-control"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={changeHandler}
      />
    </>
  );
};

export default RegisterInputs;
