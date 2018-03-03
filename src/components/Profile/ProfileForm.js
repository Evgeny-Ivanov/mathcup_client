import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Form, Input } from 'semantic-ui-react';
import './ProfileForm.css';

@inject('userStore')
@observer
class ProfileForm extends Component {
  state = {
    firstName: '',
    lastName: '',
  };

  componentDidMount() {
    const { firstName, lastName } = this.props.userStore.user;
    this.setState({ firstName, lastName });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.userStore.updateUser(this.state);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className='profile-form'>
        <Form.Field>
          <label>Имя</label>
          <Input
            required
            name='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Фамилия</label>
          <Input
            required
            name='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Button type='submit'>
            Изменить
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default ProfileForm;
