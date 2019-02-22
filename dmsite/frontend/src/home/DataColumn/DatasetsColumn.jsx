import React from 'react';
import FileDataObject from '../../DataObjects/FileDataObject'
import 'filepond/dist/filepond.min.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Input,
} from 'reactstrap';

import Upload from './UploadComponent';


//this is dummy data for files
const data =[ new FileDataObject("File1","FileDescription1","FileHeader1"),
  new FileDataObject("File2","FileDescription2","FileHeader2"),
  new FileDataObject("File3","FileDescription3","FileHeader3")];


class DatasetsColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };

  }



  parseData = data => (data.map(file => (
    <ListGroupItem action style={{ backgroundColor: '#3d3d3d', color: 'white' }}
                   onclick={(file) => {var selected_file = file;}}>
      {file.getFileName()}
    </ListGroupItem>
  )));

  uploadClickHandler = () => {
    this.setState({ uploading: true });
  };

  cancelUploadClicked = () => {
    this.setState({ uploading: false });
  };

  render() {
    const DynamicData = this.parseData(data);
    const { uploading } = this.state;
    return (
      <Card style={{ borderWidth: 0 }}>
        <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Datasets</CardHeader>
        <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <ListGroup className="filter-list" flush>
            {DynamicData}
          </ListGroup>
          <Input
            placeholder="Search Result"
            className="mt-1"
            style={{ backgroundColor: '#303030', borderWidth: 0 }}
          />
          <Button
            color="primary"
            size="md"
            className="mr-0 btn-block mt-2 mb-2"
            onClick={this.uploadClickHandler}
          >
            Add File
          </Button>
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
