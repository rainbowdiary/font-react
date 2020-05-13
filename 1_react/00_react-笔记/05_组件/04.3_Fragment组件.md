# Fragment
* 是什么?
  是react里面的一个组件
* 作用?
  用来充当根标签
  不会被浏览器渲染，可以替代render渲染的最外层div，达到优化目的



```
import React, { Fragment } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<Fragment>
      <h1>Fragment</h1>
      <p>hello</p>
    </Fragment>);
  }
}
  ```