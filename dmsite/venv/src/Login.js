/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button} from 'reactstrap';
import { Switch, Route } from 'react-router-dom'
import FilterColumn from './FilterColumn';
import DisplayData from './DisplayData';
import DisplayColumn from './DisplayColumn';
import Results from './Results';
import HomeComponent from './HomeComponent';

class Login extends Component{
    constructor(props){
        super(props);
        this.uploadPressed = this.uploadPressed.bind(this)
    }
    uploadPressed(){
        let path = '/home'
        this.props.history.push(path)
    }
    render(){
        return (
            <Container fluid>
                <h1>Login page</h1>
                <Button onClick={this.uploadPressed}>
                    Login
                </Button>
            </Container>
        )
    }
}

export default withRouter(Login);
