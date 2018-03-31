import { action, observable } from 'mobx';
import agent from '../../agent';

class CreateTournamentStore {
  @observable data = {
    name: '',
    isPublished: false,
  };

  @observable isLoading = false;

  @observable isSuccess = false;

  @observable createdTournament;

  @action createTournament = async () => {
    this.isLoading = true;
    try {
      const res = await agent.Tournaments.create(this.data);
      this.createdTournament = res.data;
      this.isSuccess = true;
    } finally {
      this.isLoading = false;
    }
  };

  @action reset = () => {
    this.data.name = '';
    this.data.isPublished = false;
    this.isSuccess = false;
  };
}

export default new CreateTournamentStore();
