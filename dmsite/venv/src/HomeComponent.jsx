import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import DatasetsColumn from './DataColumn/DatasetsColumn';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationColumn from './ClassificationColumn/ClassificationsColumn';

class Home extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <h1>Campaign: Current Campaign </h1>
        </Row>
        <p> This campaign organizes Data1, Data2, Data3 </p>
        <Row>
          <Col md="3">
            <DatasetsColumn />
            <ClassificationColumn />
          </Col>
          <Col md="7">
            <ClassificationColumn name="Classifications" />
          </Col>
          <Col md="2">
            <DisplayColumn name="Display Actions" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Home);
