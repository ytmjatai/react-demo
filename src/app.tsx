
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
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Module1 from './modules/module1';
import Module2 from './modules/module2';
import Header from './components/header/header';

const { Content, Sider } = Layout;



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
          <Header />
          <Layout>
            <Sider collapsible theme="light" collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth="40" trigger={null}>
          
              <Menu className="border-right-0" theme="light" defaultSelectedKeys={['1']} mode="inline" inlineIndent={12}>
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


            <Layout className="border-left">
              <Content className="p-2 bg-white">
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