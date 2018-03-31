import { action, observable } from 'mobx';
import newsListStore from './newsListStore';
import agent from '../../agent';

class NewsStore {
  @observable news;

  @observable isNotFound = false;

  @action async fetchNews(id) {
    for (const news of newsListStore.newsList) {
      if (news.id === id) {
        this.news = news;
        return;
      }
    }

    try {
      const res = await agent.News.fetch(id);
      this.news = res.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.isNotFound = true;
      }
    }
  }

  @action reset() {
    this.news = undefined;
    this.isNotFound = false;
  }
}

export default new NewsStore();
