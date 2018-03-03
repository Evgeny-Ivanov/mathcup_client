import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import PrivateRoute from '../PrivateRoute';
import AppLoader from './AppLoader';
import ResponsiveContainer from '../ResponsiveContainer';
import Footer from '../Footer';
import AboutUs from '../AboutUs';
import Profile from '../Profile';
import CreateNews from '../CreateNews';
import Page404 from '../Page404';
import './App.css';

@inject('userStore', 'commonStore')
@withRouter // плохо
@observer
class App extends Component {
  async componentDidMount() {
    await this.props.userStore.fetchUser();
    this.props.commonStore.setAppLoaded();
  }

  render() {
    if (!this.props.commonStore.appLoaded) {
      return <AppLoader />;
    }

    return (
      <ResponsiveContainer location={this.props.location}>
        <Container className='app__content_padding app__content_flex'>
          <Switch>
            <Route exact path='/' component={AboutUs} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route exact path='/news/create' component={CreateNews} />
            <Route component={Page404} />
          </Switch>
        </Container>
        <Footer />
      </ResponsiveContainer>
    );
  }
}

export default App;
