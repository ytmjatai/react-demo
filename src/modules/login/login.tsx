import React from 'react';
import axios from 'axios';

import { Card, Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';

import enviroment from '../../../config/environment';

export default class Login extends React.Component {

  props: IloginProps;
  constructor(props) {
    super(props);
  }

  onLogin = async (form) => {
    const url = enviroment.authUrl + '/jwt/create/'
    axios.post(url, {
      username: form.username,
      password: form.password
    }).then(res => {

      const token = res.data.access;
      localStorage.setItem('token', token);
      this.props.history.push('/home/book/list');
    }).catch(error => {
      console.log(error);
      this.showError();
    });
  };

  showError() {
    Modal.error({
      title: (<h2 className="text-danger">Login fail</h2>),
      content: (
        <span className="text-danger">
          请输入正确的用户名和密码
        </span>
      ),
      icon: null,
      cancelText: null,
      centered: true
    });
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div id="Login" className="h-100 d-flex align-items-center justify-content-center">
        <Card className="login-card" bordered={false} cover={<div className="py-5 px-4 bg-light"><h1>图书管理系统</h1></div>}>
          <Form initialValues={{ remember: true }} onFinish={this.onLogin}  >

            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]} >
              <Input allowClear prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}  >
              <Input.Password allowClear prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div className="d-flex align-items-center justify-content-between">
                <Checkbox name="checked" defaultChecked={true}>记住帐号</Checkbox>
                <Button className="p-0" type="link"> 忘记密码</Button>
              </div>
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-100 login-form-button">登录 </Button>
            <Button className="my-4 p-0" type="link">注册</Button>

          </Form>
        </Card>
      </div>
    );
  }
};
interface IloginProps {
  history?: any[];
}