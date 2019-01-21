import React from 'react';

import Logo from '../images/DnDLogo2.png';

const LoginHeader = () => {
  return (
    <div style={{ height: '64px' }} id="headerContainer">
      <a className="d-inline-flex px-2 justify-self-center mx-auto" href="/" id="logoBanner">
        <img id="logo" alt="" width="90" height="70" src={Logo} />
        <h1
          className="m-0"
          style={{
            color: 'white',
            textDecoration: 'none',
            height: '50px',
            alignSelf: 'center',
            lineHeight: '50px',
          }}
        >
          DataMaster
        </h1>
      </a>
    </div>
  );
};

export default LoginHeader;
