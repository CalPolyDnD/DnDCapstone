import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import {
  Menu,
  Button,
  Dropdown,
  Icon,
  Input,
  Select,
  Spin,
} from 'antd';

import Logo from '../images/DnDLogo2.png';
import './style.css';
import * as actions from '../store/actions/auth';

const MenuItem = Menu.Item;
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

const SEARCH_FIELDS = {
  name: 'Name',
  classification: 'Classification',
  attribute: 'Attribute',
};

class StandardHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilterOrder: [
        SEARCH_FIELDS.name,
        SEARCH_FIELDS.classification,
        SEARCH_FIELDS.attribute,
      ],
      modalIsVisible: false,
      searchbarFilter: 'Name',
    };
    this.switchFilter = this.switchFilter.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (e) => {
    const { history, logout } = this.props;
    e.preventDefault();
    this.setState({ modalIsVisible: true },
      () => {
        logout()
          .then(() => history.push('/login'));
        this.setState({ modalIsVisible: false });
      });
  };

  switchFilter(index) {
    const { searchFilterOrder } = this.state;
    this.setState(prevState => (
      {
        ...prevState,
        searchbarFilter: searchFilterOrder[index],
      }));
  }

  renderSearchBar() {
    const { history } = this.props;
    const { searchFilterOrder, searchbarFilter } = this.state;
    return (
      <InputGroup
        compact
        className="align-self-center px-4"
      >
        <Select
          dropdownMatchSelectWidth={false}
          defaultValue={0}
          onSelect={this.switchFilter}
          className="float-left"
          style={{ backgroundColor: '#303030' }}
        >
          { searchFilterOrder.map((filter, index) => (
            <Option
              value={index}
              style={{ backgroundColor: '#303030', color: 'white' }}
            >
              {filter}
            </Option>
          ))}
        </Select>
        <Search
          placeholder={`Search Campaign by ${searchbarFilter}`}
          onSearch={(searchbarText) => { history.push(`/search/${searchbarFilter}?=${searchbarText}`); }}
          enterButton
          style={{ width: '40%', height: '32px', background: '#303030' }}
        />
      </InputGroup>
    );
  }

  renderProfileDropdown() {
    const { isAuthenticated } = this.props;
    const { modalIsVisible } = this.state;

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <Menu>
        {
          isAuthenticated
            ? ([
              <MenuItem>
                <a href="/profile" key="profile">Profile</a>
              </MenuItem>,

              <MenuItem>
                <a
                  onClick={e => this.handleLogout(e)}
                  href="/login"
                  key="logout"
                  style={{ color: 'red' }}
                >
                  Logout
                </a>
                <Modal isOpen={modalIsVisible}>
                  <ModalBody style={{ textAlign: 'center' }}>
                    <Spin style={{ backgroundColor: 'transparent' }} indicator={antIcon} tip='Logging out...' backdrop='static'/>
                  </ModalBody>
                </Modal>
              </MenuItem>,
            ]
            )
            : (
              <MenuItem>
                <a href="/login/" key="login">Login</a>
              </MenuItem>

            )
        }
      </Menu>
    );
  }

  renderNavItems() {
    return (
      <div className="d-inline-flex px-2" id="buttonContainer">
        <Button
          title="Help"
          icon="question"
          shape="circle"
          ghost
          className="mx-1"
          htmlType="button"
        />
        <Button
          title="Settings"
          icon="setting"
          shape="circle-outline"
          ghost
          className="mx-1"
          htmlType="button"
        />
        <Dropdown overlay={this.renderProfileDropdown()}>
          <Button
            icon="user"
            shape="circle-outline"
            ghost
            className="mx-1"
            htmlType="button"
          />
        </Dropdown>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: '64px', background: '#000000' }} id="headerContainer">
        <div style={{ background: '#000000' }}>
          <a className="d-inline-flex px-2" href="/home/" id="logoBanner">
            <img id="logo" alt="" width="65" height="50" src={Logo} />
            <h2
              style={{
                color: 'white',
                textDecoration: 'none',
                height: '50px',
                alignSelf: 'center',
                lineHeight: '50px',
              }}
            >
            DataMaster
            </h2>
          </a>
        </div>
        { this.renderSearchBar() }
        { this.renderNavItems() }
      </div>
    );
  }
}

StandardHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
});


export default connect(null, mapDispatchToProps)(withRouter(StandardHeader));
