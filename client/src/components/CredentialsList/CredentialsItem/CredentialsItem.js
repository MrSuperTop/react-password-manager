import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faClipboard, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertContext } from '../../../context/alert/alertContext';

const CredentialsItem = ({ data, deleteItem, editItem }) => {
  const alert = useContext(AlertContext);

  const copyData = async (e) => {
    let element = e.target;
    let string = element.getAttribute('data-to-copy');

    while (!string) {
      element = element.parentElement;
      string = element.getAttribute('data-to-copy');
    }

    alert.showWithTimeout(`Copied to your clipboard! "${string}"`)
    await navigator.clipboard.writeText(string);
  }

  return (
    <div className="credentials-item bg-dark">
      <div className="name-container">
        <h3>{data.name}</h3>
      </div>

      <div className="data-container">
        <div className="data-item">
          <div className="data-item__text">
            <h6>Email</h6>
            <p className="data-content">{data.email}</p>
          </div>
          <div
            className="action-btn btn btn-success"
            data-to-copy={data.email}
            onClick={copyData}
          >
            <FontAwesomeIcon icon={faClipboard}/>
          </div>
        </div>
        <div className="data-item">
          <div className="data-item__text">
            <h6>Password</h6>
            <p className="data-content">{data.password}</p>
          </div>
          <div
            className="action-btn btn btn-success"
            // TODO: Спросить про названия кастомных аттрибутов в jsx
            data-to-copy={data.password}
            onClick={copyData}
          >
            <FontAwesomeIcon icon={faClipboard}/>
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <div
          className="btn btn-primary"
          onClick={() => editItem(data._id)}
        >
          <FontAwesomeIcon icon={faPenAlt} />
        </div>
        <div
          className="btn btn-danger"
          onClick={() => deleteItem(data._id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
    </div>
  );
};

export default CredentialsItem;
