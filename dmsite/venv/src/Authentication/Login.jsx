/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, CardTitle, CardBody,
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
    const { name } = this.props;

    return (
      <div style={{ float: 'right', paddingRight: '35%' }}>
        <Container fluid>
          <Card align="center">
            <h1 align="center"> Login </h1>
            <CardTitle className="pl-4 pt-4">{ name }</CardTitle>
            <CardBody>
              <LoginTextField />
            </CardBody>
          </Card>
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
