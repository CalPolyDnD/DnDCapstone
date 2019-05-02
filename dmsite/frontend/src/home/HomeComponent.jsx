import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
  ListGroupItem,
  Card,
  CardHeader,
  CardBody, Input,
} from 'reactstrap';
import './style.css';
import DatasetsColumn from './DataColumn/DatasetsColumn';
import Upload from './DataColumn/UploadComponent';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationColumn from './ClassificationColumn/ClassificationColumn';
import { FileObject } from '../Model/FileObject';

const FETCH_URL = 'http://localhost:8000/get_files';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: props.location.pathname.replace('/home/', ''),
      fileList: [],
      selectedFileIndex: 0,
      filesPresent: 1,
    };
    this._handleFileChange = this.handleFileChange.bind(this);
  }

  onClick() {
    window.location.reload();
  }

  handleFileChange = (index) => {
    this.setState({ selectedFileIndex: index });
  }

  getNameAccess() {
    return (
      <div style={{ paddingTop: '5%' }}>
        <Card style={{ borderWidth: 0 }}>
          <CardHeader tag="hs" style={{ backgroundColor: '#303030', color: 'white', borderWidth: 0 }}>Access Control</CardHeader>
          <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
            <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>
                Griffin Aswegan               ADMIN
              <Input style={{ right: '10%' }} type="checkbox" checked="checked" />
            </ListGroupItem>
            <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>
                Christina Daley
              <Input style={{ right: '10%' }} type="checkbox" />
            </ListGroupItem>
            <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>
                Larry Hu
              <Input style={{ right: '10%' }} type="checkbox" />
            </ListGroupItem>
            <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>
                Steven Bradley
              <Input style={{ right: '10%' }} type="checkbox" />
            </ListGroupItem>
          </CardBody>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    fetch(FETCH_URL, {
      method: 'POST',
      body: JSON.stringify({
        campaign: this.state.campaign,
      }),
    }).then(data => data.json()).then((response) => {
      const files = [];
      if (response.length === 0) {
        this.setState({ filesPresent: 0 });
        return;
      }

      for (let count = 0; count < response.length; count++) {
        files.push(new FileObject(response[count].filename,
          response[count].filename, response[count].classifications, response[count].is_classified));
      }
      this.setState({ fileList: files });
    });
  }

  render() {
    const {
      campaign, fileList, selectedFileIndex,
    } = this.state;

    if (this.state.filesPresent !== 1)
        return (
          <Container fluid>
            <h1 style={{ color: 'white' }}>Campaign: {campaign} </h1>
            <p style={{ color: '#afafaf' }}> This campaign has no files! Add some files to classify.  </p>
            <Upload campaignName={campaign} />
              <Button color="primary" size="md" className="btn-block mt-3"
                      onClick={this.onClick}>Save & Continue </Button>
          </Container>
        );

    if (this.state.fileList.length === 0) return null;

    let filenames = this.state.fileList[0].get_name();
    for (let count = 1; count < this.state.fileList.length && count < 5; count++) {
      filenames += `, ${this.state.fileList[count].get_name()}`;
      if (count === 4) filenames += '...';
    }
    //           <DisplayColumn name="Display Actions" /> - add in the first row after h1
    return (
      <Container fluid>
        <Row style={{ justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white' }}>
Campaign:
            {campaign}
            {' '}

          </h1>
          <DisplayColumn name="Display Actions" />
        </Row>
        <p style={{ color: '#afafaf' }}>
          This campaign organizes {filenames}
        </p>
        <Row>
          <Col md="3">
            <DatasetsColumn
              fileListData={fileList}
              selectedFileIndex={selectedFileIndex}
              cellOnClick={this._handleFileChange}
              campaign={campaign}
            />
            {/*{this.getNameAccess()}*/}
          </Col>
          <Col md="7">
            <ClassificationColumn name="Classifications" file={fileList[selectedFileIndex]} />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default withRouter(Home);
