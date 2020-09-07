
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loadable from '@loadable/component'

import './app.scss';

const Login = loadable(() => import('./modules/login/login'));
const Home = loadable(() => import('./components/home/home'));

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>

    );
  }
}


export default App;