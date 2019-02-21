import React from 'react';
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

class DatasetsColumn extends React.Component {


  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      uploading: false,
      popOverOpen: false,
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  parseData = data => (data.map(name => (
    <ListGroupItem
      action
      style={{ backgroundColor: '#3d3d3d', color: 'white' }}
    >
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
