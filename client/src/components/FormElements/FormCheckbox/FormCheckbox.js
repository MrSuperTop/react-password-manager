import React, { useContext } from 'react';
import InputsContext from '../../../context/inputs/inputsContext';

const FormCheckbox = ({ valueAttrName, label, id, onChange }) => {
  const inputs = useContext(InputsContext);
  const checked = inputs.values[valueAttrName] || false;

  return (
    <div className="form-item form-check form-switch">
      <input
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={onChange || inputs.checkboxChangeHandler}
        name={valueAttrName}
        id={id}
      />
      {label && <label htmlFor={id} className="checkbox-label">{label}</label>}
    </div>
  );
};

export default FormCheckbox;
