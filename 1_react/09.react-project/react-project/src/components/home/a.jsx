import React, { Component } from "react";

export default class A extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

/**
 * this.props.children的用法:
 * A组件显示Home组件中的内容
 * Home组件:
 *  1.引入A组件
 *  2.让A组件成为子组件
 *  3. 包裹需要显示的内容Home组件内容
 * A组件的this.props.children属性中将会继承到Home组件的内容
 */
