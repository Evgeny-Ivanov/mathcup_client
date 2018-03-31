import { action, observable } from 'mobx';
import toast from '../../toast';
import agent from '../../agent';

class RoundStore {
  @observable round;

  @observable isLoading;

  @observable isNotFound;

  @observable isPermissionDenied;

  @action async fetchRound(id) {
    this.isLoading = true;
    try {
      const res = await agent.Rounds.fetch(id);
      this.round = res.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.isNotFound = true;
      }
      if (err.response && err.response.status === 403) {
        this.isPermissionDenied = true;
      }
    } finally {
      this.isLoading = false;
    }
  }

  @action async joinRound() {
    try {
      await agent.Rounds.join(this.round.id);
      this.round.isJoin = true;
      toast.success('Мы оповестим вас о начале раунда');
    } catch (err) {
      toast.error('Что то не так');
    }
  }

  @action async unjoinRound() {
    try {
      await agent.Rounds.unjoin(this.round.id);
      this.round.isJoin = false;
    } catch (err) {
      toast.error('Что то не так');
    }
  }

  @action async publishRound() {
    try {
      await agent.Rounds.update(this.round.id, { isPublished: true });
      this.round.isPublished = true;
      toast.success('Раунд опубликован');
    } catch (err) {
      toast.error('Что то не так');
    }
  }

  @action reset() {
    this.round = undefined;
    this.isNotFound = undefined;
    this.isPermissionDenied = undefined;
  }
}

export default new RoundStore();
