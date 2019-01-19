import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import 'filepond/dist/filepond.min.css';
import DataMaster from './Datamaster';
import './App.css';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <DataMaster {...this.props}>
            <BaseRouter />
          </DataMaster>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
