import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faClipboard, faPenAlt, faEye, faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import AlertContext from '../../../context/alert/alertContext';
import useShowButton from '../../../hooks/showButton.hook';
import useAnimatedIcon from '../../../hooks/animatedIcon.hook';

const CredentialsItem = ({ data, deleteItem, editItem }) => {
  const alert = useContext(AlertContext);
  const passwordRef = useRef();
  const buttonRef = useRef();
  const [buttonIcon, setButtonIcon] = useAnimatedIcon(faEye, .3, buttonRef);
  const showButton = useShowButton(passwordRef, .5, setButtonIcon);

  const copyData = async (e) => {
    let element = e.target;
    let string = element.getAttribute('data-to-copy');

    while (!string) {
      element = element.parentElement;
      string = element.getAttribute('data-to-copy');
    }

    alert.show(`Copied to your clipboard! "${string}"`);
    await navigator.clipboard.writeText(string);
  };

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
          <div className="data-item__buttons">
            <div
              className="action-btn btn btn-success"
              data-to-copy={data.email}
              onClick={copyData}
            >
              <FontAwesomeIcon icon={faClipboard}/>
            </div>
          </div>
        </div>
        <div className="data-item">
          <div className="data-item__text">
            <h6>Password</h6>
            <p
              className="data-content hidden"
              ref={passwordRef}
              onMouseEnter={() => showButton.showData(1)}
              onMouseLeave={showButton.hideData}
            >{data.password}</p>
          </div>
          <div className="data-item__buttons">
            <div
              ref={buttonRef}
              className="action-btn btn btn-primary"
              onMouseEnter={showButton.showData}
              onMouseLeave={showButton.hideData}
              onClick={() => {
                if (!showButton.shown || showButton.shown && showButton.blockEvents) {
                  // Showing before the timeout
                  showButton.toggleBlockEvents();
                  showButton.toggleShown();
                  clearTimeout(showButton.timeoutId);
                } else if (showButton.shown) {
                  // Locking the visiblity when shown and clicked
                  showButton.toggleBlockEvents();
                  setButtonIcon(!showButton.blockEvents ? faLockOpen : faLock);
                }
              }}
            >
              <FontAwesomeIcon icon={buttonIcon}/>
            </div>
            <div
              className="action-btn btn btn-success"

              data-to-copy={data.password}
              onClick={copyData}
            >
              <FontAwesomeIcon icon={faClipboard}/>
            </div>
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
