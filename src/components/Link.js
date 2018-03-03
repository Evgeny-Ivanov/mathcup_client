import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class Link extends Component {
  handelOnClick = (history) => {
    const { to, onClick } = this.props;
    history.push(to);
    if (onClick) onClick();
  };

  render() {
    const {
      to, wrapper: Wrapper, children, ...restProps
    } = this.props;

    const content = ({ match, history }) => (
      <Wrapper
        {...restProps}
        active={!!match}
        onClick={() => this.handelOnClick(history)}
      >
        {children}
      </Wrapper>
    );

    return (
      <Route path={to} exact>
        {content}
      </Route>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  wrapper: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element,
  ]),
};

export default Link;
