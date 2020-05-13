import React, { Component } from "react";
import A from "./a";
// 登陆检测,如果/home页没有token,跳转登陆页
// @withCheckLogin 统一在父组件中进行登陆检测
class Home extends Component {
  render() {
    return (
      <div>
        home..........
        <A>
          <p>hello home</p>
        </A>
      </div>
    );
  }
}

export default Home;
