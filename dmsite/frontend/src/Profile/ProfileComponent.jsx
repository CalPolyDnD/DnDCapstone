import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, Button, CardBody,
  Input, CardHeader,
} from 'reactstrap';
import axios from 'axios';
import { FileObject } from '../Model/FileObject';
import { FormErrors } from './FormErrors';

const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';
const CHANGE_PASSWORD_URL = 'http://localhost:8000/rest-auth/password/change/';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      username: '',
      email: '',
      password1: '',
      password2: '',
      oldPassword: '',
      formErrors: { email: '', password: '', username: '' },
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const passwordChange = { password1: e.target.password1, password2: e.target.password2 };
    this.setState({ [name]: value },
      () => { this.validateField(name, value); });
    axios.post(CHANGE_PASSWORD_URL, passwordChange);
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;


    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'username':
        usernameValid = value.length > 0;
        fieldValidationErrors.username = usernameValid ? '' : ' Create a username';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      usernameValid,
    }, this.validateForm);
  }

  toggle() {
    const { popoverOpen } = this.state;
    this.setState(prevState => ({
      ...prevState,
      popoverOpen: !popoverOpen,
    }));
  }

  componentDidMount() {
    axios.get(FETCH_CURRENT_USER_URL)
      .then((userRes) => {
        this.setState({
          email: userRes.data.email,
          username: userRes.data.username,
          password: userRes.data.password,
        });
      });
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  render() {
    return (
      <Container fluid style={{ justifyContent: 'center' }}>
        <div style={{
          justifyContent: 'center', width: '100%', alignSelf: 'center', display: 'flex', paddingTop: '3%',
        }}
        >
          <Card style={{
            justifyContent: 'center', width: '40%', alignSelf: 'center', display: 'flex', borderWidth: 0,
          }}
          >
            <CardHeader tag="h3" align="center" style={{ backgroundColor: '#303030', color: 'white' }}>Profile Settings</CardHeader>
            <CardBody style={{
              width: '100%', justifyContent: 'space-between', backgroundColor: '#3d3d3d', color: 'white',
            }}
            >
              <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              {/*<div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>*/}
                {/*<label htmlFor="user">Username</label>*/}
                {/*<Input*/}
                  {/*type="username"*/}
                  {/*required*/}
                  {/*className="form-control"*/}
                  {/*name="username"*/}
                  {/*style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}*/}
                  {/*placeholder="User"*/}
                  {/*value={this.state.user}*/}
                  {/*onChange={this.handleUserInput}*/}
                {/*/>*/}
              {/*</div>*/}
              {/*<div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>*/}
                {/*<label htmlFor="email">Email</label>*/}
                {/*<Input*/}
                  {/*type="email"*/}
                  {/*className="form-control"*/}
                  {/*name="email"*/}
                  {/*style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}*/}
                  {/*placeholder="Example@ex.com"*/}
                  {/*value={this.state.email}*/}
                  {/*onChange={this.handleUserInput}*/}
                {/*/>*/}
              {/*</div>*/}
              <label>Username: {this.state.username}</label>
              <label>Email: {this.state.email}</label>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}
                  placeholder="Password123"
                  value={this.state.password1}
                  onChange={this.handleUserInput}
                />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password">Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}
                    placeholder="Password123"
                    value={this.state.password2}
                    onChange={this.handleUserInput}
                />
              </div>

              {/* <div> */}
              {/* <label htmlFor="security">Security</label> */}
              {/* <Input style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} placeholder="Basic User" /> */}
              {/* </div> */}
              <br />
            </CardBody>
            <div style={{
              backgroundColor: '#3d3d3d', paddingLeft: '15%', paddingRight: '15%', paddingBottom: '5%',
            }}
            >
              <Button color="primary" className="btn-block mt0 login-form-button" disabled={!this.state.formValid} onClick={() => { this.props.history.push('/home'); }}>Save and Return</Button>
              {/* TO DO : handleUserInput */}
            </div>
          </Card>
        </div>
      </Container>
    );
  }
}

export default withRouter(Profile);
