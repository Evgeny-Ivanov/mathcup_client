import { action, observable } from 'mobx';

class CommonStore {
  @observable appLoaded = false;

  @action setAppLoaded() {
    this.appLoaded = true;
  }

  @observable MobileAdminMenu;

  @action setMobileAdminMenu(MobileAdminMenu) {
    this.MobileAdminMenu = MobileAdminMenu;
  }
}

export default new CommonStore();
