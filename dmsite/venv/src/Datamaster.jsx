import React, { Component } from 'react';
import { Layout } from 'antd';
import 'filepond/dist/filepond.min.css';
import { withRouter } from 'react-router-dom';

import Header from './Header/Header';

const { Content, Footer } = Layout;
const { children } = this.props.children;

class DataMaster extends Component {
  render() {
    return (
      <Layout className="Layout">
        <Header />
        <Content style={{ rightPadding: 50 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 55px)' }}>
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

export default withRouter(DataMaster);
