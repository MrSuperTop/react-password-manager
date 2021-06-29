import React from 'react'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import CredentialsList from '../../components/CredentialsList/CredentialsList';

const HomePage = () => {
  return (
    <div className="conatiner">
      <div className="button-container">
        <Link to="/create">
          <div
            className="btn btn-lg btn-warning add-button"
          >
            Add Item
            <FontAwesomeIcon icon={faPlus}/>
          </div>
        </Link>
      </div>

      <CredentialsList />
    </div>
  )
}

export default HomePage
