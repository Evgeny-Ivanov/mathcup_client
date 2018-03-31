import { action, observable } from 'mobx';
import agent from '../../agent';

class RoundRatingStore {
  @observable isLoading = false;

  @observable permissionDenied = false;

  @observable userScore;

  @observable rating = [];

  @action async fetchUserScore(id) {
    try {
      const resUser = await agent.Rounds.fetchUserScore(id);
      this.userScore = resUser.data.score;
    } catch (err) {}
  }


  @action async fetchRating(id) {
    this.isLoading = true;
    try {
      const res = await agent.Rounds.fetchRating(id);
      this.rating = res.data;
      await this.fetchUserScore(id);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        this.permissionDenied = true;
      }
    } finally {
      this.isLoading = false;
    }
  }

  @action reset() {
    this.rating = [];
    this.permissionDenied = false;
  }
}

export default new RoundRatingStore();
