import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import Link from '../../Link';
import './DesktopNav.css';
import logo from './../logo.svg';

@inject('userStore')
@observer
class DesktopNav extends Component {
  handleLogout = () => this.props.userStore.forgetUser();

  render() {
    const { user, isAuth } = this.props.userStore;

    return (
      <Menu fixed='top' size='large' className='desktop-nav'>
        <Container>
          <Menu.Item>
            <img src={logo} className='app-logo' alt='logo' />
            <span className='nav-menu-item_margin'>MathCup</span>
          </Menu.Item>
          <Link wrapper={Menu.Item} to='/'>Об олимпиаде</Link>
          <Link wrapper={Menu.Item} to='/link'>Link</Link>

          <Dropdown text='Действия' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Header>Над турнирами</Dropdown.Header>
              <Dropdown.Item>Создать</Dropdown.Item>
              <Dropdown.Item>Удалить</Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Header>Над раундами</Dropdown.Header>
              <Dropdown.Item>Создать</Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Header>Над новостями</Dropdown.Header>
              <Link wrapper={Dropdown.Item} to='/news/create'>Создать</Link>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item position='right'>
            {isAuth
              ? (
                <Dropdown
                  trigger={(
                    <span>
                      <Image src={user.avatar} avatar spaced='right' />
                      {user.email}
                    </span>
                  )}
                  pointing
                >
                  <Dropdown.Menu className='desktop-nav__user-dropdown'>
                    <Link wrapper={Dropdown.Item} to='/profile'>
                      <Icon name='user' />Профиль
                    </Link>
                    <Dropdown.Item onClick={this.handleLogout}>
                      <Icon name='sign out' />Выход
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Fragment>
                  <span className='nav-menu-item_margin'>
                    <SignIn trigger={<Button type='button'>Вход</Button>} />
                  </span>
                  <span className='nav-menu-item_margin'>
                    <SignUp trigger={<Button primary>Регистрация</Button>} />
                  </span>
                </Fragment>
              )
            }
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

DesktopNav.propTypes = {
  location: PropTypes.object.isRequired,
};

export default DesktopNav;
