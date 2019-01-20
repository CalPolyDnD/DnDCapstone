import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import FilterColumn from './DataColumn/FilterColumn';
import DisplayData from './DataColumn/DisplayData';
import DisplayColumn from './VisualColumn/DisplayColumn';
import Results from './ClassificationColumn/Results';

const Home = (props) => {
  <Container fluid>
        <h1>Campaign: Current Campaign</h1>
        <p> This campaign organizes Data1, Data2, Data3 </p>
        <Row>
            <Col md="3">
                <FilterColumn name={'Datasets'} />
                <DisplayData name={'File'}/>
            </Col>
            <Col md="5">
                <Results name={"Classifications"} />
            </Col>
            <Col md="4">
                <DisplayColumn name={'Display Actions'} />
            </Col>
        </Row>
    </Container>
}

export default withRouter(Home);
