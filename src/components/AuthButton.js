import React from 'react';
import FakeAuth from './FakeAuth';
import { withRouter } from 'react-router-dom';

const AuthButton = withRouter(({ history }) => {
  FakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        FakeAuth.signout(() => history.push('/'));
      }}>Sign Out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
})

export default AuthButton;
