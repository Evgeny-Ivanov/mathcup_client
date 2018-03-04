import { action, observable } from 'mobx';
import agent from '../agent';

class NewsStore {
  pageSize = 5;

  @observable newsList = [];

  @observable activePage;

  @observable totalPages;

  @observable createState = {
    isLoading: false,
  };

  @observable fetchState = {
    isLoading: false,
  };

  @action async createNews(data) {
    this.createState.isLoading = true;
    try {
      await agent.News.create(data);
    } finally {
      this.createState.isLoading = false;
    }
  }

  @action async fetchNewsList(activePage) {
    this.fetchState.isLoading = true;
    this.activePage = activePage;
    try {
      const res = await agent.News.fetchList(activePage);
      this.totalPages = Math.ceil(res.data.count / this.pageSize);
      this.newsList = res.data.results;
    } finally {
      this.fetchState.isLoading = false;
    }
  }
}

export default new NewsStore();
