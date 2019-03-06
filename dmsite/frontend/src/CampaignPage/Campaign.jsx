import React from 'react';
import {
  ListGroup, ListGroupItem, Card, CardBody, Button, CardHeader, NavLink, NavItem,
} from 'reactstrap';
import './style.css';

class Campaign extends React.component{

  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
    };
  }

  componentDidMount() {
    const FETCH_URL = 'http://localhost:8000/getUser';
    const FETCH_URL2 = 'http://localhost:8000/getCampaigns'
    const user = data.json();
    fetch(FETCH_URL, {
      method: 'POST',
      body: JSON({
        user: "user",
      }, )
    }).then((data) => {
      this.setState({ user: user });
    });
    fetch(FETCH_URL2, {
      method: 'POST',
      body: JSON.stringify([{campaigns: user + ".campaigns"}])
    }).then((data) => {
      const campaigns = data.json();
      this.setState({ campaigns: campaigns });
    });
  }

  getCampaignList(campaigns){
    const jsonObj = [];
    for (let count = 0; count < this.state.compaigns.length; count++) {
      const result = this.state.campaigns[count];
      jsonObj.push(
          <ListGroupItem
              onClick={() => { this.props.history.push('/home' + campaigns.name); }}
              style={{ backgroundColor: '#3d3d3d', color: 'white' }}
          >
            {result.name}
          </ListGroupItem>
      );
    }
    return jsonObj;
  }

  render() {
    return (
      <div id="div" style={{ paddingTop: '5%' }}>
        <Card id="card" style={{ borderWidth: 0 }}>
          <CardHeader tag="h3" align="center" style={{ backgroundColor: '#303030', color: 'white' }}>Campaigns</CardHeader>
          <CardBody style={{ backgroundColor: '#3d3d3d', borderWidth: 0 }}>
            <ListGroup align="center" className="campaign-list" flush>
              {this.getCampaignList()}
            </ListGroup>
            <Button color="primary" size="md" className="btn-block mt-3">Create New Campaign</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Campaign;
