import React from 'react';
import {
  ListGroup, ListGroupItem, Card, CardBody, Button, CardHeader, Modal, ModalBody, ModalHeader, ModalFooter, Input
} from 'reactstrap';
import './style.css';
import axios from 'axios';

const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';
const FETCH_CAMPAIGNS_URL = 'http://localhost:8000/get_campaigns';
const NEW_URL = 'http://localhost:8000/new_campaign'

class Campaign extends React.Component {
  constructor() {
    super();
    this.state = {
      campaigns: [],
      modal: false,
      newName: "",
      userRes: null,
      error: 0,
    };

    this.toggleFunc = this.toggle.bind(this);
    this.createNewCampaign = this.createNewCampaign.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      newName: ""
    }));
  }

  componentDidMount() {
    axios.get(FETCH_CURRENT_USER_URL)
      .then((userRes) => {
        this.setState({ userRes: userRes.data.email });
        axios.post(FETCH_CAMPAIGNS_URL, {
          owner: userRes.data.email,
        })
          .then((campRes) => {
            this.setState({ campaigns: campRes.data });
          });
      });
  }

  handleChange({ target }) {
    this.setState({
        newName: target.value,
    });
  }

  createNewCampaign() {
    let newObj = {};
    this.setState({ error: 0 });
    newObj.campName = this.state.newName;
    newObj.owner = this.state.userRes;
    fetch(NEW_URL, {
      method: 'POST',
      body: JSON.stringify(newObj)
    }).then(data => {
        if (data.status === 200)
            window.location.reload();
        else
            this.setState({ error: 1 });
    });
  }

  checkError() {
    if (this.state.error === 1)
      return (
          <h6 style={{ color:'red'}}> Error - campaign already exists. Campaigns must be globally unique. </h6>
      );
    else
      return null;
  }

  getCampaignList() {
    const jsonObj = [];
    const { campaigns } = this.state;
    const { history } = this.props;
    for (let count = campaigns.length - 1; count >= 0; count -= 1) {
      const result = campaigns[count];
      jsonObj.push(
        <ListGroupItem
          onClick={() => { history.push(`/home/${result.name}`); }}
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
            <Button color="primary" size="md" className="btn-block mt-3" onClick={this.toggleFunc} >Create New Campaign</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>New Campaign</ModalHeader>
              <ModalBody>
                <h3> Name </h3>
                <Input
                  placeholder="Enter a New Campaign Name"
                  name="newName"
                  value={ this.state.newName }
                  onChange={ this.handleChange } />
                { this.checkError() }
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={ this.createNewCampaign }>Okay</Button>{' '}
                <Button color="secondary" onClick={this.toggleFunc}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Campaign;
