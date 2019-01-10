import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button,
  Input,
  Form,
  Row,
} from 'reactstrap';

import Logo from '../images/DnDLogo2.png';
import './style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbarText: '',
      isLoggedIn: false,
    };
  }

  updateSearchBarText(event) {
    this.setState({
      searchbarText: event.target.value,
    });
  }

  renderButton() {
    return (
      <Button onClick={() => { this.props.history.push(`/search/${this.state.searchbarText}`); }}>Search</Button>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <div className="d-inline-flex">
            <img id="logo" alt="DnDlogo" width="90" height="70" src={Logo} />
            <h1 id="header" onClick={() => { this.props.history.push('/'); }}>DataMaster</h1>
            <Form inline>
              <Input id="searchBar" type="search" className="ml-4" placeholder="Search Dataset" onChange={(event) => {this.updateSearchBarText(event)}} />
              {this.renderButton()}
            </Form>
          </div>
        </Row>
        <Row>
          <hr style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: '100%',
          }}
          />
        </Row>
      </div>
    );
  }
}

export default withRouter(Header);
