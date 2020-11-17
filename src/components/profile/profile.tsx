import React from 'react';
import { Avatar, Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { SettingOutlined, UserOutlined, MoreOutlined, LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'

 class Profile extends React.Component {
  props: any;

  constructor(props) {
    super(props);
  }

  menus = () => (
    <Menu onClick={this.cl}>
      <Menu.Item className="py-2 pr-5" key="1" disabled icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item className="py-2 pr-5" key="2" disabled icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item className="py-2 pr-5" key="3" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  cl = ($event) => {
    console.log($event);
    console.log(this);
    this.props.history.push('/login');
  }

  componentDidMount() {
    console.log(this.props)

  }
  render() {
    return (
      <>
        <Dropdown overlay={this.menus}>
          <Button className="border-0" type="text" >
            <span className="mr-2">admin</span>
            <Avatar size="small" icon={<UserOutlined />} />
            <MoreOutlined className="ml-1 pt-1 align-middle" />
          </Button>
        </Dropdown>
      </>
    );
  }
}

export default withRouter(Profile);
interface IProfileProps {
  history?: any;
}