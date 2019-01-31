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
    handleSubmit = (e) => {
      const { form, onAuth } = this.props;
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          onAuth(values.email, values.password);
          console.log('Received values of form: ', values);
        }
      });
    }

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
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox> Remember me</Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="/register">Forgot password </a>

            {/* TO DO */}

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
                    Log in
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
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
})

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(TextField);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedNormalLoginForm));
