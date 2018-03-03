import { action, computed, observable } from 'mobx';
import agent from '../agent';

class UserStore {
  @observable user;

  @computed get isAuth() {
    return !!this.user;
  }

  @action async fetchUser() {
    try {
      const res = await agent.User.fetch();
      this.user = res.data;
    } catch (err) {
    }
  }

  @action async updateUserAvatar(avatar) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    const res = await agent.User.update(formData);
    this.user = res.data;
  }

  @action async updateUser(data) {
    const res = await agent.User.update(data);
    this.user = res.data;
  }

  @action async forgetUser() {
    await agent.User.logout();
    this.user = null;
  }
}

export default new UserStore();
