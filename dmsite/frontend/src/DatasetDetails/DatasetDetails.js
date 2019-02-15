import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Button, Input,
} from 'reactstrap';
import './DatasetDetails.css';

class DatasetDetails extends Component {
  render() {
    return (
      <div className="dataset-details-page">
        <div className="dataset-details-title">
          <h2> Dataset Title </h2>
        </div>
        <hr className="dataset-divider" />
        <div className="dataset-details-cols">
          <div className="dataset-details-col-left">
            <h4> Dataset Labels </h4>
            <ListGroup>
              <ListGroupItem> a </ListGroupItem>
              <ListGroupItem> b </ListGroupItem>
              <ListGroupItem> c </ListGroupItem>
              <ListGroupItem> d </ListGroupItem>
              <ListGroupItem> e </ListGroupItem>
            </ListGroup>
          </div>
          <div className="dataset-details-col-right">
            <h4> Classifications </h4>
            <ListGroup>
              <ListGroupItem> a </ListGroupItem>
              <ListGroupItem> b </ListGroupItem>
              <ListGroupItem> c </ListGroupItem>
              <ListGroupItem> d </ListGroupItem>
              <ListGroupItem> e </ListGroupItem>
            </ListGroup>
            <Button className="dataset-details-col-button" color="primary"> Add Classification </Button>
          </div>
        </div>
        <div className="dataset-details-desc">
          <h4> Description </h4>
          <Input type="textarea" placeholder="This is a placecholder." name="text" id="exampleText" />
        </div>
        <div className="dataset-details-metadata">
          <h4> Metadata </h4>
          <ListGroup>
            <ListGroupItem> a </ListGroupItem>
            <ListGroupItem> b </ListGroupItem>
            <ListGroupItem> c </ListGroupItem>
            <ListGroupItem> d </ListGroupItem>
            <ListGroupItem> e </ListGroupItem>
          </ListGroup>
          <Button className="dataset-details-meta-button" color="primary"> Save </Button>
          <Button className="dataset-details-meta-button" color="primary"> Cancel </Button>
        </div>
      </div>
    );
  }
}

export default DatasetDetails;
