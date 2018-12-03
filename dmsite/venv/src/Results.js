import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import { Container, Row, Col, Card, Button,CardTitle, CardBody, ListGroup, ListGroupItem, Table } from 'reactstrap';

const parseData = (data) => {
    const finalData = data.map((obj, index) => {
    console.log(obj);
        return (
            <ListGroupItem key={index}>
               <p>{obj.name}</p>
               <p>{obj.age}</p>
            </ListGroupItem>
        )
    });
    return finalData
}


class Results extends Component {

    _handleClick(e) {
       e.preventDefault();
       console.log("Classifications button pressed");
    }

render() {
    const { name } = this.props;
    const testData = [{name: "test1", age: 2}, {name: "test2", age: 4}, {name: "test3", age: 5}];
    const data = parseData(testData);

return (
            <Card>
                <CardTitle className="pl-4 pt-4 pb-0">{name}</CardTitle>
                <hr />
                <CardBody>
                   <ListGroup flush>
                       {data}
                   </ListGroup>

                </CardBody>
                <Button onClick={this._handleClick} color="primary">Edit Classifications</Button>
            </Card>
    )
   }
}

export default Results;