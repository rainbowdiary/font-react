import React, { Component, Suspense } from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import BasicLayout from "./components/basic-layout"
import { noAuthRoutes } from "./config/routes.js"


/* 
不需要验证的路由，按照路径匹配
其他所有路径，包括需要验证的和不存在的路径，都显示<BasicLayout>组件
*/

export default class App extends Component {
  render() {
    return (<Suspense fallback={<div>Loading</div>}>
      <Router>
        <Switch>
          {noAuthRoutes.map((route, index) => {
            return <Route {...route} key={index} />
          })}
          <BasicLayout />
        </Switch>
      </Router>
    </Suspense>)
  }
}
