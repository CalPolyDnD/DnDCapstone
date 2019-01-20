import React from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Input,
} from 'reactstrap';

class FilterColumn extends React.Component {
  parseData = data => (data.map(name => (
    <ListGroupItem>
      {name}
    </ListGroupItem>
  )));

  render() {
    const Testdata = ['File1.jsv', 'File2.jsv', 'File3.jsv', 'File4.jsv'];

    const DynamicData = this.parseData(Testdata);

    return (
      <Card>
        <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
        <CardBody>
          <ListGroup className="filter-list" flush>
            <ListGroupItem>
              {DynamicData}
            </ListGroupItem>
          </ListGroup>
          <Input placeholder="Search Result" className="mt-1" />
          <ButtonGroup className="d-flex justify-content-center pt-2">
            <Button
              color="primary" size="md" className="mr-1 btn-block mt-0"
              onClick={this.props.addButtonHandler}
            >
              Add File
            </Button>
            <Button
              color="primary" size="md" className="btn-block mt-0"
            >
              Classify Me
            </Button>
          </ButtonGroup>
          {/* <FilterButton name={this.props.name} /> */}
        </CardBody>
      </Card>
    );
  }
}

export default FilterColumn;
