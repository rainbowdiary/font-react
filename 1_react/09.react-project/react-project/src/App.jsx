import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import BasicLayout from "./components/basic-layout";
/** BrowserRouter相当于
 import { Router } from "react-router";
 import {createBrowserHistory} from 'history'
 const history = createBrowserHistory(); 将history作为属性传入到组件中
 */
import { Router } from "react-router";
import history from "./utils/history";
// 引入根元素的样式
import "./index.less";
import { noAuthRoutes } from "./config/route";
// 入口文件引入国际化的i18n配置
import "./i18n";
import { Spin } from 'antd';

class App extends Component {
  render() {
    return (
      // Suspense用于懒加载：等待内部元素加载完才显示，没加载完就显示fallback的值
      <Suspense fallback={<Spin size="large" className="lazy-loading" />}>
        <Router history={history}>
          <Switch>
            {/* 不需要验证的Login路由组件放在Layout外面 */}
            {noAuthRoutes.map((route, index) => {
              return <Route {...route} key={index}></Route>;
            })}

            {/* Switch在BasicLayout组件中设置 */}
            <BasicLayout />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default App;
