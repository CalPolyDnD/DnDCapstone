import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Input, Card, Button, CardTitle, CardBody, ListGroup, ListGroupItem,
} from 'reactstrap';

const parseData = (data) => {
  const finalData = data.map((obj, index) => {
    return (
      <ListGroupItem key={ index }>
        <p>{obj.name}</p>
        <p>{obj.age}</p>
      </ListGroupItem>
    );
  });
  return finalData;
};


class Results extends Component {
  _handleClick(e) {
    e.preventDefault();
  }

  render() {
    const { name } = this.props;
    const testData = [{ name: 'Classify1', age: 2 }, { name: 'Classify2', age: 4 }, { name: 'Classify3', age: 5 }];
    const data = parseData(testData);

    return (
      <Card>
        <CardTitle className="pl-4 pt-4 pb-0">{name}</CardTitle>
        <CardBody>
          <ListGroup flush>
            {data}
          </ListGroup>

        </CardBody>
        <Input placeholder="Search Classification" />
        <Button onClick={this.handleClick} color="primary">Add Classifications</Button>
      </Card>
    );
  }
}

export default Results;
