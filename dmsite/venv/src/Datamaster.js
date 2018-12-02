import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import  FilterColumn from './FilterColumn';
class DataMaster extends Component {

render() {
return (
       <Container>
          <h1>DataMaster</h1>
          <Row>
            <FilterColumn />
            <DisplayColumn />
          </Row>

       </Container>


    )
   }
}

export default DataMaster;