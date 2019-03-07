import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Input, Table, ListGroup, ListGroupItem
} from 'reactstrap';
import classnames from 'classnames';
import './ClassificationInfo.css'

let FETCH_URL = 'http://localhost:8000/classify_files';
let SAVE_URL =  'http://localhost:8000/classify_files/save';
//TODO: all of this needs style changes

class ClassificationPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      results: [],
      finished: 0,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onFinish() {
    this.setState({finished: 1});
    fetch(SAVE_URL, {
      method: 'POST',
      body: JSON.stringify(this.state.results)
    }).then(data => {
        return data.json();
    }).then(result => {
        this.props.history.push('/home');
    });
  }

  checkFinish() {
    if (this.state.finished === 1)
        return (<h3> Saving... </h3>);
  }

  displayClassification(count) {
    let jsonObj = [];
    let pos = 0;
    let result = this.state.results[count];
    let labels = "";
    for (pos; pos < result.classifications.length; pos++) {
        labels = result.classifications[pos].columns[0];
        for (let i = 1; i < result.classifications[pos].columns.length; i++)
            labels += ", " + result.classifications[pos].columns[i];
        jsonObj.push(
          <tr>
            <td> {result.classifications[pos].name} </td>
            <td> {labels} </td>
          </tr>,
        )
     }

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

  showInfo(count) {
    // TODO: fix users list, make checkmarks useful
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
              {this.displayClassification(count)}
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
              {this.displayUnknown(count)}
            </Table>
          </Col>
        </Row>
        <Row className="classification-bottom-button">
          <Button color="primary" onClick={() => { this.onFinish(); }}> Finished </Button>
          { this.checkFinish() }
        </Row>
      </div>
    );
  }

  displayTabs() {
    let jsonObj = [];
    for (let count = 0; count < this.state.results.length; count++) {
        let result = this.state.results[count];
        jsonObj.push(
            <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === count })}
                  onClick={() => {this.toggle(count);}}
                >
                    {result.filename}
                </NavLink>
            </NavItem>
        );
    }
    return jsonObj;
  }

  tabInfo() {
    let jsonObj = [];
    for (let count = 0; count < this.state.results.length; count++)
        jsonObj.push(
          <TabPane tabId={count}>
            {this.showInfo(count)}
          </TabPane>
        );

    return jsonObj;
  }

  componentDidMount() {
  // TODO: make this depend on passed-in files
    fetch(FETCH_URL, {
      method: 'POST',
      body: JSON.stringify([{
        filename: 'MOCK_DATA.csv'
      }, {
        filename: 'MOCK_PEOPLE.csv'
      }])
    }).then(data => {
        return data.json();
    }).then(results => {
        for (let count = 0; count < results.length; count++) {
            results[count].campaign = "test_campaign";
            results[count].description = "test desc";
         }
        this.setState({results: results})
    });
  }

  render() {
    if (!this.state.results.length)
        return (
            <h2> Classifying... </h2>
        );

    return (
      <div className="classification-page">
        <h2> Results </h2>
        <div>
          <Nav tabs>
            {this.displayTabs()}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
          {this.tabInfo()}
          </TabContent>
        </div>
      </div>
    );
  }
}

export default ClassificationPage;
