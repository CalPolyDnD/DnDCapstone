import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class FilterColumn extends Component {

parseData(data) {
    const parsedData = data.map(name => {

            return (
                <ListGroupItem>
                    {name}
                </ListGroupItem>

            )
        })
     return parsedData;
}
render() {

const Testdata = ["Campaign1", "Campaign2", "Campaign3", "Campaign4"];

const DynamicData =  this.parseData(Testdata);

return (
       <Col>
            <Card>
                <CardBody>
                    <ListGroup flush>
                              {DynamicData}
                                <ListGroupItem>
                                                </ListGroupItem>
                              </ListGroup>
                </CardBody>
            </Card>
       </Col>
    )
   }
}

export default FilterColumn;