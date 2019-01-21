/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button, Card, CardTitle, CardBody, Input, Label, Form} from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import TextField from './LoginTextField.js';

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
            <div style={{float : 'right', paddingRight : '35%'}}>
            <Container fluid>
                <Card align="center" >
                    <h1 align="center"> Login </h1>
                    <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
                    <CardBody>
                        <TextField/>
                        <Button color="primary"size="md" className="btn-block mt-0" onClick={this.uploadPressed}>
                            Login
                        </Button>
                    </CardBody>
                </Card>
            </Container>
            </div>

        )
    }
}


export default withRouter(Login);
