import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Account from './Account';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import AuthButton from './AuthButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <Router>
        <div>
          {/*<AuthButton />*/}
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">KOOL</a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active"><Link to="">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="register">Register</Link></li>
                <li><Link to="account">Account</Link></li>
              </ul>
            </div>
          </nav>
          <hr />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterForm} />
            <PrivateRoute path="/account" component={Account} />
          </Switch>
        </div>
      </Router>
    );
  };
}
