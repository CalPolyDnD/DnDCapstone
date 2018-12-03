import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import FilterButton from './FilterButton';

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

const Testdata = ["String1", "String2", "String3", "String4"];

const DynamicData =  this.parseData(Testdata);

return (
       <Col className="p-1">
            <Card>
                <CardTitle className="pl-4 pt-4">{this.props.type}</CardTitle>
                <CardBody>
                    <ListGroup flush>
                      {DynamicData}
                        <ListGroupItem>
                                        </ListGroupItem>
                      </ListGroup>
                      <FilterButton/>
                </CardBody>
            </Card>
       </Col>
    )
   }
}

export default FilterColumn;