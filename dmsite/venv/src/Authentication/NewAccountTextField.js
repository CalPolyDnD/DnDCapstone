/**
 * Created by christinadaley on 1/21/19.
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, Input, Select, AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class NewAccountTextField extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }

    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }

    handleWebsiteChange = (value) => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;

      const formItemLayout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      {/*const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>,
      );*/}

      {/*const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));*/}

      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />,
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />,
            )}
          </Form.Item>
          {/* <Form.Item
                    {...formItemLayout}
                    label='Captcha'
                    extra='We must make sure that your are a human.'
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(
                                <Input />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </Form.Item> */}
          {/* <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox><a href=''> I have read the agreement</a></Checkbox>
                    )}
                </Form.Item> */}
          {/*} <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>Create Account</Button>
                </Form.Item> */}
        </Form>
      );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(NewAccountTextField);

export default withRouter(WrappedRegistrationForm);
