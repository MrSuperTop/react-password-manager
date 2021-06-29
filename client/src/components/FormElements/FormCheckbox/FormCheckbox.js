import React, { useContext } from 'react';
import { InputsContext } from '../../../context/inputs/inputsContext';

const FormCheckbox = ({ valueAttrName, label, id }) => {
  const inputs = useContext(InputsContext);

  return (
    <div className="form-item">
      <div className="input-group checkbox-input">
        <input
          type="checkbox"
          required
          checked={inputs.values[valueAttrName] || false}
          onChange={inputs.checkboxChangeHandler}
          name={valueAttrName}
          id={id}
          />
        {label && <label htmlFor={id} className="checkbox-label">{label}</label>}
      </div>
    </div>
  );
};

export default FormCheckbox;
