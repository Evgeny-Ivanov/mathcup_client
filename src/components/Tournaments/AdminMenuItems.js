import React, { Component, Fragment } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

@withRouter
class AdminMenuItems extends Component {
  handlePush = (event, { to }) => this.props.history.push(to);

  render() {
    return (
      <Fragment>
        <Menu.Item
          to='/tournaments/create/'
          onClick={this.handlePush}
        >
          <Icon name='plus' />
          Добавить турнир
        </Menu.Item>
      </Fragment>
    );
  }
}

export default AdminMenuItems;
