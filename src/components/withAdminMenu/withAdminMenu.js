import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Responsive, Sticky } from 'semantic-ui-react';
import AdminMenu from './AdminMenu';

const withAdminMenu = AdminMenuItems => (WrappedComponent) => {
  @inject('userStore')
  @observer
  class ComponentWithAdminMenu extends Component {
    state = {};

    handleContextRef = contextRef => this.setState({ contextRef });

    render() {
      if (!this.props.userStore.user || !this.props.userStore.user.isStaff) {
        return <WrappedComponent {...this.props} />;
      }

      return (
        <Fragment>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={13}>
                  <div ref={this.handleContextRef}>
                    <WrappedComponent {...this.props} />
                  </div>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Sticky context={this.state.contextRef} offset={112}>
                    <AdminMenu>
                      <AdminMenuItems />
                    </AdminMenu>
                  </Sticky>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>

          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <WrappedComponent {...this.props} />
            <AdminMenu>
              <AdminMenuItems />
            </AdminMenu>
          </Responsive>
        </Fragment>
      );
    }
  }
  return ComponentWithAdminMenu;
};

export default withAdminMenu;
