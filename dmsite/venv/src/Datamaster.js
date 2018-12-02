import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Column, Card, CardBody } from 'reactstrap';

class DataMaster extends Component {
render() {
return (
       <Container>
          <Row>
            <FilterColumn />
            <FilterColumn />
          </Row>
       </Container>
        <h1>Hey</h1>

    )
   }
}

export default DataMaster;