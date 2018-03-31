import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

@inject('roundStore')
@withRouter
@observer
class AdminMenuItems extends Component {
  handlePush = (event, { to }) => this.props.history.push(to);

  render() {
    if (!this.props.roundStore.round) return null;
    const { id, isPublished } = this.props.roundStore.round;

    return (
      <Fragment>
        <Menu.Item
          disabled={isPublished}
          onClick={() => this.props.roundStore.publishRound(id)}
        >
          Опубликовать
        </Menu.Item>
      </Fragment>
    );
  }
}

export default AdminMenuItems;
