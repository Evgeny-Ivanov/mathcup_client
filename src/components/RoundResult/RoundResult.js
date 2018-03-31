import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Header, Icon, Item, List } from 'semantic-ui-react';
import TaskResult from './TaskResult';
import Page404 from '../Page404';
import Loader from '../Loader';

@inject('roundResultStore')
@observer
class PassRoundResult extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.roundResultStore.fetchResult(id);
  }

  componentWillUnmount() {
    this.props.roundResultStore.reset();
  }

  render() {
    const {
      isPermissionDenied, tasks, answers, isLoading,
    } = this.props.roundResultStore;

    if (isPermissionDenied) {
      return <Page404 />;
    }

    if (isLoading || !tasks || !answers) {
      return <Loader />;
    }

    if (!answers.length) {
      return (
        <Header as='h3' icon textAlign='center'>
          <Icon name='frown' />
          Пусто
          <Header.Subheader>
            Похоже вы не участвовали в этом раунде
          </Header.Subheader>
        </Header>
      );
    }

    const tasksResults = tasks.map((task, index) => (
      <TaskResult key={task.id} task={task} index={index} answers={answers} />
    ));

    const countCorrect = answers.reduce((count, answer) =>
      count + (answer.correct ? 1 : 0), 0);

    return (
      <Fragment>
        <Header size='large'>Результаты теста</Header>

        <List>
          <List.Item>Всего задач: {tasks.length}</List.Item>
          <List.Item>Количество правильных ответов: {countCorrect}</List.Item>
          <List.Item>
            Количество не правильных ответов: {tasks.length - countCorrect}
          </List.Item>
        </List>

        <Header size='large'>Подробные результаты:</Header>

        <Item.Group divided>
          {tasksResults}
        </Item.Group>
      </Fragment>
    );
  }
}

export default PassRoundResult;
