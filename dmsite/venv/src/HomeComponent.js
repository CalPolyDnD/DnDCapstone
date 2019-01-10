import Logo from "./images/DnDLogo2.png";
import { Container, Row, Col, Input } from 'reactstrap';
import { withRouter} from "react-router-dom";
import FilterColumn from "./FilterColumn";
import DisplayData from "./DisplayData";
import Results from "./Results";
import React, { Component } from "react";

class Home extends Component{
    render(){
        return (
            <Container fluid>
                <div className="d-inline-flex">
                    <img id="logo" width="130" height="50" src={Logo}/>
                    <h1>DataMaster</h1>
                    <Input type="search" className="ml-4" placeholder="Search Dataset"/>
                </div>
                <Row>
                    <Col md="3">
                        <FilterColumn name={'Datasets'} />
                        <DisplayData />
                    </Col>
                    <Col md="5">
                        <Results name={"Classifications"} />
                    </Col>
                    <Col md="4">
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Home)