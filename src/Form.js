import React, { Component } from "react";
import t from 'tcomb-form';


function mycombinator(type, getError, name) {
  const Result = t.refinement(type, function(x) {
    return !t.String.is(getError(x));
  }, name);
  Result.getError = getError;
  return Result;
}

const Username = mycombinator(t.String, function(value) {
  const nameRegex = /^[a-zA-Z]/;
  return (
    (!value && 'This field is required!') ||
    (!nameRegex.test(value) && 'Username must be string')
  );
}, 'Username');

const Password = mycombinator(t.String, function(value) {
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
      attrs: {
        placeholder: 'please enter your username...',
        className: 'input-name',
      }
    },
    password: {
      error: Password.getError,
      type: 'password',
      attrs: {
        placeholder: 'please enter your password...',
        className: 'input-pass',
      }
    }
  }
}

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue();
    if (value) {
      console.log(value)
    }
  }

  render() {
    return (
      <form className="container">
        <t.form.Form ref="form" type={FormSchema} options={options} />
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Save</button>
        </div>
      </form>
    )
  }
}
