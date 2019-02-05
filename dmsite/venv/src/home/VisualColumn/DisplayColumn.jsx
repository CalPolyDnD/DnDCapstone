import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Card, CardBody, CardTitle, ListGroupItem, Button, CardHeader,
} from 'reactstrap';
import VisualTableModal from './VisualTableModal';
import VisualGraphModal from './VisualGraphModal';

class DisplayColumn extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center pt-2">
        <VisualTableModal />
        <VisualGraphModal />
        <div>
        <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>Download Campaign </Button>
        </div>
      </div>
    );
  }
}

export default DisplayColumn;
