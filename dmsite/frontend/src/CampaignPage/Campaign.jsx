import React from 'react';
import {
  ListGroup, ListGroupItem, Card, CardBody, Button, CardHeader,
} from 'reactstrap';
import './style.css';
import axios from 'axios';

const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';
const FETCH_CAMPAIGNS_URL = 'http://localhost:8000/get_campaigns';

class Campaign extends React.Component {
  constructor() {
    super();
    this.state = {
      campaigns: [],
    };
  }

  onClick() {
    this.props.history.push(`/a/${this.props.a}`);
    window.location.reload();


  }

  componentDidMount() {
    axios.get(FETCH_CURRENT_USER_URL)
      .then((userRes) => {
        axios.post(FETCH_CAMPAIGNS_URL, {
          user: userRes.data.email,
        })
          .then((campRes) => {
            this.setState({ campaigns: campRes.data });
          });
      });
  }

  getCampaignList() {
    const jsonObj = [];
    const { campaigns } = this.state;
    const { history } = this.props;
    for (let count = 0; count < campaigns.length; count += 1) {
      const result = campaigns[count];
      jsonObj.push(
        <ListGroupItem
          onClick={() => { history.push(`/home${campaigns.name}`); }}
          style={{ backgroundColor: '#3d3d3d', color: 'white' }}
        >
          {result.name}
        </ListGroupItem>,
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
            <Button color="secondary" size="md" className="btn-block mt-3"
                    disabled={this.state.campaigns.length === 0}
                    onClick={this.onClick}>Save & Continue </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Campaign;
