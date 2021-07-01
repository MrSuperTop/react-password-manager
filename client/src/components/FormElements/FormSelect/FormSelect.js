import React, { useState, useContext, useEffect } from 'react';
import InputsContext from '../../../context/inputs/inputsContext';
import Creatable from 'react-select/creatable';

const FormSelect = ({ children, valueAttrName, label, selectSettings }) => {
  const inputs = useContext(InputsContext);
  const [selected, setSelected] = useState(selectSettings.defaultValue);

  const onClear = () => {
    if (!inputs.values[valueAttrName]) {
      return setSelected(null);
    }

    setSelected(selectSettings.defaultValue);
  };

  useEffect(() => {
    if (selectSettings.defaultValue) {
      inputs.setupSelect(
        selectSettings.defaultValue.value,
        valueAttrName
      );
    }

    inputs.setClearMiddleware(onClear);
  }, []);

  const changeHandler = (option) => {
    inputs.selectChangeHandler(option, valueAttrName);
    setSelected(option);
  };

  return (
    <div className="form-item">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          {children}
        </span>
        <Creatable
          required
          value={selected}
          defaultInputValue={inputs.values[valueAttrName]}
          onChange={changeHandler}
          {...selectSettings}
        />
      </div>
    </div>
  );
};

export default FormSelect;
