import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import { CredentialsContext } from '../../context/credentials/credentialsContext';
import { InputsContext } from '../../context/inputs/inputsContext';
import DataInputs from '../../components/DataInput/DataInputs';
import CredentialsList from '../../components/CredentialsList/CredentialsList';
import { AlertContext } from '../../context/alert/alertContext';

const EditPage = () => {
  const history = useHistory();
  const alert = useContext(AlertContext);
  const inputs = useContext(InputsContext);
  const credentials = useContext(CredentialsContext);

  const { id } = useParams();

  useEffect(() => {
    credentials.fetchOne(id);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    credentials.editItem(id, { ...inputs.values, type: data.type }).then(() => {
      history.push('/home');
    });
  };

  const deleteItem = (id) => {
    credentials.deleteItem(id).then(() => {
      history.push('/home');
    });
  }

  const undoChanges = () => {
    inputs.clear()
    alert.showWithTimeout('Changes where undone', 'warning')
  }

  useEffect(() => {
    const { email, password, name } = credentials.singleItem

    inputs.setValues({
      email, password, name
    });
  }, [credentials.singleItem]);

  // TODO: Как это скоротить и куда-то запихнкуть
  if (credentials.loading) return <Loader />

  const data = credentials.singleItem;

  return (
    <div className="container edit-container">
      <form onSubmit={submitHandler}>
        <DataInputs type={data.type}/>
        
        <div className="buttons-container">
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
          <button
            type="button"
            onClick={undoChanges}
            className="btn btn-warning"
          >
            Undo Changes
          </button>
          <button
            type="button"
            onClick={() => deleteItem(data._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
