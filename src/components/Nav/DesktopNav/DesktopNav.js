import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import Link from '../Link';
import './DesktopNav.css';
import logo from './../logo.svg';

@inject('userStore')
@withRouter
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
          <Link wrapper={Menu.Item} to='/news'>Новости</Link>
          <Link wrapper={Menu.Item} to='/tournaments'>Турниры</Link>

          { user && user.isStaff &&
            <Dropdown text='Действия' pointing item>
              <Dropdown.Menu>
                <Link wrapper={Dropdown.Item} to='/tournaments/create'>
                  <Icon name='plus' />
                  Создать турнир
                </Link>
                <Link wrapper={Dropdown.Item} to='/news/create'>
                  <Icon name='plus' />
                  Создать новость
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          }

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
                      <Icon name='user' />
                      Профиль
                    </Link>
                    <Dropdown.Item onClick={this.handleLogout}>
                      <Icon name='sign out' />
                      Выход
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Fragment>
                  <span className='nav-menu-item_margin'>
                    <SignIn trigger={<Button type='button'>Вход</Button>} />
                  </span>
                  <span className='nav-menu-item_margin'>
                    <SignUp trigger={<Button color='grey'>Регистрация</Button>} />
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

export default DesktopNav;
