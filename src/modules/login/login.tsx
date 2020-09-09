import React from 'react';

import { Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';



class Login extends React.Component {
  onLogin = (values) => {
    console.log('Received values of form: ', values);
  };

  render() {
    return (
      <div id="Login" className="h-100 d-flex align-items-center justify-content-center">
        <Card className="login-card" bordered={false} cover={<div className="py-5 px-4 bg-light"><h1>Jatai</h1></div>}>
          <Form initialValues={{ remember: true }} onFinish={this.onLogin}  >

            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]} >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}  >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div className="d-flex align-items-center justify-content-between">
                <Checkbox name="checked" defaultChecked={true}>Remember me</Checkbox>
                <Button className="p-0" type="link"> Forgot password</Button>
              </div>
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-100 login-form-button">Login in </Button>
            <Button className="my-4 p-0" type="text">Register now!</Button>

          </Form>
        </Card>
      </div>
    );
  }
};
export default Login;