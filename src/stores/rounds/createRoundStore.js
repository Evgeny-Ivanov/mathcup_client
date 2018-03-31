import { action, observable } from 'mobx';
import moment from 'moment';
import agent from '../../agent';
import Editor from '../../components/Editor';

const createEmptyTask = () => ({
  text: Editor.createEmptyEditorState(),
  answer: '',
  weight: 1,
});

const createDefaultData = () => ({
  isPublished: false,
  tournament: null,
  name: '',
  winnersCount: 10,
  start: moment(),
  end: moment().add(2, 'hours'),
  isFinal: false,
  tasks: [createEmptyTask()],
});

class CreateRoundStore {
  @observable data = createDefaultData();

  @observable isLoading = false;

  @observable isSuccess = false;

  @observable activeTaskIndex = 0;

  @action setActiveTaskIndex = (index) => {
    this.activeTaskIndex = this.activeTaskIndex === index ? -1 : index;
  };

  @action addTask = () => {
    this.data.tasks.push(createEmptyTask());
  };

  @action deleteTask = (index) => {
    if (this.data.tasks.length < 2) return;
    this.data.tasks.splice(index, 1);
  };

  @action setStart = (start) => {
    this.data.start = start;
    if (this.data.end.isSameOrBefore(start)) {
      this.data.end = start.clone().add(2, 'hours');
    }
  };

  prepareData() {
    const tasks = this.data.tasks.map(({ text, ...rest }) => ({
      text: Editor.convertToRaw(text),
      ...rest,
    }));

    return {
      ...this.data,
      tasks,
    };
  }

  @action createRound = async () => {
    this.isLoading = true;
    const data = this.prepareData();
    try {
      await agent.Rounds.create(data);
      this.isSuccess = true;
    } finally {
      this.isLoading = false;
    }
  };

  @action reset = () => {
    this.data = createDefaultData();
    this.isSuccess = false;
    this.activeTaskIndex = 0;
  };
}

export default new CreateRoundStore();
