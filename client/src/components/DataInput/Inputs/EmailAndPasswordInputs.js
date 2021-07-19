import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import FormSelect from '../../FormElements/FormSelect/FormSelect';
import FormItem from '../../FormElements/FormInput/FormInput';
import PasswordInput from '../../FormElements/PasswordInput/PasswordInput';
import { getUserEmails } from '../../../api';
import GeneratorState from '../../../context/generator/GeneratorState';
import InputsContext from '../../../context/inputs/inputsContext';

// TODO: Как называть файлы такого типа?
const EmailAndPassword = () => {
  const inputs = useContext(InputsContext);
  const [selectEmails, setSelectEmails] = useState([]);
  const [defaultOption, setDefaultOption] = useState(selectEmails[0]);

  useEffect(() => {
    getUserEmails().then(({ data }) => {
      const options = [];

      for (let i = 0; i < data.length; i++) {
        let item = {
          value: data[i],
          label: data[i]
        };

        if (selectEmails.includes(item)) continue;

        options.push(item);
      }

      setSelectEmails((prev) => {
        return [
          ...prev,
          ...options
        ];
      });
    });

    if (inputs.values?.email) {
      const value = inputs.values?.email;

      setDefaultOption({ value, label: value });
      setSelectEmails((prev) => [...prev, { value, label: value }]);
    };
  }, []);

  // if (!selectEmails.length) return <Loader />;

  return (
    <>
      <FormItem
        valueAttrName='name'
        label="Resource Name"
        id="name"
        type="text"
        placeholder="Name"
      >
        <FontAwesomeIcon icon={faEllipsisH}/>
      </FormItem>

      <div className="top-row">
        <FormSelect
          valueAttrName="email"
          label="Email"
          selectSettings={{
            defaultValue: defaultOption,
            options: selectEmails
          }}
        >
          <FontAwesomeIcon icon={faAt}/>
        </FormSelect>

        <GeneratorState>
          <PasswordInput
            valueAttrName='password'
            label="Password"
            id="password"
            toggable
            placeholder="Password"
          >
            <FontAwesomeIcon icon={faKey}/>
          </PasswordInput>
        </GeneratorState>
      </div>
    </>
  );
};

export default EmailAndPassword;
