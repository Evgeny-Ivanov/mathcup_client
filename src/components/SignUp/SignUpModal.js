import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import SignUpStep1Form from './SignUpStep1Form';
import SignUpStep2Form from './SignUpStep2Form';

@inject('signUpStore')
@observer
class SignUpModal extends Component {
  handleSetStep = (step) => {
    this.props.signUpStore.setStep(step);
  };

  render() {
    const step1formId = 'step1signUpFormId';
    const step2formId = 'step2signUpFormId';
    const { step, stateStep1, stateStep2 } = this.props.signUpStore;

    return (
      <Modal size='tiny' trigger={this.props.trigger}>
        <Modal.Header>Регистрация</Modal.Header>
        <Modal.Content>
          {
            step === 1
              ? <SignUpStep1Form formId={step1formId} />
              : <SignUpStep2Form formId={step2formId} />
          }
        </Modal.Content>
        <Modal.Actions>
          {
            step === 1 ? (
              <Fragment>
                <Button
                  icon
                  labelPosition='right'
                  onClick={() => this.handleSetStep(2)}
                >
                  Вперед
                  <Icon name='right arrow' />
                </Button>
                <Button
                  color='grey'
                  form={step1formId}
                  loading={stateStep1.isLoading}
                >
                  Получить письмо
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  icon
                  labelPosition='left'
                  onClick={() => this.handleSetStep(1)}
                >
                  Назад
                  <Icon name='left arrow' />
                </Button>
                <Button
                  color='grey'
                  form={step2formId}
                  loading={stateStep2.isLoading}
                >
                  Зарегистрироваться
                </Button>
              </Fragment>
            )
          }
        </Modal.Actions>
      </Modal>
    );
  }
}

SignUpModal.propTypes = {
  trigger: PropTypes.element.isRequired,
};

export default SignUpModal;
