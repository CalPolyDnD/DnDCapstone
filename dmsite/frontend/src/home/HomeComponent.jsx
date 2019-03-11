import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Input,
} from 'reactstrap';
import './style.css';
import axios from 'axios';
import DatasetsColumn from './DataColumn/DatasetsColumn';
import DisplayColumn from './VisualColumn/DisplayColumn';
import ClassificationColumn from './ClassificationColumn/ClassificationColumn';
import { FileObject } from '../Model/FileObject';

// const testClassification1 = [{ name: 'Classify1', age: 2 }, { name: 'Classify2', age: 4 }, { name: 'Classify3', age: 5 }];
// const testClassification2 = [{ name: 'Classify1', age: 3 }, { name: 'Classify2', age: 6 }, { name: 'Classify3', age: 53 }];
// const testClassification3 = [{ name: 'Classify2', age: 4 }, { name: 'Classify2', age: 42 }, { name: 'Classify3', age: 5 }];
//
// const dummyfiles = [
//   new FileObject('file1', 'file1.csv', testClassification1, 'header1'),
//   new FileObject('file2', 'file2.csv', testClassification2, 'header3'),
//   new FileObject('file3', 'file2.csv', testClassification3, 'header3'),
// ];

const dummyAccessList = ['Christina Daley', 'Larry Hu', 'Dustyn Zierman-Felix'];

const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';
const FETCH_FILES_URL = 'http://localhost:8000/get_campaigns';

class Home extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      selectedFileIndex: 0,
      campaign: match.params.campaign,
      files: this.getCampaignFiles(),
      data: [],
      firstName: '',
      lastName: '',
    };
    this._handleFileChange = this.handleFileChange.bind(this);
  }

  getCampaignFiles() {
    // const jsonObj = [];
    const fileObj = [];
    const { data } = this.state;
    const { history } = this.props;
    for (let count = 0; count < data.length; count += 1) {
      // update file_name + others
      fileObj.push(new FileObject(data[count].file_name, data[count].file_name, data[count].classifictations, data[count].header));
      // jsonObj.push(data[count].file_name);
    }
    return fileObj;
  }

  handleFileChange = (index) => {
    this.setState({ selectedFileIndex: index });
  }

  componentDidMount() {
    axios.get(FETCH_CURRENT_USER_URL)
      .then((userRes) => {
        this.setState({ firstName: userRes.data.firstName, lastName: userRes.data.lastName });
        axios.post(FETCH_FILES_URL, {
          user: userRes.data.email,
          campaign: this.state.campaign,
        })
          .then((campRes) => {
            this.setState({ data: campRes.data });
          });
      });
  }

  getNameAccess() {
    const jsonObj = [];
    const { firstName, lastName } = this.state;
    const admin = firstName + lastName + '\t\tADMIN';
    jsonObj.push(
      <ListGroupItem
        style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}
      >
        {admin}
      </ListGroupItem>,
    );
    for (let count = 0; count < dummyAccessList.length; count += 1) {
      const result = dummyAccessList[count];
      jsonObj.push(
        <ListGroupItem
          style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}
        >
          {result}
        </ListGroupItem>,
      );
    }
    return jsonObj;
  }

  render() {
    const { files, selectedFileIndex } = this.state;

    return (
      <Container fluid>
        <Row style={{ justifyContent: 'space-between', paddingBottom: '1%' }}>
          <h1 style={{ color: 'white' }}>Campaign: Current Campaign </h1>
          <DisplayColumn name="Display Actions" />
          <Input
            placeholder="campaign details"
            placeholderStyle={{ placeHolderColor: '#afafaf' }}
            style={{
              backgroundColor: '#4c4c4c', color: '#afafaf', borderWidth: 0, height: '30%',
            }}
          />
        </Row>
        <Row>
          <Col md="5">
            <DatasetsColumn
              fileListData={files}
              selectedFileIndex={selectedFileIndex}
              cellOnClick={this._handleFileChange}
            />
            <div style={{ paddingTop: '5%' }}>
              <Card style={{ borderWidth: 0, justified: 'center' }}>
                <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white' }}>Access Control</CardHeader>
                <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                  <ListGroup style={{ color: 'white', borderWidth: 0, borderColor: '#3d3d3d' }}>
                    {this.getNameAccess()}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md="7">
            <ClassificationColumn name="Classifications" file={files[selectedFileIndex]} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Home);
