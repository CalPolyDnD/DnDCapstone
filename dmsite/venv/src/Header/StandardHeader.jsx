import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroupButtonDropdown,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from 'reactstrap';

import Logo from '../images/DnDLogo2.png';
import './style.css';

const SEARCH_FIELDS = {
  name: 'Name',
  classification: 'Classification',
  attribute: 'Attribute',
};

class StandardHeader extends React.Component {
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

  renderNavItems() {
    const { isAuthenticated } = this.props;
    return (
      <ButtonGroup>
        {
          isAuthenticated
            ? [
              <Button
                color="primary"
                style={{ height: '50%', justifyContent: 'center', alignSelf: 'center' }}
                position="right"
                href="/profile"
              >
                Profile
              </Button>,
              <Button
                color="secondary"
                type="link"
                style={{ height: '50%', justifyContent: 'center', alignSelf: 'center' }}
              >
                Logout
              </Button>,
            ]
            : (
              <Button
                color="primary"
                type="link"
                href="/login"
                style={{ height: '50%', justifyContent: 'center', alignSelf: 'center' }}
              >
                Login
              </Button>
            )
        }
      </ButtonGroup>
    );
  }

  render() {
    return (
      <div>
        <Row style={{ width: '100%', justifyContent: 'space-between' }}>
          <Navbar color="light" light vertical fixed="top" role="navigation">
            <NavbarBrand href="/home/">
              <div className="d-inline-flex" id="logo-container">
                <img id="logo" alt="" width="65" height="50" src={Logo} />
                <h2 style={{ justifyContent: 'center', alignSelf: 'center' }}>
                  DataMaster
                </h2>
              </div>
            </NavbarBrand>
            {this.renderSearchBar()}
            <Nav className="ml-auto" navbar>
              {this.renderNavItems()}
            </Nav>
          </Navbar>
        </Row>
      </div>
    );
  }
}

StandardHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default StandardHeader;
