import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router-dom';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const UserPage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const expiresIn = dayjs(auth.expiresIn().toString(), 'x').fromNow();
  // const loggedAs = 

  return (
    <div className="container">
      <div className="block logged-in-as">
        <h5>Logged in as {auth.user.email}</h5>
        <button
          className="btn btn-danger"
          onClick={() => auth.logOut(history)}
        >
          Log Out
        </button>
      </div>
      <div className="block logout">
        <h5>Your token expires {expiresIn}</h5>
      </div>
    </div>
  );
};

export default UserPage;
