import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import  FilterColumn from './FilterColumn';
import DisplayData from './DisplayData';
import Results from './Results';
import Logo from './images/DnDLogo2.png';

class DataMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: ''
        }
    }

//    componentDidMount() {
//        this.getData();
//    }
//
//    getDAta() {
//        this.setSTate({ data: data });
//    }

//    _filterCampaign(query) {
//       fetch(`someendpoint/?query=${query}`)
//        .then((json) => {
//           this.setState({ data: json.data });
//        })
//        .catch((error) => {
//            this.setState({ error });
//        })
//    }


render() {
return (
       <Container fluid>
          <div className="d-inline-flex">
              <img id="logo" width="130" height="50" src={Logo}/>
            <h1>DataMaster</h1>
            <Input type="search" className="ml-4" placeholder="Search Dataset"/>
          </div>
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

export default DataMaster;