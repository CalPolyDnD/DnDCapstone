import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Card, CardBody, CardTitle, ListGroupItem, Button, CardHeader,
} from 'reactstrap';
import VisualTableModal from './VisualTableModal';
import VisualGraphModal from './VisualGraphModal';

class DisplayColumn extends Component {
  parseData(data) {
    const parsedData = data.map(name => (
      <ListGroupItem>
        {name}
      </ListGroupItem>

    ));
    return parsedData;
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader tag="h4">Display Actions</CardHeader>
          <CardBody>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-center pt-2">
                  <VisualTableModal />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-center pt-2">
                  <VisualGraphModal />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-center pt-2">
                  <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={this.uploadPressed}>Download Campaign </Button>
                </div>
              </CardBody>
            </Card>

          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DisplayColumn;
