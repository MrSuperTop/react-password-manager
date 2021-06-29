import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import FormSelect from '../../FormElements/FormSelect/FormSelect';
import FormItem from '../../FormElements/FormInput/FormInput';
import PasswordInput from '../../FormElements/PasswordInput/PasswordInput';
import { getUserEmails } from '../../../api';
import Loader from '../../Loader/Loader';
import GeneratorState from '../../../context/generator/GeneratorState';

// TODO: Как называть файлы такого типа?
const EmailAndPassword = () => {
  const [selectEmails, setSelectEmails] = useState([]);

  useEffect(() => {
    getUserEmails().then(({ data }) => {
      setSelectEmails(data.emails.map((item) => ({
        value: item,
        label: item
      })));
    });
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
        {/* FIX_ME: Ability to add a clear button + make the toggle button look better and possibly add an animation */}
        <FormSelect
          valueAttrName="email"
          label="Email"
          selectSettings={{
            defaultValue: selectEmails[0],
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
