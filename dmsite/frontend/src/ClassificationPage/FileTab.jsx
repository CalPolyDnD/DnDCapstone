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
import { Spin, Icon } from 'antd';
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
      description: props.file.description,
      isSaving: false,
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
    this.setState({ description: event.target.value });
  }

  stateChange = () => {
    this.setState({ isSaving: false });
  }

  onSave = () => {
    this.props.file.description = this.state.description;
    this.setState({
      isSaving: true,
    }, () => { this.props.onFinish(this.stateChange);  });
  }

  setSelectedClassification = (index) => {
    this.setState({ selectedClassificationIndex: index });
  }

  renderSaveButton() {
    const { isSaving } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const buttonMsg = isSaving ? <Spin indicator={antIcon} /> : 'Save';
    return (
      <div style={{ justifyContent: 'center', paddingTop: '4%' }}>
        <Button
          color="primary"
          onClick={this.onSave}
          className="mr-0 btn-block mt-2 mb-2"
        >
          {buttonMsg}
        </Button>
      </div>
    );
  }

  render() {
    const { selectedClassificationIndex, description } = this.state;
    const { file } = this.props;

    if (file === null) {
      return (<div />);
    }
    return (
      <div>
        <Row className="classification-top-row" style={{ justifyContent: 'space-between' }}>
          <Col>
            <Card style={{ borderWidth: 0 }}>
              <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white', textAlign: 'center' }}>Description</CardHeader>
              <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                <Input
                  type="textarea"
                  value={description}
                  name="text"
                  id="exampleText"
                  style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}
                  onChange={this.handleChange}
                />
              </CardBody>
            </Card>
            <div style={{ paddingTop: '5%' }}>
              <Card style={{ borderWidth: 0, justified: 'center' }}>
                <CardHeader tag="h3" style={{ backgroundColor: '#303030', color: 'white', textAlign: 'center' }}>Access Control</CardHeader>
                <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                  <ListGroup style={{ color: 'white', borderWidth: 0, borderColor: '#3d3d3d' }}>
                    <ListGroupItem style={{ backgroundColor: '#3d3d3d', color: 'white', borderWidth: 0 }}>
                      Your Username
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
                      Griffin Aswegan
                      <Input style={{ right: '10%' }} type="checkbox" />
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
              >
                Unknown Labels
              </CardHeader>
              <CardBody style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
                <Table style={{ borderWidth: 0 }}>
                  {this.displayUnknown()}
                </Table>
              </CardBody>
            </Card>
            {this.renderSaveButton()}
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
