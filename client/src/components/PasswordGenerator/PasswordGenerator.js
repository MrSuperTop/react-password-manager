import React, { useContext, useEffect, useRef } from 'react';
import { GeneratorContext } from '../../context/generator/generatorContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import FormItem from '../FormElements/FormInput/FormInput';
import { InputsContext } from '../../context/inputs/inputsContext';
import FormCheckbox from '../FormElements/FormCheckbox/FormCheckbox';

// FIX_ME: Save generator settings in user model
// FIX_ME: Abbility to set customn char set and save it as well

const PasswordGenerator = ({ inputContainerRef, generatePassword }) => {
  const inputs = useContext(InputsContext);
  const generator = useContext(GeneratorContext);
  const generatorRef = useRef();

  useEffect(() => {
    generator.setRef({ generatorRef, inputContainerRef });
  }, [])

  return (
    <div
      ref={generatorRef}
      style={{ ...generator.position }}
      className={'password-generator-container bg-light' + (generator.visible ? ' visible' : '')}
    >
      <div>
        {/* FIX_ME: Ability to add customn functions to be run onChange */}
        <FormItem
          valueAttrName='passwordLength'
          label="Password Length"
          id="passwordLength"
          type="text"
          placeholder="Password Length">
        </FormItem>
        <FormCheckbox
          label="Use Uppercase Letters"
          id="uppercase"
          valueAttrName="uppercase"
          onChange={inputs.checkboxChangeHandler}
        />
        <FormCheckbox
          label="Use Lowercase Letters"
          id="lowercase"
          valueAttrName="lowercase"
          onChange={inputs.checkboxChangeHandler}
        />
        <FormCheckbox
          label="Use Special Symbols"
          id="specialSymbols"
          valueAttrName="specialSymbols"
          onChange={inputs.checkboxChangeHandler}
        />
        <FormCheckbox
          label="Use Numbers"
          id="numbers"
          valueAttrName="numbers"
          onChange={inputs.checkboxChangeHandler}
        />
      </div>
      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-primary"
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
