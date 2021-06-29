import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-regular-svg-icons';

const NoData = ({ children }) => {
  return (
    <>
      <div className="no-data-container">
        <FontAwesomeIcon className="text-dimm" icon={faFrown} size="3x" />
        <h1>Nothing here...</h1>
        <h3 className="text-dimm">
          {children}
        </h3>
      </div>
    </>
  );
};

export default NoData;
