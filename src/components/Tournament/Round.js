import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Item, Label } from 'semantic-ui-react';

@withRouter
@inject('tournamentStore', 'userStore')
@observer
class Round extends Component {
  handleJoinRound = () => {
    this.props.tournamentStore.joinRound(this.props.id);
  };

  handleUnjoinRound = () => {
    this.props.tournamentStore.unjoinRound(this.props.id);
  };

  handleRedirectPass = () => {
    this.props.history.push(`/rounds/${this.props.id}/pass`);
  };

  handleRedirectRound = () => {
    this.props.history.push(`/rounds/${this.props.id}`);
  };

  render() {
    const {
      name, start, end, isJoin, isFinal, isPublished,
    } = this.props;
    const { isAuth } = this.props.userStore;

    const now = moment();
    const isEnded = now.isAfter(moment(end));
    const isStarted = now.isSameOrAfter(moment(start));
    const isRunning = isStarted && !isEnded;

    return (
      <Item>
        <Item.Content>
          <Item.Header as='a' onClick={this.handleRedirectRound}>{name}</Item.Header>
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
                    onClick={this.handleRedirectPass}
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
    );
  }
}

export default Round;
