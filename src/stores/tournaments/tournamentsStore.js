import { action, observable } from 'mobx';
import agent from '../../agent';

class TournamentsStore {
  pageSize = 5;

  @observable tournaments = [];

  @observable activePage;

  @observable count;

  @observable totalPages;

  @observable isLoading = false;

  @action async fetchTournaments(activePage) {
    this.isLoading = true;
    this.activePage = activePage;
    try {
      const res = await agent.Tournaments.fetchList(activePage);
      this.count = res.data.count;
      this.totalPages = Math.ceil(this.count / this.pageSize);
      this.tournaments = res.data.results;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new TournamentsStore();
