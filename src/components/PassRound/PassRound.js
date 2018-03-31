import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Label, List } from 'semantic-ui-react';
import TasksNavigationItem from './TasksNavigationItem';
import RawDraftReader from '../RawDraftReader';
import Page404 from '../Page404';
import Loader from '../Loader';
import './PassRound.css';

@inject('passRoundStore')
@observer
class PassRound extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.passRoundStore.fetchRound(id);
    if (this.props.passRoundStore.isFetchSuccess) {
      this.props.passRoundStore.initTimer();
    }
  }

  componentWillUnmount() {
    this.props.passRoundStore.reset();
  }

  getTimeLeft = () => {
    const { timeLeft: tl } = this.props.passRoundStore;

    const days = tl.days();
    let time = `${tl.hours()}:${tl.minutes()}:${tl.seconds()}`;
    if (days > 0) {
      time = `${days}:${time}`;
    }

    return time;
  };

  formatTaskIndex = i => (i + 1 < 10 ? `0${i + 1}` : i + 1);

  handleMissTask = () => {
    this.props.passRoundStore.nextTask();
  };

  handleChange = (e, { value }) => {
    this.props.passRoundStore.setAnswer(value);
  };

  handleSendAnswer = async () => {
    await this.props.passRoundStore.sendAnswer();
    this.props.passRoundStore.nextTask();
  };

  render() {
    const {
      isLoading, isNotFound, isPermissionDenied, isEnded, isCompleted,
      round, tasks, currentTaskIndex, answers,
    } = this.props.passRoundStore;

    if (isCompleted) {
      return <Redirect to='/rounds/complete' push />;
    }

    if (isEnded) {
      return <Redirect to={`/rounds/${round.id}/result`} />;
    }

    if (isNotFound || isPermissionDenied) {
      return <Page404 />;
    }

    if (isLoading || !round || !tasks) {
      return <Loader />;
    }

    const tasksNavigationItems = tasks.map((item, index) =>
      <TasksNavigationItem key={item.id} index={index} />);

    return (
      <Grid stackable divided>
        <Grid.Row className='pass-round__time-left-row'>
          <Grid.Column width={16}>
            <div className='pass-round__time-left'>
              Осталось: <Label color='grey'>{this.getTimeLeft()}</Label>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <span className='pass-round__task-num'>
              Задача № {this.formatTaskIndex(currentTaskIndex)}.
            </span>
            <RawDraftReader content={tasks[currentTaskIndex].text} />

            <Form className='pass-round_margin'>
              <Form.Field>
                <label>Ответ</label>
                <Form.Input
                  value={answers[currentTaskIndex].answer}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>

            <div className='pass-round_margin'>
              <Button
                color='grey'
                onClick={this.handleSendAnswer}
                disabled={!answers[currentTaskIndex].answer}
              >
                Ответить
              </Button>
              <Button onClick={this.handleMissTask}>Пропустить</Button>
            </div>
          </Grid.Column>

          <Grid.Column width={3}>
            <div className='pass-round__tasks-navigation'>
              {tasksNavigationItems}
            </div>

            <Button
              className='pass-round_margin'
              onClick={this.props.passRoundStore.complete}
            >
              Закончить тест
            </Button>

            <List bulleted className='pass-round_margin'>
              <List.Item>Ответ можно поменять после нажатия кнопки ответить</List.Item>
              <List.Item>Между вопросами можно свободно перемещаться</List.Item>
              <List.Item>Вопросы можно пропускать и возвращаться к ним</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default PassRound;
