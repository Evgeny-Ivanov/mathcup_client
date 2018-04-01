import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';
import { Header, Icon, Item } from 'semantic-ui-react';
import Loader from '../Loader';
import Round from './Round';
import AdminMenuItems from './AdminMenuItems';
import withAdminMenu from '../withAdminMenu';

@withAdminMenu(AdminMenuItems)
@inject('tournamentStore')
@withRouter
@observer
class Tournament extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.tournamentStore.fetchTournament(id);
  }

  componentWillUnmount() {
    this.props.tournamentStore.reset();
  }

  render() {
    const {
      isNotFound, isPermissionDenied, tournament, rounds,
    } = this.props.tournamentStore;

    if (isNotFound || isPermissionDenied) {
      return <Redirect to='/404' />;
    }

    if (!tournament || !rounds) {
      return <Loader />;
    }

    if (!rounds.length) {
      return (
        <Header as='h3' icon textAlign='center'>
          <Icon name='frown' />
          Пусто
          <Header.Subheader>
            Раундов еще нет.
          </Header.Subheader>
        </Header>
      );
    }

    return (
      <Fragment>
        <Header textAlign='center'>Турнир: {tournament.name}</Header>
        <Item.Group divided>
          {rounds.map(props => <Round key={props.id} {...props} />)}
        </Item.Group>
      </Fragment>
    );
  }
}

export default Tournament;
