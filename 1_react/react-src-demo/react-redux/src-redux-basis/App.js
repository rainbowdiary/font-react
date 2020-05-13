import React, { Component } from 'react'
import "./app.css";
import { increment, decrement } from "./redux/actions";
import store from "./redux/store"

export default class App extends Component {
  state = {
    value: 1
  }
  // 只能使用箭头函数，不然this会出问题
  increment = () => {
    // 使用action creators获取新的action对象
    const action = increment(this.state.value)
    store.dispatch(action);
  };

  decrement = () => {
    const action = decrement(this.state.value)
    store.dispatch(action)
  };
  handleChange = (event) => {
    this.setState({
      value: +event.target.value
    })
  };

  render() {
    const number = store.getState();
    console.log(number);

    return (
      <div className="app">
        <button onClick={this.increment}>+</button>
        <select onChange={this.handleChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button onClick={this.decrement}>-</button>
        <div>
          结果: {number}
        </div>
      </div>
    )
  }
}
