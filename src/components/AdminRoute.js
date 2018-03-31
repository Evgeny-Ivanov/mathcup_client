import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
class AdminRoute extends Component {
  render() {
    const { userStore, ...restProps } = this.props;
    if (userStore.user && userStore.user.isStaff) return <Route {...restProps} />;
    return <Route {...restProps} component={() => <Redirect to='/' />} />;
  }
}

export default AdminRoute;
