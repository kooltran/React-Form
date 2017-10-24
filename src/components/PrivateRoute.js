import React from 'react';
import { getLocalStorageItem } from './helpers';
import {
  Route,
  Redirect,
} from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
  const isToken = getLocalStorageItem('token');
  return <Route {...rest} render={props => {
    return isToken ?
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
