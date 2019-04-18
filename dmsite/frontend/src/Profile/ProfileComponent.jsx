import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Card, Button, CardBody,
  Input, CardHeader,
} from 'reactstrap';
import axios from 'axios';
// import { FileObject } from '../Model/FileObject';
import { FormErrors } from './FormErrors';

const FETCH_CURRENT_USER_URL = 'http://localhost:8000/rest-auth/user/';
const CHANGE_PASSWORD_URL = 'http://localhost:8000/rest-auth/password/change/';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handlePasswordOneInput = this.handlePasswordOneInput.bind(this);
    this.handlePasswordTwoInput = this.handlePasswordTwoInput.bind(this);
    this.state = {
      popoverOpen: false,
      username: '',
      email: '',
      password1: '',
      password2: '',
      oldPassword: '',
      formErrors: { password: '' },
      passwordValid: true,
      formValid: true,
    };
  }

  handleUserInput = () => {
    const password1 = this.state.password1;
    const password2 = this.state.password2;
    const passwordChange = { password1, password2 };

    // this.validateField('password', password1);
    // this.validateField('password', password2);
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'crsftoken';
    axios.post(CHANGE_PASSWORD_URL, passwordChange)
      .then(() => this.props.history.push('/home'))
      .catch((error) => { console.log(error); });
  };

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
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

  handlePasswordOneInput(e) {
    this.setState({
      password1: e.target.value,
    });
  }

  handlePasswordTwoInput(e) {
    this.setState({
      password2: e.target.value,
    });
  }

  validateForm() {
    this.setState({ passwordValid: this.state.passwordValid });
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
              {/* <div className={`form-group */}
              {/* ${this.errorClass(this.state.formErrors.username)}`}> */}
              {/* <label htmlFor="user">Username</label> */}
              {/* <Input */}
              {/* type="username" */}
              {/* required */}
              {/* className="form-control" */}
              {/* name="username" */}
              {/* style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} */}
              {/* placeholder="User" */}
              {/* value={this.state.user} */}
              {/* onChange={this.handleUserInput} */}
              {/* /> */}
              {/* </div> */}
              {/* <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}> */}
              {/* <label htmlFor="email">Email</label> */}
              {/* <Input */}
              {/* type="email" */}
              {/* className="form-control" */}
              {/* name="email" */}
              {/* style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} */}
              {/* placeholder="Example@ex.com" */}
              {/* value={this.state.email} */}
              {/* onChange={this.handleUserInput} */}
              {/* /> */}
              {/* </div> */}
              <div style={{ paddingBottom: '10%' }}>
                <label>
Username
                  <br />
                  <br />
                    ..................................
                  {this.state.username}
                </label>
              </div>
              <div style={{ paddingBottom: '10%' }}>
                <label>
Email
                  <br />
                  <br />
                    ..................................
                  {this.state.email}
                </label>
              </div>
              <div style={{
                paddingLeft: '33%', paddingBottome: '5%', fontSize: '125%',
              }}
              >
                <label>Change Password</label>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password1">New Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}
                  placeholder=""
                  onChange={this.handlePasswordTwoInput}
                />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label htmlFor="password2">Confirm New Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }}
                  placeholder=""
                  onChange={this.handlePasswordOneInput}
                />
              </div>

              {/* <div> */}
              {/* <label htmlFor="security">Security</label> */}
              {/* <Input style={{ color: 'white', backgroundColor: '#303030', borderWidth: 0 }} */}
              {/* placeholder="Basic User" /> */}
              {/* </div> */}

              <div style={{
                backgroundColor: '#3d3d3d', paddingLeft: '15%', paddingRight: '15%',
              }}
              >
                {/* disabled={!this.state.formValid} this was in button */}
                <Button color="primary" className="btn-block mt0 login-form-button" onClick={this.handleUserInput}>Save and Return</Button>
                {' '}
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    );
  }
}

export default withRouter(Profile);
