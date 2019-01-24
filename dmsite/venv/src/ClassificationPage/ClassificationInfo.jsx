import React, { Component } from 'react';
import {
  Button, Row, Col, Input, Table, ListGroup, ListGroupItem
} from 'reactstrap';
import './ClassificationInfo.css';

class ClassificationInfo extends Component {
  displayClassification() {
    // TODO actually have it display multiple different classifications
    var jsonObj = [
      <tr>
        <td> Classification 1 </td>
        <td> Label 1 </td>
      </tr>,
    ];
    jsonObj.push(
      <tr>
        <td> Classification 2 </td>
        <td> Label 2 </td>
      </tr>,
    );
    jsonObj.push(
      <tr>
        <td> Classification 3 </td>
        <td> Label 3 </td>
      </tr>,
    );
    return (
      <tbody>
        {jsonObj}
      </tbody>
    );
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

  onFinish() {
    // TODO: fix this to actually save
    //this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <Row className="classification-top-row">
          <Col xs="4">
            <h3> Classifications </h3>
            <Table>
              <thead>
                <th> Classification </th>
                <th> Label </th>
              </thead>
              {this.displayClassification()}
            </Table>
          </Col>
          <Col>
            <div>
              <h3> Description </h3>
              <Input type="textarea" placeholder="This is a placecholder." name="text" id="exampleText" />
            </div>
            <div className="classification-access">
              <h3> Access Control </h3>
                <h4> Users </h4>
                <div className={"classification-access-left"}>
                  <ListGroup>
                    <ListGroupItem> User 1 </ListGroupItem>
                    <ListGroupItem> User 2 </ListGroupItem>
                    <ListGroupItem> User 3 </ListGroupItem>
                    <ListGroupItem> User 4 </ListGroupItem>
                  </ListGroup>
                </div>
                <div className={"classification-access-right"}>
                    <Row>
                        <Input type="checkbox" />{' '}
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

export default ClassificationInfo;
