import React, { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Collapsable = ({ children, text, id }) => {
  const conllapsableRef = useRef();
  const clickHandler = () => {
    const icon = conllapsableRef.current.children[0].children[0];
    icon.classList.toggle('upside-down');
  };

  return (
    <div className="collapsable" ref={conllapsableRef}>
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
