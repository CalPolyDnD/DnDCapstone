import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, Button, CardTitle, CardBody, InputGroup,
  InputGroupAddon, Input, Popover, PopoverHeader, PopoverBody,
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
    const { history } = this.props.history;
    return (
      <Container fluid style={{ justifyContent: 'center' }}>
        <Card style={{ width: '60%', justifyContent: 'center', alignSelf: 'center' }}>
          <CardTitle className="pl-4 pt-4 pb-0">UserProfile</CardTitle>
          <CardBody style={{ width: '100%', justifyContent: 'space-between' }}>
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
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" size="md" className="mr-1 btn-block mt-0" onClick={() => { this.props.history.push('/home'); }}>Save</Button>
            <Button color="primary" size="md" className="btn-block mt-0" onClick={() => { this.props.history.push('/home'); }}>Back</Button>
          </div>
        </Card>
      </Container>
    );
  }
}

export default withRouter(Profile);
