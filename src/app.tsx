
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import Header from './components/header/header';
import Aside from './components/aside/aside';
import Module1 from './modules/module1';
import Module2 from './modules/module2';

import './app.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout>
            <Aside />
            <Layout className="border-left">
              <Layout.Content className="p-2 bg-white">
                <Switch>
                  <Route exact path="/module1">
                    <Module1 />
                  </Route>
                  <Route path="/module2">
                    <Module2 />
                  </Route>
                </Switch>
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>

    );
  }
}


export default App;