import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

const About = () => <h2>About</h2>
const Company = () => <h2>Company</h2>
const Other = () => <h2>Other</h2>
const User = (props) => {
  console.log('props', props);
  const { match, location } = props;
  console.log(location.pathname);

  return (
    <div>
      <h2>User: {match.params.user}</h2>
    </div>
  )
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div style={{ width: '200px' }}>
            <ul>
              <li><Link to="/about">About Us (static)</Link></li>
              <li><Link to="/company">Company (static)</Link></li>
              <li><Link to="/kim">Kim (dynamic)</Link></li>
              <li><Link to="/chris">Chris (dynamic)</Link></li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/company" component={Company} />

              {/* 模糊匹配 */}
              <Route path="/:user" component={User} />

              {/* Switch里面可以接其他非路由组件 */}
              <Other />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
/* 版权声明：本文为CSDN博主「mapbar_front」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/mapbar_front/article/details/79660474 */