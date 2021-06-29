import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../../context/alert/alertContext';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const icons = {
  danger: faExclamationTriangle,
  success: faCheck,
  primary: faInfoCircle
}

const Alert = () => {
  const alert = useContext(AlertContext);

  useEffect(() => {}, [alert]);

  return (
    <CSSTransition
      in={alert.shown}
      timeout={300}
      unmountOnExit
      classNames="alert"
    >
      <div 
        className={`alert alert-${alert.type}`}
        role="alert"
      >
        {icons[alert.type] ? (
          <div className="alert-icon">
            <FontAwesomeIcon icon={icons[alert.type]}/>
          </div>
        ) : null}

        <p className="alert-text">{alert.text}</p>

        {alert.closable && (
          <div className="close-alert-btn">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={alert.hide}
            />
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default Alert;
