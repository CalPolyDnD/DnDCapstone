/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Button, Card, CardTitle, CardBody, InputGroup, InputGroupText, InputGroupAddon, Input
} from 'reactstrap';


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
      <Container fluid>
        <Card id="card" style={{ width: '60%', justifyContent: 'center', align: 'center' }}>
          <h1 align="center"> Login </h1>
          <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
          <CardBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@Username</InputGroupText>
              </InputGroupAddon>
              <Input />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@Password</InputGroupText>
              </InputGroupAddon>
              <Input />
            </InputGroup>
            <br />
            <Button color="primary" size="md" className="btn-block mt-0" onClick={this.uploadPressed}>
Login
            </Button>
            <br />
            <h4> Forgot Password </h4>
            <br />
            <h4> Need Help </h4>
          </CardBody>
        </Card>
      </Container>

    );
  }
}

export default withRouter(Login);
