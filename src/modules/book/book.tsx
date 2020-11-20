
import React from 'react';
import { Route, Switch } from "react-router-dom";
import loadable from '@loadable/component'



const List = loadable(() => import('./list'));

export default class Book extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/home/book/list" component={List} />
      </Switch>
    )
  }
}