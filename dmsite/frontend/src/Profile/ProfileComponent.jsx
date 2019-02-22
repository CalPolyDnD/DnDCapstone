import React from 'react';
import { FormErrors } from './FormErrors';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, Button, CardBody,
  Input, CardHeader,
} from 'reactstrap';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      username: '',
      email: '',
      password: '',
      formErrors: {email: '', password: '', username: ''},
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
        () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;


    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'username':
        usernameValid = value.length >= 0;
        fieldValidationErrors.username = usernameValid ? '': ' Create a username';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid,
                  usernameValid: usernameValid
                }, this.validateForm);
}

  toggle() {
    const { popoverOpen } = this.state;
    this.setState(prevState => ({
      ...prevState,
      popoverOpen: !popoverOpen,
    }));
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    return (
      <Container fluid style={{ justifyContent: 'center' }}>
        <div style={{
          justifyContent: 'center', width: '100%', alignSelf: 'center', display: 'flex',
        }}
        >
          <Card style={{
            justifyContent: 'center', width: '40%', alignSelf: 'center', display: 'flex', borderWidth: 0
          }}
          >
            <CardHeader tag="h3" align="center" style={{ backgroundColor: '#303030', color: 'white' }}>User Profile and Settings</CardHeader>
            <CardBody style={{ width: '100%', justifyContent: 'space-between', backgroundColor: '#3d3d3d', color: 'white' }} >
              <div className= "panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                <label htmlFor="user">Username</label>
                <Input type="username" required className="form-control" name="username"
                       style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}
                       placeholder="User"
                       value={this.state.user}
                       onChange={this.handleUserInput}  />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                <label htmlFor="email">Email</label>
                <Input type="email" className="form-control" name="email"
                       style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} placeholder="Example@ex.com"
                       value={this.state.email}
                       onChange={this.handleUserInput}  />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password">Password</label>
                <Input type="password" className="form-control" name="password"
                       style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} placeholder="Password123"
                       value={this.state.password}
                       onChange={this.handleUserInput}  />
              </div>
              <div>
                <label htmlFor="security">Security</label>
                <Input style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} placeholder="Basic User" />
              </div>
              <br />
            </CardBody>
            <div className="d-flex justify-content-center pt-2" style={{ backgroundColor: '#3d3d3d', color: 'white' }}>
              <Button color = "primary" size="md" className="btn-block mt-0" disabled={!this.state.formValid} onClick={() => { this.props.history.push('/home'); }} >Save</Button>
              <Button color="secondary" size="md" className="btn-block mt-0" onClick={() => { this.props.history.push('/home'); }}>Back</Button>
            </div>
          </Card>
        </div>
      </Container>
    );
  }
}

export default withRouter(Profile);
