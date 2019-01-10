import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import FilterColumn from './FilterColumn';
import DisplayData from './DisplayData';
import Results from './Results';

class Home extends Component{
    render(){
        return (
            <Container fluid>
                <Row>
                    <Col md="3">
                        <FilterColumn name={'Campaigns'} />
                        <FilterColumn name={'Datasets'} />
                    </Col>
                    <Col md="5">
                        <DisplayData />
                    </Col>
                    <Col md="4">
                        <Results name={"Classifications"} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Home);
