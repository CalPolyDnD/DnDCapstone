import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
    Input, Card, Button, CardBody, ListGroup, ListGroupItem, CardHeader,
} from 'reactstrap';

const parseData = (data) => {
  const finalData = data.map((obj, index) => {
    return (
      <ListGroupItem key={ index } style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
        <p>{obj.name}</p>
        <p>{obj.age}</p>
      </ListGroupItem>
    );
  });
  return finalData;
};


class ClassificationColumn extends Component {
  _handleClick(e) {
    e.preventDefault();
  }

  render() {
    const { name } = this.props;
    const testData = [{ name: 'Classify1', age: 2 }, { name: 'Classify2', age: 4 }, { name: 'Classify3', age: 5 }];
    const data = parseData(testData);

    return (
      <Card style={{ borderWidth: 0 }} id="classifications">
        <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Classifications</CardHeader>
        <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <ListGroup flush>
            {data}
          </ListGroup>
          <Input placeholder="Search Classification" className="mt-3" style={{ backgroundColor: '#303030', borderWidth: 0 }} />
          <Button onClick={this.handleClick} color="primary" className="mr-0 btn-block mt-2 mb-2">Add Classifications</Button>
        </CardBody>
      </Card>
    );
  }
}

export default ClassificationColumn;
