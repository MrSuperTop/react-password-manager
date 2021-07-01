import React, { useContext, useEffect, useRef } from 'react';
import { GeneratorContext } from '../../context/generator/generatorContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import FormItem from '../FormElements/FormInput/FormInput';
import InputsContext from '../../context/inputs/inputsContext';
import FormCheckbox from '../FormElements/FormCheckbox/FormCheckbox';
import Collapsable from '../Collapsable/Collapsable';
import usePasswordField from '../../hooks/passwordField';

const PasswordGenerator = ({ inputContainerRef, generatePassword }) => {
  const inputs = useContext(InputsContext);
  const generator = useContext(GeneratorContext);
  const generatorRef = useRef();

  const passwordField = usePasswordField();
  generatePassword = generatePassword || (
    () => passwordField.generate(inputs.values)
  );

  useEffect(() => {
    generator.setRef({ generatorRef, inputContainerRef });
  }, [])

  const rangeInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const payload = { [name]: value };

    inputs.setValue(name, value);
    inputs.changeMiddleware(e, payload);
  };

  const CheckBoxHandler = (e) => {
    inputs.checkboxChangeHandler(e);
  };

  return (
    <div
      ref={generatorRef}
      style={{ ...generator.position }}
      className={'form-component password-generator-container bg-light' + (generator.visible ? ' visible' : '')}
    >
      <div className="settings-container">
        <FormItem
          valueAttrName='passwordLength'
          label="Password Length"
          id="passwordLength"
          type="text"
          placeholder="Password Length"
          onChange={rangeInputHandler}
          rangeObject={
            <input
              name="passwordLength"
              value={inputs.values?.passwordLength}
              type="range"
              className="form-range"
              min={0}
              step={16}
              max={256}
              onInput={rangeInputHandler}
            />
          }
        />

        <FormCheckbox
          label="Use Uppercase Letters"
          id="uppercase"
          valueAttrName="uppercase"
          onChange={CheckBoxHandler}
        />
        <FormCheckbox
          label="Use Lowercase Letters"
          id="lowercase"
          valueAttrName="lowercase"
          onChange={CheckBoxHandler}
        />
        <FormCheckbox
          label="Use Special Symbols"
          id="specialSymbols"
          valueAttrName="specialSymbols"
          onChange={CheckBoxHandler}
        />
        <FormCheckbox
          label="Use Numbers"
          id="numbers"
          valueAttrName="numbers"
          onChange={CheckBoxHandler}
        />

      <Collapsable
        id="more-info-collapsable"
        text="More options..."
      >
        <FormCheckbox
          label="Auto Regenerate Password"
          id="auto-regenerate"
          valueAttrName="autoRegenerate"
          onChange={CheckBoxHandler}
        />
      </Collapsable>
      </div>

      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-success"
          onClick={generatePassword}
        >Generate</button>
        <div
          className="close-btn"
          onClick={generator.hide}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
