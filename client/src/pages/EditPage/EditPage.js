import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import CredentialsContext from '../../context/credentials/credentialsContext';
import InputsContext from '../../context/inputs/inputsContext';
import DataInputs from '../../components/DataInput/DataInputs';
import AlertContext from '../../context/alert/alertContext';

const EditPage = () => {
  const history = useHistory();
  const alert = useContext(AlertContext);
  const inputs = useContext(InputsContext);
  const credentials = useContext(CredentialsContext);

  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    credentials.fetchOne(id).then((data) => {
      setData(data);

      const { email, password, name } = data;
      inputs.setValues({ email, password, name });
      inputs.expandType(['pass-gen']);
    });
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
  };

  const undoChanges = () => {
    inputs.clear();
    alert.show('Changes where undone', 'warning');
  };

  if (credentials.loading || !Object.keys(inputs.values).length) {
    return <Loader />;
  }

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
