import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroupButtonDropdown,
  Form,
  Row,
} from 'reactstrap';

import Logo from '../images/DnDLogo2.png';
import './style.css';

const SEARCH_FIELDS = {
  name: 'Name',
  classification: 'Classification',
  attribute: 'Attribute',
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      searchbarText: '',
      searchFilterOrder: [
        SEARCH_FIELDS.name,
        SEARCH_FIELDS.classification,
        SEARCH_FIELDS.attribute,
      ],
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  switchFilter(index) {
    const newOrder = this.state.searchFilterOrder.slice();
    newOrder[0] = this.state.searchFilterOrder[index];
    newOrder[index] = this.state.searchFilterOrder[0];
    this.setState({ searchFilterOrder: newOrder });
  }

  toggleDropDown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  updateSearchBarText(event) {
    this.setState({
      searchbarText: event.target.value,
    });
  }

  renderSearchBar() {
    return (
      <Form inline onSubmit={() => { this.props.history.push(`/search/${this.state.searchFilterOrder[0]}${this.state.searchbarText}`); }}>
        <Input id="searchBar" type="search" className="ml-4" placeholder="Search Dataset" onChange={(event) => { this.updateSearchBarText(event); }} />
        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle outline caret>
            {this.state.searchFilterOrder[0]}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => { this.switchFilter(1); }}>
              {this.state.searchFilterOrder[1]}
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => { this.switchFilter(2); }}>
              {this.state.searchFilterOrder[2]}
            </DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Button type="submit" color="primary">Search</Button>
      </Form>
    );
  }

  render() {
    const horizontalLineStyling = {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: '100%',
    };

    return (
      <div>
        <Row style={{ width: '100%', justifyContent: 'space-between' }}>
          <div className="d-inline-flex" id="header-container">
            <img id="logo" alt="DnDlogo" width="90" height="70" src={Logo} />
            <h1 style={{ justifyContent: 'center', alignSelf: 'center' }} onClick={() => { this.props.history.push('/home'); }}>DataMaster</h1>
            {this.renderSearchBar()}
          </div>
          <Button color="primary" style={{ height: '50%', justifyContent: 'center', alignSelf: 'center' }} position="right" onClick={() => { this.props.history.push('/profile'); }}>User Profile</Button>
        </Row>
        <Row>
          <hr style={horizontalLineStyling} />
        </Row>
      </div>
    );
  }
}

export default withRouter(Header);
