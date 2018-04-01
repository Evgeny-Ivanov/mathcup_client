import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Header, Item, Label } from 'semantic-ui-react';
import Loader from '../Loader';
import RoundRating from './RoundRating';
import AdminMenuItems from './AdminMenuItems';
import withAdminMenu from '../withAdminMenu';

@withAdminMenu(AdminMenuItems)
@withRouter
@inject('roundStore', 'userStore')
@observer
class Round extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.roundStore.fetchRound(id);
  }

  componentWillUnmount() {
    this.props.roundStore.reset();
  }

  handleJoinRound = () => {
    this.props.roundStore.joinRound();
  };

  handleUnjoinRound = () => {
    this.props.roundStore.unjoinRound();
  };

  handleRedirectResult = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/rounds/${id}/result`);
  };

  handleRedirectPass = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/rounds/${id}/pass`);
  };

  render() {
    const { isNotFound, isPermissionDenied, round } = this.props.roundStore;

    if (isNotFound || isPermissionDenied) {
      return <Redirect to='/404' />;
    }

    if (!round) {
      return <Loader />;
    }

    const {
      id, name, start, end, isJoin, isFinal, isPublished,
    } = round;

    const { isAuth } = this.props.userStore;

    const now = moment();
    const isEnded = now.isAfter(moment(end));
    const isStarted = now.isSameOrAfter(moment(start));
    const isRunning = isStarted && !isEnded;

    return (
      <Fragment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>Раунд: {name}</Item.Header>
              <Item.Meta>
                {do {
                  if (isRunning) <span>идет</span>;
                  else if (isEnded) <span>закончился {moment(end).fromNow()}</span>;
                  else <span>начнется {moment(start).fromNow()}</span>;
                }}
              </Item.Meta>
              <Item.Extra>
                {isAuth &&
                  <Fragment>
                    {isEnded && (
                      <Button
                        color='grey'
                        floated='right'
                        onClick={this.handleRedirectResult}
                      >
                      Свой результат
                      </Button>
                    )}

                    {!isStarted && !isFinal && do {
                      if (isJoin) {
                        <Button
                          color='grey'
                          floated='right'
                          onClick={this.handleUnjoinRound}
                        >
                          Отписаться
                        </Button>;
                      } else {
                        <Button
                          color='grey'
                          floated='right'
                          onClick={this.handleJoinRound}
                        >
                          Записаться
                        </Button>;
                      }
                    }}

                    {isRunning && (!isFinal || (isFinal && isJoin)) && (
                      <Button
                        color='grey'
                        floated='right'
                        onClick={() => this.handleRedirectPass(id)}
                      >
                        Участвовать
                      </Button>
                    )}
                  </Fragment>
                }

                {isFinal && <Label>Финальный</Label>}
                {!isPublished && <Label>Не опубликован</Label>}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

        <Header textAlign='center' as='h4'>Итоги раунда:</Header>
        <RoundRating roundId={id} />
      </Fragment>
    );
  }
}

export default Round;
