import React from 'react';
import FakeAuth from './FakeAuth';
import {
  Route,
  Redirect,
} from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    // console.log(props.location);
    console.log(Component);
    return FakeAuth.isAuthenticated ?
    ( <Component {...props}/> ) :
    (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  }}/>
}

export default PrivateRoute;
