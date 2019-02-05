import React from 'react';
import {
  ListGroup, ListGroupItem, Card, CardBody, Button, CardHeader,
} from 'reactstrap';
import './style.css';

class Campaign extends React.Component {
  render() {
    return (
      <div id="div" style={{ paddingTop: '5%' }}>
        <Card id="card" style={{ borderWidth: 0 }}>
          <CardHeader tag="h3" align="center" style={{ backgroundColor: '#303030', color: 'white' }}>Campaigns</CardHeader>
          <CardBody style={{ backgroundColor: '#3d3d3d', borderWidth: 0 }}>
            <ListGroup align="center" className="campaign-list" flush>
              <div style={{ backgroundColor: '#303030' }}>
                <ListGroupItem onClick={() => { this.props.history.push('/home'); }} style={{ backgroundColor: '#3d3d3d', color: 'white' }}>Campaign 1</ListGroupItem>
                <ListGroupItem onClick={() => { this.props.history.push('/home'); }} style={{ backgroundColor: '#3d3d3d', color: 'white' }}>Campaign 2</ListGroupItem>
                <ListGroupItem onClick={() => { this.props.history.push('/home'); }} style={{ backgroundColor: '#3d3d3d', color: 'white' }}>Campaign 3</ListGroupItem>
              </div>
            </ListGroup>
            <Button color="primary" size="md" className="btn-block mt-3">Create New Campaign</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Campaign;
