import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

import PrivateRoute from '../PrivateRoute';
import AdminRoute from '../AdminRoute';
import AppLoader from './AppLoader';
import ResponsiveContainer from '../ResponsiveContainer';
import Footer from '../Footer';
import Page404 from '../Page404';

import AboutUs from '../AboutUs';
import Profile from '../Profile';
import CreateNews from '../CreateNews';
import NewsList from '../NewsList';
import News from '../News';
import CreateRound from '../CreateRound';
import PassRound from '../PassRound';
import CompletePage from '../PassRound/CompletePage';
import RoundResult from '../RoundResult';
import Tournament from '../Tournament';
import Tournaments from '../Tournaments';
import Round from '../Round';
import CreateTournament from '../CreateTournament';

import './App.css';

@inject('userStore', 'commonStore')
@withRouter
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
      <ResponsiveContainer>
        <Container className='app__content_padding app__content_flex'>
          <Switch>
            <Route exact path='/' component={AboutUs} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <AdminRoute exact path='/news/create' component={CreateNews} />
            <Route exact path='/news' component={NewsList} />
            <Route exact path='/news/:id' component={News} />
            <PrivateRoute exact path='/rounds/complete' component={CompletePage} />
            <Route exact path='/rounds/:id' component={Round} />
            <PrivateRoute exact path='/rounds/:id/pass' component={PassRound} />
            <PrivateRoute exact path='/rounds/:id/result' component={RoundResult} />
            <Route exact path='/tournaments' component={Tournaments} />
            <AdminRoute exact path='/tournaments/create' component={CreateTournament} />
            <Route exact path='/tournaments/:id/' component={Tournament} />
            <AdminRoute exact path='/tournaments/:id/rounds/create' component={CreateRound} />
            <Route component={Page404} />
          </Switch>
        </Container>
        <Footer />
      </ResponsiveContainer>
    );
  }
}

export default App;
