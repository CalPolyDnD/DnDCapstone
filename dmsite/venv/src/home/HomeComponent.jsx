import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import DatasetsColumn from './DataColumn/DatasetsColumn';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationColumn from './ClassificationColumn/ClassificationColumn';

class Home extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row style={{ justifyContent: 'space-between' }}>
          <h1>Campaign: Current Campaign </h1>
          <DisplayColumn name="Display Actions" />
        </Row>
        <p> This campaign organizes Data1, Data2, Data3 </p>
        <Row>
          <Col md="3">
            <DatasetsColumn />
          </Col>
          <Col md="7">
            <ClassificationColumn name="Classifications" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Home);
