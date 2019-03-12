import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Row,
  Col,
  Input,
  Table,
  ListGroup,
  ListGroupItem, CardHeader, CardBody, Card,
} from 'reactstrap';
import ClassificationTable from './ClassificationTable';
import { FileObject } from '../Model/FileObject';
import './ClassificationInfo.css';

class FileTab extends Component {
  static defaultProps = {
    file: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedClassificationIndex: 0,
      description: "",
      file: props.file,
    };

  }

  displayUnknown() {
    // TODO actually have it display multiple unknowns
    return (
      <tbody>
        <tr>
          <td> Label 1 </td>
        </tr>
        <tr>
          <td> Label 2 </td>
        </tr>
        <tr>
          <td> Label 3 </td>
        </tr>
      </tbody>
    );
  }

  handleChange = (event) => {
    const FETCH_URL = "localhost8000/update_file_description";
    const file = this.state.file;
    file.description = event.target.value;
    this.setState({file: file});
  }

  setSelectedClassification = (index) => {
    this.setState({ selectedClassificationIndex: index });
  }

  render() {
    const { selectedClassificationIndex, file } = this.state;
    if (file === null) {
      return (<div />);
    }
    return (
      <div>
        <Row className="classification-top-row" style={{ justifyContent: 'space-between' }}>
          <Col>
              <Card style={{ borderWidth: 0}}>
                <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white', textAlign: 'center' }}>Description</CardHeader>
                <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                  <Input
                      type="textarea"
                      value={file.description}
                      name="text"
                      id="exampleText"
                      style={{ backgroundColor:'#3d3d3d', color: 'white', borderWidth: 0}}
                      onChange={this.handleChange}
                  />
                </CardBody>
              </Card>
            <div style={{ paddingTop: '5%'}}>
              <Card style={{ borderWidth: 0, justified: 'center'}}>
              <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white', textAlign: 'center' }} >Access Control</CardHeader>
                <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                  <ListGroup style={{ color: "white", borderWidth: 0, borderColor: '#3d3d3d'}}>
                    <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>Your Username
                      <Input style={{ right: '10%'}} type="checkbox" checked="checked"/>
                    </ListGroupItem>
                    <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>Christina Daley
                      <Input style={{ right: '10%'}} type="checkbox" />
                    </ListGroupItem>
                    <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>Larry Hu
                      <Input style={{ right: '10%'}} type="checkbox" />
                    </ListGroupItem>
                    <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>Griffin Aswegan
                      <Input style={{ right: '10%'}} type="checkbox" />
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col xs="4">
            <ClassificationTable
                file={file}
                selectedClassificationIndex={selectedClassificationIndex}
                cellOnClick={this.setSelectedClassification}
            />
          </Col>
          <Col>
            <Card style={{ borderWidth: 0 }}>
              <CardHeader
                  tag="h3"
                  style={{ backgroundColor: '#303030', color: 'white', textAlign: 'center' }}
              >Unknown Labels</CardHeader>
              <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                <Table style={{ borderWidth: 0 }}>
                  {this.displayUnknown()}
                </Table>
              </CardBody>
            </Card>
            <div style={{ justifyContent: 'center', paddingTop: '4%'}}>
            <Button
                color="primary"
                onClick={() => { this.props.onFinish(); }}
                className="mr-0 btn-block mt-2 mb-2"
            > Save </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

FileTab.propTypes = {
  file: PropTypes.shape(FileObject),
};

export default FileTab;
