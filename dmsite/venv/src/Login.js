/**
 * Created by christinadaley on 1/15/19.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button, Card, CardTitle, CardBody, Input, Label} from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import TextField from './TextField.js';

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
                <Card id="card">
                    <h1 align="center"> Login </h1>
                    <CardTitle className="pl-4 pt-4">{this.props.name}</CardTitle>
                    <CardBody>

                        <TextField>
                            <Label> Enter </Label>
                            <Input style ={{color: "gray"}}>
                                id={1}
                                label="Field label"
                                predicted="California"
                                locked={false}
                                active={false}
                            </Input>
                        </TextField>

                        <Button color="primary"size="md" className="btn-block mt-0" onClick={this.uploadPressed}>
                            Login
                        </Button>
                    </CardBody>
                </Card>
            </Container>

        )
    }
}

export default withRouter(Login);
