import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Checkbox, Form } from 'semantic-ui-react';

@inject('createTournamentStore')
@observer
class CreateTournament extends Component {
  componentWillUnmount() {
    this.props.createTournamentStore.reset();
  }

  handleCreateTournament = (event) => {
    event.preventDefault();
    this.props.createTournamentStore.createTournament();
  };

  handleChange = (event, { name, value }) => {
    this.props.createTournamentStore.data[name] = value;
  };

  handleChangeCheckbox = (event, { name, checked }) => {
    this.props.createTournamentStore.data[name] = checked;
  };

  render() {
    const { data, isSuccess, isLoading } = this.props.createTournamentStore;

    if (isSuccess) {
      return <Redirect to='/tournaments' />;
    }

    return (
      <Card fluid>
        <Card.Content>
          <Form onSubmit={this.handleCreateTournament}>
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
              <Checkbox
                name='isPublished'
                checked={data.isPublished}
                label='Сделать видимым для пользователей'
                onChange={this.handleChangeCheckbox}
              />
            </Form.Field>
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

export default CreateTournament;
