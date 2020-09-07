import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { DesktopOutlined, UserOutlined, } from '@ant-design/icons';

import RxEventService from '../../services/rx-event.service';
import './aside.scss';

export default class Aside extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle() {
    if (this.state.collapsed) {
      this.setState({ collapsed: false })
    } else {
      this.setState({ collapsed: true })
    }
  }

  componentDidMount() {
    const rxSvc = RxEventService.getInstance();
    rxSvc.on('toggle-aside').subscribe(
      _ => this.toggle()
    );
  }

  render() {
    return (
      <Layout.Sider 
        collapsible theme="light" 
        collapsed={this.state.collapsed} 
        onCollapse={this.onCollapse} 
        collapsedWidth="40" 
        trigger={null}
      >
        <Menu 
          className="border-right-0" 
          theme="light" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          inlineIndent={12}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/module1">Module1</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/module2">Module2</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }

};