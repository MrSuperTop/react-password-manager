import React, { useContext, useEffect } from 'react';
import { InputsContext } from '../../../context/inputs/inputsContext';
import Creatable from 'react-select/creatable';

// FIX_ME: Make a use of AsyncSelect
const FormSelect = ({ children, valueAttrName, label, selectSettings }) => {
  const inputs = useContext(InputsContext);

  useEffect(() => {
    if (selectSettings.defaultValue) {
      inputs.setupSelect(
        selectSettings.defaultValue.value,
        valueAttrName
      );
    }
  }, []);

  const changeHandler = (e) => {
    inputs.selectChangeHandler(e, valueAttrName);
  };

  return (
    <div className="form-item">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          {children}
        </span>
        <Creatable
          valueAttrName="email"
          onChange={changeHandler}
          {...selectSettings}
        />
      </div>
    </div>
  );
};

export default FormSelect;
