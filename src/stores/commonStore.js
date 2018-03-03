import { action, observable } from 'mobx';

class CommonStore {
  @observable appLoaded = false;

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
