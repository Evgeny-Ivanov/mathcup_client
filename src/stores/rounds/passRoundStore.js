import { action, observable } from 'mobx';
import moment from 'moment';
import agent from '../../agent';

const getTimeLeft = endDate =>
  moment.duration(endDate.unix() - moment().unix(), 'seconds');

class PassRoundStore {
  @observable round;

  @observable answers = {};

  @observable isNotFound = false;

  @observable isPermissionDenied = false;

  @observable isFetchSuccess = false;

  @observable currentTaskIndex = 0;

  @observable timeLeft;

  @observable isEnded = false;

  @observable isLoading = false;

  @observable isCompleted = false;

  timerId = null;

  @action timerTick = () => {
    const end = moment(this.round.end);
    const now = moment();
    this.timeLeft = getTimeLeft(end);
    if (now.isAfter(end)) this.isEnded = true;
  };

  initTimer() {
    this.timerId = setInterval(this.timerTick, 1000);
  }

  @action setCurrentTaskIndex = (taskIndex) => {
    this.currentTaskIndex = taskIndex;
  };

  @action complete = () => { this.isCompleted = true; };

  @action setAnswer(answer) {
    this.answers[this.currentTaskIndex].answer = answer;
  }

  @action nextTask() {
    for (let i = this.currentTaskIndex + 1; i < this.answers.length; i++) {
      if (!this.answers[i].isSend) {
        this.currentTaskIndex = i;
        return;
      }
    }

    for (let i = 0; i < this.currentTaskIndex; i++) {
      if (!this.answers[i].isSend) {
        this.currentTaskIndex = i;
        return;
      }
    }

    if (this.currentTaskIndex === this.answers.length - 1) {
      this.currentTaskIndex = 0;
      return;
    }

    this.currentTaskIndex += 1;
  }

  @action async sendAnswer() {
    await agent.Answers.create({
      answer: this.answers[this.currentTaskIndex].answer,
      task: this.tasks[this.currentTaskIndex].id,
    });

    this.answers[this.currentTaskIndex].isSend = true;
  }

  @action async fetchAnswers(id) {
    this.answers = new Array(this.tasks.length);
    this.answers.fill({ answer: '', isSend: false });

    const resAnswers = await agent.Rounds.fetchAnswers(id);

    for (const userAnswer of resAnswers.data) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (userAnswer.task === this.tasks[i].id) {
          this.answers[i].answer = userAnswer.answer;
          this.answers[i].isSend = true;
        }
      }
    }
  }

  @action async fetchRound(id) {
    this.isLoading = true;
    try {
      const resRound = await agent.Rounds.fetch(id);
      const resTasks = await agent.Rounds.fetchTasks(id);

      this.round = resRound.data;
      this.tasks = resTasks.data;

      await this.fetchAnswers(id);

      this.timerTick();

      this.isFetchSuccess = true;
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

  @action reset() {
    this.isEnded = false;
    this.round = undefined;
    this.answers = {};
    this.isNotFound = false;
    this.isPermissionDenied = false;
    this.currentTaskIndex = 0;
    this.timeLeft = undefined;
    this.isCompleted = false;
    this.isFetchSuccess = false;

    clearTimeout(this.timerId);
  }
}

export default new PassRoundStore();
