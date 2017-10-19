import React, { Component } from "react";
import FakeAuth from './FakeAuth';
import t from 'tcomb-form';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const Form = t.form.Form;

const mycombinator= (type, getError, name) => {
  const Result = t.refinement(type, (x) => {
    return !t.String.is(getError(x));
  }, name);
  Result.getError = getError;
  return Result;
}

const Username = mycombinator(t.String, (value) => {
  const nameRegex = /^[a-zA-Z]/;
  return (
    (!value && 'This field is required!') ||
    (!nameRegex.test(value) && 'Username must be string')
  );
}, 'Username');

const Password = mycombinator(t.String, (value) => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
  return (
    (!value && 'This field is required!') ||
    (!passRegex.test(value) && 'Password is invalid')
  );
}, 'Password');

const FormSchema = t.struct({
  name: Username,
  password: Password,
});

const options = {
  fields: {
    name: {
      error: Username.getError,
      label: 'Your Username:',
      attrs: {
        placeholder: 'please enter your username...',
        className: 'input-name',
      }
    },
    password: {
      error: Password.getError,
      label: 'Your Password:',
      type: 'password',
      attrs: {
        placeholder: 'please enter your password...',
        className: 'input-pass',
      }
    }
  },
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrrer: false
    }
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, path) {
    this.refs.form.getComponent(path).validate();
  }

  save(e) {
    e.preventDefault();
    const value = this.refs.form.getValue();
    if (value) {
      FakeAuth.authenticate(() => {
        this.setState({ redirectToReferrrer: true })
      })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrrer } = this.state;

    if (redirectToReferrrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <form className="container">
        <Form
          ref="form"
          type={FormSchema}
          options={options}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={this.save}>Login</button>
        </div>
      </form>
    )
  }
}
