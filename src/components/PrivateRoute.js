import React from 'react';
import FakeAuth from './FakeAuth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log({ component: Component, ...rest });
  console.log(FakeAuth.isAuthenticated);
  return <Route {...rest} render={props => (
    FakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
}

export default PrivateRoute;
