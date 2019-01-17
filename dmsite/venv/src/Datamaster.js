import React, { Component } from 'react';
import { Layout } from 'antd';
import 'filepond/dist/filepond.min.css';
import Header from './Header/Header';
import {withRouter} from "react-router-dom";


const { Content, Footer } = Layout;
class DataMaster extends Component {
    render() {
        return (
            <Layout className='Layout'>
                <Header />
                <Content style={{padding: '0 50px'}}>
                    <div style={{ background: '#fff', padding: 24, minHeight: "calc(100vh - 55px)" }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer className='footer'>
                    © 2019 CalPoly DnD
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(DataMaster);
