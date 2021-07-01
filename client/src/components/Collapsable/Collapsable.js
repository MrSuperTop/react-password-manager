import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Collapsable = ({ children, text, id }) => {

  const clickHandler = () => {
    const icon = document.querySelector('.collapsable .chevron-icon');
    icon.classList.toggle('upside-down');
  }

  return (
    <div className="collapsable">
      <p
        className="collapsable-text"
        data-bs-toggle="collapse"
        data-bs-target={`#${id}`}
        aria-expanded="false"
        aria-controls={id}
        onClick={clickHandler}
      >
        {text}
        <FontAwesomeIcon
          className="chevron-icon"
          icon={faChevronUp} 
        />
      </p>
      <div className="collapse" id={id}>
        {children}
      </div>
    </div>
  );
};

export default Collapsable;
