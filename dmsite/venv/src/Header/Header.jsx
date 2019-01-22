import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import './style.css';
import { Layout } from 'antd';
import LoginHeader from './LoginHeader';
import StandardHeader from './StandardHeader';


class Header extends React.Component {
  render() {
    const { location } = this.props;
    const AntHeader = Layout.Header;
    return (
      <AntHeader className="pl-0 pr-0" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        {
          location.pathname === '/login/'
            ? <LoginHeader {...this.props} />
            : <StandardHeader {...this.props} />
        }
      </AntHeader>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(Header);
