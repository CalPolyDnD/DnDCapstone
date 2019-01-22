import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import DatasetsColumn from './DataColumn/DatasetsColumn';
import DisplayData from './DataColumn/DisplayData';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationsColumn from './ClassificationColumn/ClassificationsColumn';

class Profile extends Component {
  render(){
    return (
      <Container fluid>
        <h1>Campaign: Current Campaign</h1>
        <p> This campaign organizes Data1, Data2, Data3 </p>
        <Row>
          <Col md="3">
            <DatasetsColumn name={'Datasets'} />
            <DisplayData name={'File'}/>
          </Col>
          <Col md="5">
            <ClassificationsColumn name={"Classifications"} />
          </Col>
          <Col md="4">
            <DisplayColumn name={'Display Actions'} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Profile);
