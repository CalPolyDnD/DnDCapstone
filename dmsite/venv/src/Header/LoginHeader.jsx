import React from 'react';
import {
  Navbar, NavbarBrand, NavItem,
} from 'reactstrap';

import Logo from '../images/DnDLogo2.png';

const LoginHeader = () => {
  return (
    <div>
      <Navbar color="light" light fixed="top">
        <NavbarBrand className="mx-auto">
          <div className="d-inline-flex">
            <img id="logo" alt="" width="90" height="70" src={Logo} />
            <h1 className="pt-5 pb-5">DataMaster</h1>
          </div>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default LoginHeader;
