
import logo from "../images/logo.svg";
import './Header.css';
import React, { Component } from 'react';

  class Header extends Component {
      render(){
          return(
              <div className="App">
              	<header className="App-header">
              	  <h1>DataMasters!</h1>

              	</header>

              	<body>
              	    <img src="../images/logo" className="App-logo" alt="logo" />
                                	  <p>
                                		Edit <code>src/App.js</code> and save to reload.
                                	  </p>
                                	  <a
                                		className="App-link"
                                		href="https://reactjs.org"
                                		target="_blank"
                                		rel="noopener noreferrer"
                                	  >
                                		Learn React
                                	  </a>
              	</body>
              	// This is what allows us to upload files - please do not remove this!
              	<FilePond allowMultiple={true} />
                </div>

          );
      }
  }

  export default Header