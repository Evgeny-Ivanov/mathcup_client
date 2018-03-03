import { action, observable } from 'mobx';
import agent from '../agent';
import userStore from './userStore';

class SignUpStore {
  @observable step = 1;

  @observable errorMessages = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    confirmationKey: '',
  };

  @observable stateStep1 = {
    isLoading: false,
    isSuccess: false,
  };

  @observable stateStep2 = {
    isLoading: false,
  };

  @observable data = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    confirmationKey: '',
  };

  @action setDataField(field, value) {
    this.data[field] = value;
    this.errorMessages[field] = '';
  }

  @action setErrorMessage(field, message) {
    this.errorMessages[field] = message;
  }

  @action setStep(step) {
    this.step = step;
  }

  @action reset() {
    this.data.firstName = '';
    this.data.lastName = '';
    this.data.email = '';
    this.data.password = '';
    this.data.password2 = '';
    this.data.confirmationKey = '';

    this.stateStep1.isLoading = false;
    this.stateStep1.isSuccess = false;

    this.stateStep2.isLoading = false;
  }

  @action async sendEmailVerificationMessage() {
    this.stateStep1.isLoading = true;
    try {
      await agent.User.signUpStep1({ email: this.data.email });
      this.stateStep1.isSuccess = true;
    } catch (err) {
      this.setErrorMessagesFromServer(err.response.data);
    } finally {
      this.stateStep1.isLoading = false;
    }
  }

  @action async signUp() {
    this.stateStep2.isLoading = true;
    try {
      await agent.User.signUpStep2(this.data);
      await userStore.fetchUser();
      this.reset();
    } catch (err) {
      this.setErrorMessagesFromServer(err.response.data);
    } finally {
      this.stateStep2.isLoading = false;
    }
  }

  setErrorMessagesFromServer(errors) {
    for (const key in errors) {
      this.errorMessages[key] = errors[key][0];
    }
  }
}

export default new SignUpStore();
