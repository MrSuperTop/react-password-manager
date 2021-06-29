import React, { useContext, useEffect } from 'react';
import { CredentialsContext } from '../../context/credentials/credentialsContext';
import { useHistory } from 'react-router-dom';

import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData';
import CredentialsItem from './CredentialsItem/CredentialsItem';

const CredentialsList = () => {
  const history = useHistory();
  const credentials = useContext(CredentialsContext);
  
  useEffect(() => {
    credentials.fetch();
  }, [])

  const deleteItem = (id) => {
    credentials.deleteItem(id);
  }

  const editItem = (id) => {
    history.push(`/edit/${id}`);
  }

  if (credentials.loading) return <Loader />

  return (
    <div className="container credentials-container">
      {
        credentials.list.length ? (
          credentials.list.map((item) => (
            <CredentialsItem
              key={item._id}
              data={item}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          ))
        ) : (
          <NoData>
            Start by clicking "Add Item"
          </NoData>
        )
      }
    </div>
  );
};

export default CredentialsList;
