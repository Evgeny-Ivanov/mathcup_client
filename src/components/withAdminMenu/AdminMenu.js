import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Menu, Responsive } from 'semantic-ui-react';

@inject('commonStore')
@observer
class AdminMenu extends Component {
  componentDidMount() {
    this.setMobileAdminMenu();
  }

  componentWillUnmount() {
    this.props.commonStore.setMobileAdminMenu(null);
  }

  setMobileAdminMenu = () => {
    const MobileAdminMenu = (
      <Menu.Item>
        <Menu.Header>Админские действия</Menu.Header>
        <Menu.Menu>
          {this.props.children}
        </Menu.Menu>
      </Menu.Item>
    );
    this.props.commonStore.setMobileAdminMenu(MobileAdminMenu);
  };

  render() {
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Menu vertical fluid>
          <Menu.Item header>Действия:</Menu.Item>
          {this.props.children}
        </Menu>
      </Responsive>
    );
  }
}

export default AdminMenu;
