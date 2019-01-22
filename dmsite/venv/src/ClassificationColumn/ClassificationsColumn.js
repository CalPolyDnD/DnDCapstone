import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Input,
  Card,
  Button,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardHeader,
} from 'reactstrap';

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


class ClassificationsColumn extends Component {

  _handleClick(e) {
    e.preventDefault();
    console.log("Classifications button pressed");
  }

  render() {
    const testData = [{name: "Classify1", age: 2}, {name: "Classify2", age: 4}, {name: "Classify3", age: 5}];
    const data = parseData(testData);

    return (
      <Card>
        <CardHeader tag="h3">Classifications</CardHeader>
        <CardBody>
          <ListGroup flush>
            {data}
          </ListGroup>
        </CardBody>
        <Input placeholder="Search Classification" />
        <Button onClick={this._handleClick} color="primary">Add Classifications</Button>
      </Card>
    );
  }
}

export default ClassificationsColumn;
