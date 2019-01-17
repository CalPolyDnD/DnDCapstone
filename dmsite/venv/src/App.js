import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import DataMaster from './Datamaster';
import './App.css';
import BaseRouter from "./routes";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <DataMaster>
                        <BaseRouter/>
                    </DataMaster>
                </div>
            </Router>
        );
    }
}

export default App;
