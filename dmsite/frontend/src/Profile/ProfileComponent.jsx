import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, Button, CardBody, InputGroup,
  InputGroupAddon, Input, Popover, PopoverHeader, PopoverBody, CardHeader,
} from 'reactstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }

  toggle() {
    const { popoverOpen } = this.state;
    this.setState(prevState => ({
      ...prevState,
      popoverOpen: !popoverOpen,
    }));
  }

  render() {
    return (
      <Container fluid style={{ justifyContent: 'center' }}>
        <div style={{
          justifyContent: 'center', width: '100%', alignSelf: 'center', display: 'flex',
        }}
        >
          <Card style={{
            justifyContent: 'center', width: '60%', alignSelf: 'center', display: 'flex', borderWidth: 0
          }}
          >
            <CardHeader tag="h3" align="center" style={{ backgroundColor: '#303030', color: 'white' }}>User Profile and Settings</CardHeader>
            <CardBody style={{ width: '100%', justifyContent: 'space-between', backgroundColor: '#3d3d3d', color: 'white' }} >
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button id="PopoverFocus" type="button">@Username</Button>
                  <Popover trigger="focus" placement="bottom" target="PopoverFocus">
                    <PopoverHeader>Focus Trigger</PopoverHeader>
                    <PopoverBody>hi</PopoverBody>
                  </Popover>
                </InputGroupAddon>
                <Input placeholder="UsernameMan" />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button id="PopoverFocus" type="button">@Password</Button>
                  <Popover trigger="focus" placement="bottom" target="PopoverFocus">
                    <PopoverHeader>Focus Trigger</PopoverHeader>
                    <PopoverBody>hi</PopoverBody>
                  </Popover>
                </InputGroupAddon>
                <Input placeholder="Password123" />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button id="PopoverFocus" type="button">@Email</Button>
                  <Popover trigger="focus" placement="bottom" target="PopoverFocus">
                    <PopoverHeader>Focus Trigger</PopoverHeader>
                    <PopoverBody>hi</PopoverBody>
                  </Popover>
                </InputGroupAddon>
                <Input placeholder="Example@ex.com" />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button id="PopoverFocus" type="button">@Security</Button>
                  <Popover trigger="focus" placement="bottom" target="PopoverFocus">
                    <PopoverHeader>Focus Trigger</PopoverHeader>
                    <PopoverBody>hi</PopoverBody>
                  </Popover>
                </InputGroupAddon>
                <Input placeholder="Basic User" />
              </InputGroup>
              <br />
            </CardBody>
            <div className="d-flex justify-content-center pt-2" style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
              <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={() => { this.props.history.push('/home'); }}>Save</Button>
              <Button color="secondary" size="md" className="btn-block mt-0" onClick={() => { this.props.history.push('/home'); }}>Back</Button>
            </div>
          </Card>
        </div>
      </Container>
    );
  }
}

export default withRouter(Profile);
