import React, { Component } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Checkbox, Form } from 'semantic-ui-react';
import CreateTasksAccordion from './CreateTasksAccordion';
import DatePicker from '../DatePicker';

@inject('createRoundStore')
@observer
class CreateRound extends Component {
  componentDidMount() {
    this.props.createRoundStore.reset();
    const { id } = this.props.match.params;
    this.props.createRoundStore.data.tournament = id;
  }

  componentWillUnmount() {
    this.props.createRoundStore.reset();
  }

  handleCreateRound = (event) => {
    event.preventDefault();
    this.props.createRoundStore.createRound();
  };

  handleChange = (event, { name, value }) => {
    this.props.createRoundStore.data[name] = value;
  };

  handleChangeCheckbox = (event, { name, checked }) => {
    this.props.createRoundStore.data[name] = checked;
  };

  handleChangeStart = (start) => {
    this.props.createRoundStore.setStart(start);
  };

  handleChangeEnd = (end) => {
    this.props.createRoundStore.data.end = end;
  };

  render() {
    const { isLoading, isSuccess, data } = this.props.createRoundStore;

    if (isSuccess) {
      return <Redirect to={`/tournaments/${data.tournament}/`} />;
    }

    return (
      <Card fluid>
        <Card.Content>
          <Form onSubmit={this.handleCreateRound}>
            <Form.Field>
              <label>Название</label>
              <Form.Input
                required
                name='name'
                value={data.name}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Количество победителей</label>
              <Form.Input
                required
                type='number'
                step={5}
                name='winnersCount'
                value={data.winnersCount}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Начало</label>
              <DatePicker
                date={data.start}
                minDate={moment()}
                onChange={this.handleChangeStart}
              />
            </Form.Field>

            <Form.Field>
              <label>Завершение</label>
              <DatePicker
                date={data.end}
                minDate={data.start}
                onChange={this.handleChangeEnd}
              />
            </Form.Field>

            <Form.Field>
              <Checkbox
                name='isPublished'
                checked={data.isPublished}
                label='Сделать видимым для пользователей'
                onChange={this.handleChangeCheckbox}
              />
            </Form.Field>

            <Form.Field>
              <Checkbox
                name='isFinal'
                checked={data.isFinal}
                label='Финальный'
                onChange={this.handleChangeCheckbox}
              />
            </Form.Field>

            <CreateTasksAccordion />

            <Form.Field>
              <Button type='submit' loading={isLoading} floated='right'>
                  Создать
              </Button>
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default CreateRound;
