import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

@inject('tournamentStore')
@withRouter
@observer
class AdminMenuItems extends Component {
  handlePush = (event, { to }) => this.props.history.push(to);

  render() {
    if (!this.props.tournamentStore.tournament) return null;
    const { id, isCompleted, isPublished } = this.props.tournamentStore.tournament;

    return (
      <Fragment>
        <Menu.Item
          disabled={isCompleted}
          to={`/tournaments/${id}/rounds/create/`}
          onClick={this.handlePush}
        >
          <Icon name='plus' />
          Добавить раунд
        </Menu.Item>

        <Menu.Item
          disabled={isPublished}
          onClick={() => this.props.tournamentStore.publishTournament(id)}
        >
          Опубликовать
        </Menu.Item>
      </Fragment>
    );
  }
}

export default AdminMenuItems;
