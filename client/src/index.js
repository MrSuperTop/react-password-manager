import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthState from './context/auth/AuthState';
import CredentialsState from './context/credentials/CredentialsState';
import AlertState from './context/alert/AlertState';

ReactDOM.render(
  <React.StrictMode>
    {/* TODO: Положение этого прекрасного стейта */}
    <AlertState>
      <CredentialsState>
        <AuthState>
          <App />
        </AuthState>
      </CredentialsState>
    </AlertState>
  </React.StrictMode>,
  document.getElementById('root')
);
