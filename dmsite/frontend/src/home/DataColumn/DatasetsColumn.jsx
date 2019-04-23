import React from 'react';
import { withRouter } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import Upload from './UploadComponent';

class DatasetsColumn extends React.Component {
  static defaultProps = {
    fileListData: [],
    selectedFileIndex: 0,
    cellOnClick: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  }

  renderFileCells = () => {
    const { fileListData, selectedFileIndex, cellOnClick } = this.props;

    return fileListData.map((file, index) => {
      const style = index === selectedFileIndex
        ? { backgroundColor: '#636363', color: 'white' }
        : { backgroundColor: '#3d3d3d', color: 'white' };

      return (
        <ListGroupItem tag="button" action style={style} onClick={() => { cellOnClick(index); }}>
          {file.path}
        </ListGroupItem>
      );
    });
  }
  // this is a comment

  uploadClickHandler = () => {
    this.setState({ uploading: true });
  };

  cancelUploadClicked = () => {
    this.setState({ uploading: false });
  };

  classifyFilesClicked = () => {
    const { fileListData } = this.props;
    let availableFile = 0;
    let route = '/classification/';
    route += `${this.props.campaign}?=`;

    for (let i = 0; i < fileListData.length; i++) {
      if (fileListData[i].header !== 1) {
        route += fileListData[i].path;
        if (i !== fileListData.length - 1) {
          route += ',';
        }
      }
      availableFile = 1;
    }
    if (availableFile === 1)
        this.props.history.push(route);
    else
        return
  };

  render() {
    const { uploading } = this.state;
    return (
      <Card style={{ borderWidth: 0 }}>
        <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Datasets</CardHeader>
        <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
          <ListGroup className="filter-list" flush>
            {this.renderFileCells()}
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
          {uploading && <Upload campaignName={this.props.campaign} /> }
          {
            uploading
            && <Button close onClick={this.cancelUploadClicked} />
          }
          <Button
            color="primary"
            size="md"
            className="mr-0 btn-block mt-2 mb-2"
            onClick={this.classifyFilesClicked}
          >
            Classify
          </Button>
        </CardBody>
      </Card>
    );
  }
}

DatasetsColumn.propTypes = {
  fileListData: PropTypes.array,
  selectedFileIndex: PropTypes.number,
  cellOnClick: PropTypes.func,
};

export default withRouter(DatasetsColumn);
