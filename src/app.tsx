
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import loadable from '@loadable/component'

import Header from './components/header/header';
import Aside from './components/aside/aside';
import './app.scss';

const Login = loadable(() => import('./modules/login/login'));
const Home = loadable(() => import('./components/home/home'));

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route  path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>

    );
  }
}


export default App;