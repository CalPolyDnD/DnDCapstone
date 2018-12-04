import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import DataMaster from './Datamaster';
import './App.css';

class App extends Component {
render() {
return (
<Router>
   <div className="App">
          <DataMaster />
   </div>
</Router>
);
}
}

export default App;
