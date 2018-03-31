import { action, observable } from 'mobx';
import toast from '../../toast';
import agent from '../../agent';

class TournamentStore {
  @observable tournament;

  @observable rounds;

  @observable isNotFound;

  @observable isPermissionDenied;

  @action async fetchTournament(id) {
    try {
      const resTournament = await agent.Tournaments.fetch(id);
      const resRounds = await agent.Tournaments.fetchRounds(id);

      this.tournament = resTournament.data;
      this.rounds = resRounds.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.isNotFound = true;
      }
      if (err.response && err.response.status === 403) {
        this.isPermissionDenied = true;
      }
    }
  }

  @action async joinRound(id) {
    try {
      await agent.Rounds.join(id);
      this.rounds.forEach((round) => {
        if (round.id === id) round.isJoin = true;
      });
      toast.success('Мы оповестим вас о начале раунда');
    } catch (err) {
      toast.error('Что то не так');
    }
  }

  @action async unjoinRound(id) {
    try {
      await agent.Rounds.unjoin(id);
      this.rounds.forEach((round) => {
        if (round.id === id) round.isJoin = false;
      });
    } catch (err) {
      toast.error('Что то не так');
    }
  }

  @action async publishTournament() {
    try {
      await agent.Tournaments.update(this.tournament.id, { isPublished: true });
      this.tournament.isPublished = true;
      toast.success('Турнир опубликован');
    } catch (err) {
      toast.error('Что то не так');
    }
  }

  @action reset() {
    this.tournament = undefined;
    this.rounds = undefined;
    this.isNotFound = false;
    this.isPermissionDenied = false;
  }
}

export default new TournamentStore();
