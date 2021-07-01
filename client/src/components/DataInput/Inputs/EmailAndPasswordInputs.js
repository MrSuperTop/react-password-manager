import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import FormSelect from '../../FormElements/FormSelect/FormSelect';
import FormItem from '../../FormElements/FormInput/FormInput';
import PasswordInput from '../../FormElements/PasswordInput/PasswordInput';
import { getUserEmails } from '../../../api';
import Loader from '../../Loader/Loader';
import GeneratorState from '../../../context/generator/GeneratorState';
import InputsContext from '../../../context/inputs/inputsContext';

// TODO: Как называть файлы такого типа?
const EmailAndPassword = () => {
  const inputs = useContext(InputsContext);
  const [selectEmails, setSelectEmails] = useState([]);
  const [defaultOption, setDefaultOption] = useState(selectEmails[0]);

  useEffect(() => {
    getUserEmails().then(({ data }) => {
      setSelectEmails(data.emails.map((item) => ({
        value: item,
        label: item
      })));
    });

    if (inputs.values?.email) {
      const value = inputs.values?.email;
      setDefaultOption({ value, label: value });
    }
  }, []);

  if (!selectEmails) return <Loader />;

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
