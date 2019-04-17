/**
 * Created by christinadaley on 1/21/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, CardBody, CardHeader, Label
} from 'reactstrap';
import NewAccountTF from './NewAccountTextField';

class CreateAccount extends Component {

  render() {
    return (
      <div>
        <Container fluid>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3%' }}>
            <Card align="center" style={{ borderWidth: 0, width: '30rem' }}>
              <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Create Account</CardHeader>
              <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                <Label>
                  * Required
                </Label>
                <NewAccountTF />
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}


export default withRouter(CreateAccount);
