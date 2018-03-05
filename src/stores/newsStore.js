import { action, observable } from 'mobx';
import agent from '../agent';

class NewsStore {
  pageSize = 5;

  @observable news;

  @observable newsList = [];

  @observable activePage;

  @observable totalPages;

  @observable createState = {
    isLoading: false,
  };

  @observable fetchState = {
    notFound: false,
  };

  @observable fetchListState = {
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
    this.fetchListState.isLoading = true;
    this.activePage = activePage;
    try {
      const res = await agent.News.fetchList(activePage);
      this.totalPages = Math.ceil(res.data.count / this.pageSize);
      this.newsList = res.data.results;
    } finally {
      this.fetchListState.isLoading = false;
    }
  }

  @action async fetchNews(id) {
    this.fetchState.isLoading = false;
    this.fetchState.notFound = false;
    try {
      for (const news of this.newsList) {
        if (news.id == id) {
          this.news = news;
          return;
        }
      }

      const res = await agent.News.fetch(id);
      this.news = res.data;
    } catch (err) {
      if (err.response.status === 404) {
        this.fetchState.notFound = true;
      }
    } finally {
      this.fetchState.isLoading = false;
    }
  }
}

export default new NewsStore();
