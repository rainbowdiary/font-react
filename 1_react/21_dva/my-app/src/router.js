import React from 'react';
import { Router, Route, Switch } from 'dva/router';  //dva提供了路由功能
import IndexPage from './routes/IndexPage';
import WelcomeDialog from "./routes/FancyBorder/WelcomeDialog";
import BasicLayout from "./routes/layouts/BasicLayout"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/layout" exact component={BasicLayout} />
        <Route path="/index" exact component={IndexPage} />
        <Route path="/fancyborder" exact component={WelcomeDialog} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
