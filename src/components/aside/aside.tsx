import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';

import rxSvc from '../../services/rx-event.service';
import './aside.scss';
import { Subscription } from 'rxjs/internal/Subscription';
import axios from '../../services/axios-interceptor';
import enviroment from '../../../config/environment';

export default class Aside extends React.Component<any, any> {

  toggle$: Subscription;
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menus: []
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle() {
    this.setState(state => ({
      collapsed: !state.collapsed
    }));

  }

  async componentDidMount() {
    this.toggle$ = rxSvc.on('toggle-aside').subscribe(
      _ => this.toggle()
    );

    const url = enviroment.apiUrl + '/menu/'
    axios.get(url).then((res:any) => {
      const menus = res.data;
      this.setState({
        menus: menus
      });
    }).catch(error => {
      console.error(error);
    })
  }

  componentWillUnmount() { this.toggle$.unsubscribe(); }

  render() {
    const buildIcon = (name) => React.createElement(Icon[name]);
    const items = this.state.menus.map((menu, idx) =>
      <Menu.Item key={idx} icon={menu.icon ? buildIcon(menu.icon) : ''}>
        <Link to={menu.url}>{menu.title}</Link>
      </Menu.Item>
    );
    return (
      <Layout.Sider
        collapsible theme="light" collapsed={this.state.collapsed}
        onCollapse={this.onCollapse} collapsedWidth="40" trigger={null}
      >
        <Menu
          className="border-right-0" theme="light"
          defaultSelectedKeys={['0']} mode="inline" inlineIndent={12}
        >
          {items}
        </Menu>
      </Layout.Sider>
    );
  }

};