import { action, observable } from 'mobx';
import agent from '../agent';
import userStore from './userStore';

class SignInStore {
  @observable state = {
    isError: false,
    isLoading: false,
  };

  @observable data = {
    email: '',
    password: '',
  };

  @action setDataField(field, value) {
    this.data[field] = value;
    this.state.isError = false;
  }

  @action reset() {
    this.data.email = '';
    this.data.password = '';

    this.state.isError = false;
    this.state.isLoading = false;
  }

  @action async signIn() {
    this.state.isLoading = true;
    try {
      await agent.User.signIn(this.data);
      await userStore.fetchUser();
      this.reset();
    } catch (err) {
      this.state.isError = true;
    } finally {
      this.state.isLoading = false;
    }
  }
}

export default new SignInStore();
