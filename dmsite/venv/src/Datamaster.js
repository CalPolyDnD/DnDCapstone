import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import  FilterColumn from './FilterColumn';
import DisplayData from './DisplayData';
class DataMaster extends Component {
//    constructor() {
//        super(props);
//        this.state = {
//            data: null
//        }
//    }
//
//componentDidMount() {
//    this.getData();
//}
//
//getDAta() {
//    this.setSTate({ data: data });
//}


render() {
return (
       <Container fluid>
          <h1>DataMaster</h1>
          <Row>
            <FilterColumn type={'Campaigns'} />
            <FilterColumn type={'Datasets'} />
            <DisplayData />
          </Row>

       </Container>


    )
   }
}

export default DataMaster;