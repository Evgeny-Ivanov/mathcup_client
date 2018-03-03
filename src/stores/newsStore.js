import { action, observable } from 'mobx';

class NewsStore {
  @observable news = [];

  @observable page = 0;

  @action createNews() {
    console.log('create news');
  }

  @action fetchNews() {
    console.log('fetch news');
  }
}

export default new NewsStore();
