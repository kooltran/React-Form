import React, { Component } from 'react';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
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

export default App;
