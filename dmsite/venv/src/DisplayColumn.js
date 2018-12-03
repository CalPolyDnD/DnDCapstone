import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class DisplayColumn extends Component {

render() {


return (
       <Col>
            <Card>
                <CardBody>
                    <ListGroup flush>
                        <ListGroupItem>
                            This is where Data Displayed
                        </ListGroupItem>
                        <ListGroupItem>
                            This is where Second Data Displayed
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
       </Col>
    )
   }
}

export default DisplayColumn;