import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class CategorizeColumn extends Component {

render() {


return (
       <Col>
            <Card>
                <CardBody>
                    <ListGroup flush>
                        <ListGroupItem>
                            This is where Chart Goes
                        </ListGroupItem>
                        <ListGroupItem>
                            This is where Chart Analysis Goes
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
       </Col>
    )
   }
}

export default CategorizeColumn;