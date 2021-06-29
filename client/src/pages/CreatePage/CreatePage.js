import React, { useState, useContext } from 'react';
import Select from 'react-select';

import { CredentialsContext } from '../../context/credentials/credentialsContext';
import { InputsContext } from '../../context/inputs/inputsContext';
import DataInputs from '../../components/DataInput/DataInputs';

const options = [
  {
    label: "Email & Password",
    value: "e&p",
  }
];

const CreatePage = () => {
  const credentials = useContext(CredentialsContext);
  const inputs = useContext(InputsContext);

  const [selected, setSelected] = useState(options[0]);

  const selectChangeHandler = (data) => {
    setSelected(data);
    inputs.setType(data.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    credentials.addItem({ ...inputs.values, type: selected.value });
    inputs.clear();
  };

  return (
    <div className="container create-container">
      <div className="select-container">
        <h4>Select Type</h4>
        <Select
          className="type-select"
          value={selected}
          onChange={selectChangeHandler}
          options={options}
          defaultValue={options[0]}
        >

        </Select>
      </div>

      <form onSubmit={submitHandler} className="create-form">
        <DataInputs type={selected.value} />
  
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
