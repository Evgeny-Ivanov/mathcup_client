import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Header, Icon, Loader, Message, Table } from 'semantic-ui-react';
import UserResult from './UserResult';
import './RoundRating.css';

@inject('roundRatingStore', 'userStore')
@observer
class RoundRating extends Component {
  componentDidMount() {
    const { roundId } = this.props;
    this.props.roundRatingStore.fetchRating(roundId);
  }

  componentWillUnmount() {
    this.props.roundRatingStore.reset();
  }

  render() {
    const {
      permissionDenied, rating, userScore, isLoading,
    } = this.props.roundRatingStore;

    const { user } = this.props.userStore;

    if (isLoading) {
      return <Loader inline='centered' active className='round-rating__loader' />;
    }

    if (permissionDenied) {
      return (
        <Message content='Здесь будут опубликованы результаты рауда, после его завершения.' />
      );
    }

    if (!rating.length) {
      return (
        <Header as='h3' icon textAlign='center'>
          <Icon name='frown' />
          Пусто
          <Header.Subheader>
            Похоже в этом раунде никто не решил ни одну из задач.
          </Header.Subheader>
        </Header>
      );
    }

    const isUserInTop = user && rating.some(userResult =>
      userResult.user.id === user.id);

    return (
      <Table basic='very' celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Место</Table.HeaderCell>
            <Table.HeaderCell>Участник</Table.HeaderCell>
            <Table.HeaderCell>Рейтинг</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rating.map(props => <UserResult key={props.user.id} {...props} />)}
        </Table.Body>

        { !isUserInTop && userScore !== null &&
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3' textAlign='center'>
                ...........
              </Table.HeaderCell>
            </Table.Row>

            <UserResult score={userScore} user={user} place='' />
          </Table.Footer>
        }
      </Table>
    );
  }
}

RoundRating.propTypes = {
  roundId: PropTypes.number.isRequired,
};

export default RoundRating;
