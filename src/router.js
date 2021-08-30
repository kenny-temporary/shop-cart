import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import ShopCard from './routes/ShopCard';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={ShopCard} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
