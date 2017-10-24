import React, { Component } from "react";
import { request, setLocalStorageItem } from './helpers';
import t from 'tcomb-form';
import { Redirect } from 'react-router-dom';

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
  const passRegex = /^[a-zA-Z]/;
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
      const postData = {
        body: JSON.stringify({
          username: value.name,
          password: value.password
        })
      }
      const url = 'https://express-auth-crud-api.herokuapp.com/login';

      // TODO const url
      request(url, 'post', postData)
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            const token = res.token;
            setLocalStorageItem('token', token);
            this.setState({
              redirectToReferrrer: true
            })
          } else {
            alert('Your username or password is invalid');
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/account' } };
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
