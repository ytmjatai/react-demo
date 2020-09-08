import React from 'react';

import { Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';



class Login extends React.Component {

  state = {
    checked: true
  }
  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  onCheckChange($event) {
    console.log($event);
    this.setState({
      checked: $event.target.checked
    })
  }
  render() {
    return (
      <div id="Login" className="h-100 d-flex align-items-center justify-content-center">
        <Card className="login-card" bordered={false} cover={<div className="p-4 bg-light"><h1>Jatai</h1></div>}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="ewsite-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="ewesite-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="d-flex">
              <Checkbox checked={this.state.checked} onChange={this.onCheckChange}>Remember me</Checkbox>
              <Button type="link"> Forgot password</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="d-block login-form-button">Login in </Button>
            </Form.Item>
            <Form.Item>
              <Button className="p-0" type="link">Register now!</Button>
            </Form.Item>
          </Form>
        </Card>

      </div>
    );
  }
};
export default Login;