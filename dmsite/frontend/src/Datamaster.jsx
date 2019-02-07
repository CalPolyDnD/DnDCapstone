import React, { Component } from 'react';
import { Layout } from 'antd';
import 'filepond/dist/filepond.min.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header/Header';

const { Content, Footer } = Layout;

class DataMaster extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout className="Layout">
        <Header {...this.props} />
        <Content style={{ rightPadding: 50, paddingTop: 64 }}>
          <div style={{ background: '#4c4c4c', padding: 24, minHeight: 'calc(100vh - 55px)' }}>
            { children }
          </div>
        </Content>
        <Footer className="footer">
          © 2019 CalPoly DnD
        </Footer>
      </Layout>
    );
  }
}

DataMaster.propTypes = {
  children: PropTypes.oneOfType(PropTypes.node).isRequired,
}

export default withRouter(DataMaster);
