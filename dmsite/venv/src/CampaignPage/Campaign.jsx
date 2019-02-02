import React from 'react';
import {
  ListGroup, ListGroupItem, Card, CardBody, CardTitle, Button, Container, CardHeader,
} from 'reactstrap';
import './style.css';

class Campaign extends React.Component {
  render() {
    return (
      <div id="div">
        <Card id="card">
          <CardHeader tag="h3" align="center">Campaigns</CardHeader>
          <CardBody>
            <ListGroup align="center" className="campaign-list" flush>
              <ListGroupItem onClick={() => { this.props.history.push('/home'); }} >Campaign 1</ListGroupItem>
              <ListGroupItem onClick={() => { this.props.history.push('/home'); }} >Campaign 2</ListGroupItem>
              <ListGroupItem onClick={() => { this.props.history.push('/home'); }} >Campaign 3</ListGroupItem>
            </ListGroup>
            <Button color="primary" size="md" className="btn-block mt-0">Create New Campaign</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Campaign;
