
import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import loadable from '@loadable/component'

import Header from '../header/header';
import Aside from '../aside/aside';

const BookModule = loadable(() => import('../../modules/book/book'));
const CategoryModel = loadable(() => import('../../modules/category/category'))

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
                <Route path="/home/book" component={BookModule} />
                <Route path="/home/category" component={CategoryModel} />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>

    );
  }
}


export default Home;