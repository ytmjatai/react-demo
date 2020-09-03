
import React from 'react';
import './app.scss';
import { Button } from 'antd';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible theme="light" collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth="40" trigger={null}>
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" inlineIndent={12}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="sub1" icon={<UserOutlined />}>
              User
            </Menu.Item>
            <Menu.Item key="sub2" icon={<TeamOutlined />}>
              Team
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="p-3 border rounded-0 text-danger">danger</div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// const App = () => (
//   <Button type="primary">avcefe</Button>
// )

export default App;