import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Responsive } from 'semantic-ui-react';
import DesktopNav from './Nav/DesktopNav';
import MobileNav from './Nav/MobileNav';

const ResponsiveContainer = ({ children }) => (
  <Fragment>
    <Responsive
      minWidth={Responsive.onlyTablet.minWidth}
      className='app-flex-wrapper'
    >
      <DesktopNav />
      {children}
    </Responsive>

    <Responsive
      maxWidth={Responsive.onlyMobile.maxWidth}
      className='app-flex-wrapper'
    >
      <MobileNav>
        {children}
      </MobileNav>
    </Responsive>
  </Fragment>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResponsiveContainer;
