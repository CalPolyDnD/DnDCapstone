/**
 * Created by christinadaley on 1/21/19.
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Form,
  Icon,
  Input,
  Spin,
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const antSpinner = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class NewAccountTextField extends React.Component {
    state = {
      confirmDirty: false,
    };

    componentDidUpdate() {
      const { history, isAuthenticated } = this.props;

      if (isAuthenticated) {
        history.push('/campaign');
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const {
        form, onAuth, history, error,
      } = this.props;
      const { validateFieldsAndScroll } = form;
      validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          onAuth(values.email, values.password, values.confirm)
            .then(newState => this.setState({ ...newState }));
        }
      });
    };

    handleConfirmBlur = (e) => {
      const { value } = e.target;
      this.setState((prevState) => {
        const { confirmDirty } = this.state;
        return {
          ...prevState,
          confirmDirty: confirmDirty || !!value,
        };
      });
    };

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('The two passwords you entered are inconsistent');
      } else {
        callback();
      }
    };

    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      const { confirmDirty } = this.state;

      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}
                placeholder="*Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}
                placeholder="*Email"
              />,
            )}
          </Form.Item>
          {/*<Form.Item>*/}
            {/*{getFieldDecorator('organization')(*/}
              {/*<Input*/}
                {/*style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}*/}
                {/*placeholder="Organization"*/}
              {/*/>,*/}
            {/*)}*/}
          {/*</Form.Item>*/}
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
                { validator: this.validateToNextPassword },
              ],
            })(
              <Input
                type="password"
                placeholder="*Password"
                style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'Passwords do not match!' },
                { validator: this.compareToFirstPassword },
              ],
            })(
              <Input
                style={{ backgroundColor: '#303030', borderWidth: 0, color: 'white' }}
                type="password"
                placeholder="*Confirm Password"
                onBlur={this.handleConfirmBlur}
              />,
            )}
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
                    Create Account
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
  onAuth: (username, email, pw1, pw2) => dispatch(actions.authSignup(username, email, pw1, pw2)),
});

const WrappedRegistrationForm = Form.create({ name: 'register' })(NewAccountTextField);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedRegistrationForm));
