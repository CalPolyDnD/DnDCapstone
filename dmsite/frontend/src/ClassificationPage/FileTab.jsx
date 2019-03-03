import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Row,
  Col,
  Input,
  Table,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import ClassificationTable from './ClassificationTable';
import { FileObject } from '../Model/FileObject';
import './ClassificationInfo.css';

class FileTab extends Component {
  static defaultProps = {
    file: null,
  }

  constructor() {
    super();
    this.state = {
      selectedClassificationIndex: 0,
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

  setSelectedClassification = (index) => {
    this.setState({ selectedClassificationIndex: index });
  }

  render() {
    const { file } = this.props;
    const { selectedClassificationIndex } = this.state;
    if (file === null) {
      return (<div />);
    }

    return (
      <div>
        <Row className="classification-top-row">
          <Col xs="4">
            <ClassificationTable
              file={file}
              selectedClassificationIndex={selectedClassificationIndex}
              cellOnClick={this.setSelectedClassification}
            />
          </Col>
          <Col>
            <div>
              <h3> Description </h3>
              <Input type="textarea" placeholder="This is a placecholder." name="text" id="exampleText" />
            </div>
            <div className="classification-access">
              <h3> Access Control </h3>
              <h4> Users </h4>
              <div className="classification-access-left">
                <ListGroup>
                  <ListGroupItem> User 1 </ListGroupItem>
                  <ListGroupItem> User 2 </ListGroupItem>
                  <ListGroupItem> User 3 </ListGroupItem>
                  <ListGroupItem> User 4 </ListGroupItem>
                </ListGroup>
              </div>
              <div className="classification-access-right">
                <Row>
                  <Input type="checkbox" />
                  {' '}
                  Sensitive
                </Row>
                <Row>
                  <Input type="checkbox" />{' '}
                  Hidden
                </Row>
                <Row>
                  <Input type="checkbox" />{' '}
                  Restricted
                </Row>
                <Row>
                  <Input type="checkbox" />{' '}
                  Option 4
                </Row>
              </div>
            </div>
          </Col>
          <Col sm="3">
            <h3> Unknown Labels </h3>
            <Table>
              <thead>
                <th> Label </th>
              </thead>
              {this.displayUnknown()}
            </Table>
          </Col>
        </Row>
        <Row className="classification-bottom-button">
          <Button color="primary" onClick={() => { this.onFinish(); }}> Finished </Button>
        </Row>
      </div>
    );
  }
}

FileTab.propTypes = {
  file: PropTypes.shape(FileObject),
};

export default FileTab;
