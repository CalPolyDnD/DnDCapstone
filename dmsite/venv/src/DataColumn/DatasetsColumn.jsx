import React from 'react';
import 'filepond/dist/filepond.min.css';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Input,
} from 'reactstrap';

import Upload from './UploadComponent';

class DatasetsColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  }

  parseData = data => (data.map(name => (
    <ListGroupItem action>
      {name}
    </ListGroupItem>
  )));

  uploadClickHandler = () => {
    this.setState({ uploading: true });
  };

  cancelUploadClicked = () => {
    this.setState({ uploading: false });
  };

  render() {
    const Testdata = ['File1.jsv', 'File2.jsv', 'File3.jsv', 'File4.jsv'];
    const DynamicData = this.parseData(Testdata);
    const { uploading } = this.state;
    return (
      <Card>
        <CardHeader tag="h3">Datasets</CardHeader>
        <CardBody>
          <ListGroup className="filter-list" flush>
            {DynamicData}
          </ListGroup>
          <Input placeholder="Search Result" className="mt-1" />
          <ButtonGroup className="d-flex justify-content-center pt-2 pb-2">
            <Button
              color="primary"
              size="md"
              className="mr-1 btn-block mt-0"
              onClick={this.uploadClickHandler}
            >
              Add File
            </Button>
            <Button
              color="primary"
              size="md"
              className="btn-block mt-0"
            >
              Classify Me
            </Button>
          </ButtonGroup>
          {uploading && <Upload /> }
          {
            uploading
            && <Button close onClick={this.cancelUploadClicked} />
          }
        </CardBody>
      </Card>
    );
  }
}

export default DatasetsColumn;
