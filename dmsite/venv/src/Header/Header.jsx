import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import './style.css';
import LoginHeader from './LoginHeader';
import StandardHeader from './StandardHeader';


class Header extends React.Component {
  render() {
    const { location } = this.props;
    return (
      location.pathname === '/login'
        ? <LoginHeader />
        : <StandardHeader {...this.props} />
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(Header);
