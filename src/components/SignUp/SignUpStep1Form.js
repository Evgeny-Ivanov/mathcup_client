import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Form, Input, Message } from 'semantic-ui-react';
import InputErrorLabel from '../InputErrorLabel';
import './SignUpStep1Form.css';

@inject('signUpStore')
@observer
class SignUpForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUpStore.sendEmailVerificationMessage();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.props.signUpStore.setDataField(name, value);
  };

  render() {
    const { data, errorMessages, stateStep1 } = this.props.signUpStore;

    return (
      <Form
        id={this.props.formId}
        onSubmit={this.handleSubmit}
        success={stateStep1.isSuccess}
      >
        <div className='sign-up-form__tip'>
          Пожалуйста введите свой email, на него будет отправлен код, который нужно ввести в соответствующее поле.
        </div>

        <Form.Field>
          <label>Email</label>
          <Input
            type='email'
            name='email'
            required
            error={errorMessages.email}
            value={data.email}
            onChange={this.handleChange}
          />
          <InputErrorLabel message={errorMessages.email} />
        </Form.Field>

        <Form.Field>
          <label>Код</label>
          <Input
            type='text'
            name='confirmationKey'
            error={errorMessages.confirmationKey}
            value={data.confirmationKey}
            onChange={this.handleChange}
          />
          <InputErrorLabel message={errorMessages.confirmationKey} />
        </Form.Field>

        <Message
          success
          content='Письмо успешно отправлено'
        />
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  formId: PropTypes.string.isRequired,
};

export default SignUpForm;
