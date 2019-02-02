/**
 * Created by christinadaley on 1/21/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, CardTitle, CardBody, CardHeader,
} from 'reactstrap';
import NewAccountTF from './NewAccountTextField';

class CreateAccount extends Component {

  render() {
    return (
      <div style={{ float: 'right', paddingRight: '35%' }}>
        <Container fluid>
          <Card align="center">
            <CardHeader tag="h3">Create Account</CardHeader>
            <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
            <CardBody>
              <NewAccountTF />
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}


export default withRouter(CreateAccount);
