import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import './style.css';
import DatasetsColumn from './DataColumn/DatasetsColumn';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationColumn from './ClassificationColumn/ClassificationColumn';
import { FileObject } from '../Model/FileObject';

const testClassification1 = [{ name: 'Classify1', age: 2 }, { name: 'Classify2', age: 4 }, { name: 'Classify3', age: 5 }];
const testClassification2 = [{ name: 'Classify1', age: 3 }, { name: 'Classify2', age: 6 }, { name: 'Classify3', age: 53 }];
const testClassification3 = [{ name: 'Classify2', age: 4 }, { name: 'Classify2', age: 42 }, { name: 'Classify3', age: 5 }];

const dummyfiles = [
  new FileObject('file1', 'file1.csv', testClassification1, 'header1'),
  new FileObject('file2', 'file2.csv', testClassification2, 'header3'),
  new FileObject('file3', 'file2.csv', testClassification3, 'header3'),
];




class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      fileList: this.getCampaignFiles(),
      selectedFileIndex: 0,
    };
    this._handleFileChange = this.handleFileChange.bind(this);
  }

  getCampaignFiles() {
    //TODO: GET request to database for file list
    return dummyfiles;
  }

  handleFileChange = (index) => {
    this.setState({ selectedFileIndex: index })
  }

  render() {
    const { fileList, selectedFileIndex } = this.state;

    return (
      <Container fluid>
        <Row style={{ justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white' }}>Campaign: Current Campaign </h1>
          <DisplayColumn name="Display Actions" />
        </Row>
        <p style={{ color: '#afafaf' }}> This campaign organizes Data1, Data2, Data3 </p>
        <Row>
          <Col md="3">
            <DatasetsColumn fileListData={fileList} selectedFileIndex={selectedFileIndex} cellOnClick={this._handleFileChange} />
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
