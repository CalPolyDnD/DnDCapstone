/**
 * Created by christinadaley on 1/18/19.
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Checkbox,
  Form,
  Icon,
  Input,
  Button,
  Spin,
} from 'antd';
import * as actions from '../store/actions/auth';

const antSpinner = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class TextField extends React.Component {
  componentDidUpdate = () => {
    const {
      history, isAuthenticated,
    } = this.props;

    if (isAuthenticated) {
      history.push('/campaign');
    }
  };

  handleSubmit = (e) => {
    const {
      form, onAuth,
    } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onAuth(values.email, values.password)
          .then(newState => this.setState({ ...newState }));
      }
    });
  };

  render() {
    const { form, loading, error } = this.props;
    const { getFieldDecorator } = form;
    let errorMessage = null;

    if (error) {
      errorMessage = (
        <p>{error.message}</p>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              type="email"
              placeholder="Email"
              style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              type="password"
              placeholder="Password"
              style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox style={{ color: 'white' }}> Remember me</Checkbox>,
          )}
        </Form.Item>
        <Form.Item style={{ color: 'white' }}>
          <a className="login-form-forgot" href="/register">Forgot password </a>
            or
          {' '}
          <a href="/register">Create an account now!</a>
        </Form.Item>
        { errorMessage }
        <Form.Item>
          {
              loading
                ? <Spin indicator={antSpinner} />

                : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-block mt0 login-form-button"
                  >
                        Login
                  </Button>
                )
            }
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
  isAuthenticated: state.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
});

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(TextField);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedNormalLoginForm));
