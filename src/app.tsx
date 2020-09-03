
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";


import './app.scss';
import { Button } from 'antd';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Module1 from './modules/module1';
import Module2 from './modules/module2';

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
      <Router>


        <Layout style={{ minHeight: '100vh' }}>
          <Header className="p-2 h-auto border-bottom bg-light">

          <Button  icon={<MenuOutlined />} />

            <Breadcrumb>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
          </Header>

          <Layout>
            <Sider collapsible theme="light" collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth="40" trigger={null}>
              <div className="logo" />
              <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" inlineIndent={12}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <Link to="/module1">Module1</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  <Link to="/module2">Module2</Link>
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
              <Content className="p-2">
                <Switch>
                  <Route exact path="/module1">
                    <Module1 />
                  </Route>
                  <Route path="/module2">
                    <Module2 />
                  </Route>
                </Switch>
              </Content>
            </Layout>

          </Layout>
        </Layout>

      </Router>

    );
  }
}


export default App;