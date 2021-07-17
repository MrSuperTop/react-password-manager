import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import InputsState from '../context/inputs/InputsState';

import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import Navbar from '../components/Navbar/Navbar';
import Alert from '../components/Alert/Alert';
import AboutPage from '../pages/AboutPage/AboutPage';
import CreatePage from '../pages/CreatePage/CreatePage';
import EditPage from '../pages/EditPage/EditPage';
import UserPage from '../pages/UserPage/UserPage';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <Alert />

        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/create">
            <InputsState>
              <CreatePage />
            </InputsState>
          </Route>
          <Route path="/edit/:id">
            <InputsState>
              <EditPage />
            </InputsState>
          </Route>
          <Route path="/me">
            <InputsState>
              <UserPage />
            </InputsState>
          </Route>
  
          <Route path="/about" component={AboutPage} />
          {/* <Redirect to="/home"/> */}
        </Switch>
      </>
    );
  }

  return (
    <>
      <Alert />

      <Switch>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    </>
  );
};

export default useRoutes;
