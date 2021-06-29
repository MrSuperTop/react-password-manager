import React from 'react';
import EmailAndPassword from './Inputs/EmailAndPasswordInputs';

const DataInputs = ({ type }) => {
  return (
    <>
      {type === 'e&p' && <EmailAndPassword />}
    </>
  );
};

export default DataInputs;
