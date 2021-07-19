import React, { useContext } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import './scss/main.scss';
import useRoutes from './hooks/routes.hook'
import AuthContext from './context/auth/authContext';

function App() {
  const auth = useContext(AuthContext);
  const token = auth.user.token;
  const history = useHistory();

  const routes = useRoutes(!!token);

  if (auth.user.token && auth.expiresIn() < new Date().getTime()) {
    auth.logOut(history, 'Your login has expired');
  }

  return (
    <Router>
      {routes}
    </Router>
  );
};

export default App;
