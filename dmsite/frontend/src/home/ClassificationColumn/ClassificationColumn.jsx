import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
    Input, Card, Button, CardBody, ListGroup, ListGroupItem, CardHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FileObject } from '../../Model/FileObject';

class ClassificationColumn extends Component {
  _handleClick(e) {
    e.preventDefault();
  }

  renderClassificationCell() {
    const { file } = this.props;

    return file.classifications.map((obj, index) => {
      return (
        <ListGroupItem key={ index } style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <p>{obj}</p>
        </ListGroupItem>
      );
    });
  };

  render() {
    return (
      <Card style={{ borderWidth: 0 }} id="classifications">
        <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Classifications</CardHeader>
        <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <ListGroup flush>
            {this.renderClassificationCell()}
          </ListGroup>
          <Input
            placeholder="Search Classification"
            className="mt-3"
            style={{ backgroundColor: '#303030', borderWidth: 0 }}
          />
          <Button
            onClick={this.handleClick}
            color="primary"
            className="mr-0 btn-block mt-2 mb-2"
          >
            Add Classifications
          </Button>
        </CardBody>
      </Card>
    );
  }
}

ClassificationColumn.propTypes = {
  file: PropTypes.instanceOf(FileObject),
};

export default ClassificationColumn;
