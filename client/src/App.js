import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';
import useRoutes from './routes'
import { AuthContext } from './context/auth/authContext';

function App() {
  const auth = useContext(AuthContext);
  const routes = useRoutes(!!auth.user.token);

  return (
    <Router>
      {routes}
    </Router>
  );
}

export default App;
