import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import DataMaster from './Datamaster';

class App extends Component {
render() {
return (
   <div className="App">
          <DataMaster />
   </div>

);
}
}

export default App;
