/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Button, Card, CardTitle, CardBody,
} from 'reactstrap';
import LoginTextField from './LoginTextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.uploadPressed = this.uploadPressed.bind(this);
  }

  uploadPressed() {
    const path = '/home';
    this.props.history.push(path);
  }

  render() {
    return (
      <div style={{ float: 'right', paddingRight: '35%' }}>
        <Container fluid>
          <Card align="center">
            <h1 align="center"> Login </h1>
            <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
            <CardBody>
              <LoginTextField />
              <Button color="primary" size="md" className="btn-block mt-0" onClick={this.uploadPressed}>
                            Login
                {/* TO DO */}
              </Button>
            </CardBody>
          </Card>
        </Container>
      </div>

    );
  }
}


export default withRouter(Login);
