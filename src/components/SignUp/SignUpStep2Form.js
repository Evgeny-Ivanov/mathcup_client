import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import InputErrorLabel from '../InputErrorLabel';

@inject('signUpStore')
@observer
class SignUpForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateData()) {
      this.props.signUpStore.signUp();
    }
  };

  validateData() {
    const { data } = this.props.signUpStore;
    if (data.password !== data.password2) {
      this.props.signUpStore.setErrorMessage(
        'password2',
        'Введенные пароли не совпадают',
      );
      return false;
    }

    return true;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.props.signUpStore.setDataField(name, value);
  };

  render() {
    const { data, errorMessages } = this.props.signUpStore;

    return (
      <Form
        id={this.props.formId}
        onSubmit={this.handleSubmit}
      >
        <Form.Field>
          <label>Имя</label>
          <Input
            name='firstName'
            value={data.firstName}
            error={errorMessages.firstName}
            onChange={this.handleChange}
          />
          <InputErrorLabel message={errorMessages.firstName} />
        </Form.Field>

        <Form.Field>
          <label>Фамилия</label>
          <Input
            name='lastName'
            value={data.lastName}
            required
            error={errorMessages.lastName}
            onChange={this.handleChange}
          />
          <InputErrorLabel message={errorMessages.lastName} />
        </Form.Field>

        <Form.Field>
          <label>Ваш пароль</label>
          <Input
            type='password'
            name='password'
            value={data.password}
            required
            error={errorMessages.password}
            onChange={this.handleChange}
          />
          <InputErrorLabel message={errorMessages.password} />
        </Form.Field>

        <Form.Field>
          <label>Повторите пароль</label>
          <Input
            type='password'
            name='password2'
            required
            value={data.password2}
            error={errorMessages.password2}
            onChange={this.handleChange}
          />
          <InputErrorLabel message={errorMessages.password2} />
        </Form.Field>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  formId: PropTypes.string.isRequired,
};

export default SignUpForm;
