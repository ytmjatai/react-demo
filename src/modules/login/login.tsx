import React from 'react';

import { Card, Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';

export default class Login extends React.Component {

  props: IloginProps;
  constructor(props) {
    super(props);
  }

  onLogin = (form) => {
    if (form.username === 'admin' && form.password === '123456') {
      this.props.history.push('/home');
      return;
    };
    Modal.error({
      title: (<h2 className="text-danger">Login fail</h2>),
      content: (<span className="text-danger">Please check your username or password </span>),
      icon: null,
      cancelText: null,
      centered: true
    });
  };

  componentDidMount() {
    console.log(this.props)

  }

  render() {
    return (
      <div id="Login" className="h-100 d-flex align-items-center justify-content-center">
        <Card className="login-card" bordered={false} cover={<div className="py-5 px-4 bg-light"><h1>Jatai</h1></div>}>
          <Form initialValues={{ remember: true }} onFinish={this.onLogin}  >

            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]} >
              <Input allowClear prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}  >
              <Input.Password allowClear prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div className="d-flex align-items-center justify-content-between">
                <Checkbox name="checked" defaultChecked={true}>Remember me</Checkbox>
                <Button className="p-0" type="link"> Forgot password</Button>
              </div>
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-100 login-form-button">Login in </Button>
            <Button className="my-4 p-0" type="link">Register now!</Button>

          </Form>
        </Card>
      </div>
    );
  }
};
interface IloginProps {
  history?: any[];
}