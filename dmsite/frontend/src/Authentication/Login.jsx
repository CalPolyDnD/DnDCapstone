/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, CardBody, CardHeader,
} from 'reactstrap';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import LoginTextField from './LoginTextField';


class Login extends Component {
  constructor(props) {
    super(props);
    this.loginPressed = this.loginPressed.bind(this);
  }

  loginPressed() {
    const { history } = this.props;
    const path = '/home';
    history.push(path);
  }

  render() {

    return (
      <div>
        <Container fluid>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
            <Card style={{ borderWidth: 0 }} align="center">
              <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Login</CardHeader>
              <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                <LoginTextField />
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>

    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};


export default withRouter(Login);
