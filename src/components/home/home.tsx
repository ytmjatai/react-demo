
import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import loadable from '@loadable/component'

import Header from '../header/header';
import Aside from '../aside/aside';
// const Header = loadable(() => import('../header/header'));
// const Aside = loadable(() => import('../aside/aside'));

const Module1 = loadable(() => import('../../modules/module1'));
const Module2 = loadable(() => import('../../modules/module2'));

class Home extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <Aside />
          <Layout className="border-left">
            <Layout.Content className="p-2 bg-white">
              <Switch>
                <Route path="/home/module1" component={Module1} />
                <Route path="/home/module2" component={Module2} />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>

    );
  }
}


export default Home;