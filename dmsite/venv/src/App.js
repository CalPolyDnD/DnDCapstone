import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class App extends Component {
render() {
return (
  <div className="App">
	<header className="App-header">
	  <img src={logo} className="App-logo" alt="logo" />
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
	</header>
	// This is what allows us to upload files - please do not remove this!
	<FilePond allowMultiple={true} />
  </div>
);
}
}

export default App;
