import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Modal } from 'semantic-ui-react';
import SignInForm from './SignInForm';

@inject('signInStore')
@observer
class SignInModal extends Component {
  render() {
    const { isLoading } = this.props.signInStore.state;
    const formId = 'signInFormId';
    return (
      <Modal size='tiny' trigger={this.props.trigger}>
        <Modal.Header>Вход</Modal.Header>
        <Modal.Content>
          <SignInForm formId={formId} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' form={formId} loading={isLoading}>
            Войти
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

SignInModal.propTypes = {
  trigger: PropTypes.element.isRequired,
};

export default SignInModal;
