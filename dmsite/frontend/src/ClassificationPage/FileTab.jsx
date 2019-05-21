import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Row,
  Col,
  Input,
  CardHeader, 
  CardBody, 
  Card,
} from 'reactstrap';
import { Spin, Icon } from 'antd';
import ClassificationTable from './ClassificationTable';
import { FileObject } from '../Model/FileObject';
import './ClassificationInfo.css';
import Unknown from './ClassificationUnknown';

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
    }, () => { this.props.onFinish(this.stateChange); });
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
            {this.renderSaveButton()}
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
                <Unknown unknowns={file.unknowns} />
              </CardBody>
            </Card>
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
