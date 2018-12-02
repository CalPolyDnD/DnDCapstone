import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class DisplayData extends Component {

render() {

const Testdata = ["String1", "String2", "String3", "String4"];

const DynamicData =  this.parseData(Testdata);

return (
       <Col>
            <Card>
                <CardBody>
                    <ListGroup flush>
                                {DynamicData}
                                <ListGroupItem>
                                    Test
                                                </ListGroupItem>
                              </ListGroup>
                </CardBody>
            </Card>
       </Col>
    )
   }
}

export default DisplayData;