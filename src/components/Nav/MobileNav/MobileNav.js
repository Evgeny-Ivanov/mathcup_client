import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Icon, Menu, Sidebar } from 'semantic-ui-react';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import Link from '../../Link';
import './MobileNav.css';
import logo from './../logo.svg';

@inject('userStore')
@observer
class MobileNav extends Component {
  state = {
    sidebarOpened: false,
  };

  handleLogout = () => this.props.userStore.logout();

  handleToggle = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  handleClose = () => {
    if (this.state.sidebarOpened) {
      this.setState({ sidebarOpened: false });
    }
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    const { isAuth } = this.props.userStore;

    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          vertical
          visible={sidebarOpened}
        >
          <Link wrapper={Menu.Item} to='/' onClick={this.handleClose}>
            Об олимпиаде
          </Link>
          <Link wrapper={Menu.Item} to='/link' onClick={this.handleClose}>
            Link
          </Link>

          {isAuth && (
            <Fragment>
              <Link wrapper={Menu.Item} to='/profile'>Профиль</Link>
            </Fragment>
          )}

          <Menu.Item>
            <Menu.Header>Действия</Menu.Header>
            <Menu.Menu>
              {isAuth ? (
                <Fragment>
                  <Menu.Item onClick={this.handleLogout}>Выход</Menu.Item>
                </Fragment>
              ) : (
                <Fragment>
                  <SignIn trigger={<Menu.Item>Вход</Menu.Item>} />
                  <SignUp trigger={<Menu.Item>Регистрация</Menu.Item>} />
                </Fragment>
              )}
            </Menu.Menu>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher
          className='sidebar-pusher_min-height'
          dimmed={sidebarOpened}
          onClick={this.handleClose}
        >
          <Menu size='large' fixed='top'>
            <Menu.Item onClick={this.handleToggle}>
              <Icon name='sidebar' />
            </Menu.Item>
            <Menu.Item className='app-logo-mobile'>
              <img src={logo} className='app-logo' alt='logo' />
              <span className='menu-item__margin'>MathCup</span>
            </Menu.Item>
          </Menu>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

MobileNav.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
};

export default MobileNav;
