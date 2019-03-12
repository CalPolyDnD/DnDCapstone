import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
    Input, Card, Button, CardBody, ListGroup, ListGroupItem, CardHeader
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FileObject } from '../../Model/FileObject';

class ClassificationColumn extends Component {
  _handleClick(e) {
    e.preventDefault();
  }

  isSensitive(val) {
    if (val == 1) { // == is required; === does not work properly for some reason
        return "Sensitive!";
     }
    return "";
  }

  renderClassificationCell() {
    const { file } = this.props;

    return file.classifications.map((obj, index) => {
      console.log(obj.is_sensitive);
      return (
        <ListGroupItem key={ index } style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
            <div>
              <p>{obj.name}</p>
              <p style={{ color: 'red',     right: "10%"}}>{this.isSensitive(obj.is_sensitive)}</p>
            </div>
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
            Edit Classifications
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
