import React, { useContext, useRef, useEffect } from 'react';
import { InputsContext } from '../../../context/inputs/inputsContext';

// TODO: Нормально ли ту запрашивать valueName или лучше сразу предавать хначение, может вообще нету смысла ничего запрашивать, а просто брать значение с id
const FormItem = ({ children, valueAttrName, label, id, type, placeholder, notRequired }) => {
  const inputs = useContext(InputsContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.required = !notRequired;
  }, []);
  
  return (
    <div className="form-item">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <div className="input-group">
        {children && <span className="input-group-text">
          {children}
        </span>}
        <input
          required
          ref={inputRef}
          value={inputs.values[valueAttrName] || ''}
          onChange={inputs.changeHandler}
          name={valueAttrName}
          id={id}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FormItem;
