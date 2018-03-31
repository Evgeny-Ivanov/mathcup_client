import { action, observable } from 'mobx';
import agent from '../../agent';

class RoundResultStore {
  @observable tasks;

  @observable answers;

  @observable isPermissionDenied = false;

  @action async fetchResult(id) {
    this.isLoading = false;
    try {
      const resTasks = await agent.Rounds.fetchTasks(id);
      const resAnswers = await agent.Rounds.fetchAnswers(id);

      this.tasks = resTasks.data;
      this.answers = resAnswers.data;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        this.isPermissionDenied = true;
      }
    } finally {
      this.isLoading = false;
    }
  }

  @action reset() {
    this.tasks = undefined;
    this.answers = undefined;
    this.isPermissionDenied = false;
  }
}

export default new RoundResultStore();
