import { action, observable } from 'mobx';
import agent from '../../agent';

class NewsListStore {
  pageSize = 5;

  @observable count;

  @observable newsList = [];

  @observable activePage;

  @observable totalPages;

  @observable isLoading;

  @action async fetchNewsList(activePage) {
    this.isLoading = true;
    this.activePage = activePage;
    try {
      const res = await agent.News.fetchList(activePage);
      this.count = res.data.count;
      this.totalPages = Math.ceil(this.count / this.pageSize);
      this.newsList = res.data.results;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new NewsListStore();
