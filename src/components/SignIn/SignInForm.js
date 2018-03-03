import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Form, Message } from 'semantic-ui-react';

@inject('signInStore')
@observer
class SignInForm extends Component {
  handleChange = (event) => {
    const { name, value } = event.target;
    this.props.signInStore.setDataField(name, value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signInStore.signIn();
  };

  render() {
    const { state, data } = this.props.signInStore;

    return (
      <Form
        id={this.props.formId}
        onSubmit={this.handleSubmit}
        error={state.isError}
      >
        <Form.Field>
          <label>Email</label>
          <input
            type='email'
            name='email'
            required
            value={data.email}
            onChange={this.handleChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Пароль</label>
          <input
            type='password'
            name='password'
            value={data.password}
            required
            onChange={this.handleChange}
          />
        </Form.Field>

        <Message
          error
          header='Ошибка'
          content='Не верный email или пароль'
        />
      </Form>
    );
  }
}

SignInForm.propTypes = {
  formId: PropTypes.string.isRequired,
};

export default SignInForm;
