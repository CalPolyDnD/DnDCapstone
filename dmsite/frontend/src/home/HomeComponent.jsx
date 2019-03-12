import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import './style.css';
import DatasetsColumn from './DataColumn/DatasetsColumn';
import Upload from './DataColumn/UploadComponent';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationColumn from './ClassificationColumn/ClassificationColumn';
import { FileObject } from '../Model/FileObject';

const FETCH_URL = 'http://localhost:8000/get_files'

/*
const testClassification1 = [{ name: 'Classify1', age: 2 }, { name: 'Classify2', age: 4 }, { name: 'Classify3', age: 5 }];
const testClassification2 = [{ name: 'Classify1', age: 3 }, { name: 'Classify2', age: 6 }, { name: 'Classify3', age: 53 }];

const dummyfiles = [
  new FileObject('file1', 'MOCK_DATA.csv', testClassification1, 'header1'),
  new FileObject('file2', 'MOCK_PEOPLE.csv', testClassification2, 'header3'),
];
*/

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: "test_campaign",
      fileList: [],
      selectedFileIndex: 0,
      filesPresent: 1,
    };
    this._handleFileChange = this.handleFileChange.bind(this);
    this.campaignName = props.location.pathname.replace("/home/", "");
  }

  handleFileChange = (index) => {
    this.setState({ selectedFileIndex: index })
  }

  componentDidMount() {
    fetch(FETCH_URL, {
        method: 'POST',
        body: JSON.stringify({
            campaign: this.state.campaign
        })
    }).then(data => {
        return data.json();
    }).then(response => {
        let files = [];
        if (response.length === 0) {
            this.setState({filesPresent: 0});
            return;
        }

        for (let count = 0; count < response.length; count++) {
            files.push(new FileObject(response[count].filename,
                       response[count].filename, response[count].classifications, 'header'));
        }
        this.setState({ fileList: files });
    });
  }

  render() {
    const { campaign, fileList, classifications, selectedFileIndex } = this.state;

    if (this.state.filesPresent !== 1)
        return (
          <Container fluid>
                <h1 style={{ color: 'white' }}>Campaign: {campaign} </h1>
            <p style={{ color: '#afafaf' }}> This campaign has no files! Add some files to classify.  </p>
            <Upload />
          </Container>
        );

    if (this.state.fileList.length === 0)
        return null;

    let filenames = this.state.fileList[0].get_name();
    for (let count = 1; count < this.state.fileList.length && count < 5; count++) {
        filenames += ", " + this.state.fileList[count].get_name();
        if (count === 4)
            filenames += "...";
    }

    return (
      <Container fluid>
        <Row style={{ justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white' }}>Campaign: {campaign} </h1>
          <DisplayColumn name="Display Actions" />
        </Row>
        <p style={{ color: '#afafaf' }}> This campaign organizes {filenames}  </p>
        <Row>
          <Col md="3">
            <DatasetsColumn
              fileListData={fileList}
              selectedFileIndex={selectedFileIndex}
              cellOnClick={this._handleFileChange}
              campaign={this.campaignName}
            />
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
