import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FilterColumn from './DataColumn/FilterColumn';
import DisplayData from './DataColumn/DisplayData';
import DisplayColumn from './VisualColumn/DisplayColumn';
import Results from './ClassificationColumn/Results';
import { Container, Card, Button,CardTitle, CardBody, InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';

class Profile extends Component{
    render(){
        return (
            <Container fluid style={{ justifyContent: 'center' }}>
              <Card style={{ width: '60%', justifyContent: 'center', alignSelf: "center" }}>
                <CardTitle className="pl-4 pt-4 pb-0">UserProfile</CardTitle>
                <CardBody style={{ width: '100%', justifyContent: 'space-between' }}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@Username</InputGroupText>
                    </InputGroupAddon>
                    <Input />
                  </InputGroup>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@Email!</InputGroupText>
                    </InputGroupAddon>
                    <Input />
                  </InputGroup>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@Password</InputGroupText>
                    </InputGroupAddon>
                    <Input />
                  </InputGroup>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@Security</InputGroupText>
                    </InputGroupAddon>
                    <Input />
                  </InputGroup>
                  <br />
                </CardBody>
                <div className="d-flex justify-content-center pt-2">
                  <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={() => { this.props.history.push('/home'); }} >Save</Button>
                  <Button color="primary"size="md" className="btn-block mt-0" onClick={() => { this.props.history.push('/home'); }} >Go Back</Button>
                </div>
              </Card>
            </Container>
        )
    }
}

export default withRouter(Profile);
