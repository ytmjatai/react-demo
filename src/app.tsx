
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import loadable from '@loadable/component'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './app.scss';

const Login = loadable(() => import('./modules/login/login'));
const Home = loadable(() => import('./components/home/home'));

class App extends React.Component {
  render() {
    return (
      <>
        <ConfigProvider locale={zhCN}>
          <Router basename='library'>
            <Switch>
              <Redirect exact path="/" to="/login/" />
              <Route path="/login/" component={Login} />
              <Route path="/home/" component={Home} />
            </Switch>
          </Router>
        </ConfigProvider>
      </>
    );
  }
}

export default App;