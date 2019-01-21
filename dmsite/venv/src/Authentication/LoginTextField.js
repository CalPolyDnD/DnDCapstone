/**
 * Created by christinadaley on 1/18/19.
 */

import React from "react";
import { render, ReactDOM } from "react-dom";
import { TransitionMotion, spring } from 'react-motion';
import { Component } from 'reactstrap';
import { withRouter } from "react-router-dom";
import {Checkbox, Form, Icon, Input, Button} from 'antd';

class TextField extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox> Remember me</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">Forgot password </a>

                    or <a href="/createaccount"> Create an account now!</a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(TextField);

/*ReactDOM.render(<WrappedNormalLoginForm />, mountNode);*/
export default withRouter(WrappedNormalLoginForm);
/*export default withRouter(TextField);*/
