import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import 'filepond/dist/filepond.min.css';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

import DataMaster from './Datamaster';
import './App.css';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignUp } = this.props;
    onTryAutoSignUp();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <DataMaster {...this.props}>
            <BaseRouter {...this.props} />
          </DataMaster>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  onTryAutoSignUp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
