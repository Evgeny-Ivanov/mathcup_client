import { action, observable } from 'mobx';
import agent from '../../agent';
import Editor from '../../components/Editor';

const createDefaultData = () => ({
  header: '',
  content: Editor.createEmptyEditorState(),
});

class CreateNewsStore {
  @observable data = createDefaultData();

  @observable isLoading = false;

  @observable isSuccess = false;

  prepareData() {
    return {
      ...this.data,
      content: Editor.convertToRaw(this.data.content),
    };
  }

  @action async createNews() {
    this.isLoading = true;
    const data = this.prepareData();
    try {
      await agent.News.create(data);
      this.isSuccess = true;
    } finally {
      this.isLoading = false;
    }
  }

  @action reset() {
    this.data = createDefaultData();
    this.isLoading = false;
    this.isSuccess = false;
  }
}

export default new CreateNewsStore();
