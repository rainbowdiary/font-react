import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import { increment, decrement, incrementAsync } from "./redux/action-creators";
// import store from "./redux/store"

@connect(state => ({ number: state }), { increment, decrement, incrementAsync })
class App extends Component {
  state = {
    value: 1,
    optionArr: [1, 2, 3]
  }
  handleChange = e => {
    this.setState({
      value: +e.target.value
    })
    // console.log('setState之后', this.state.value);//获取到的是更新之前的值，因为这句会被先执行，而setState会被后执行，因为在合成事件中setState是异步的
  }
  handleIncrement = () => {
    // 点击+按钮更新store中的数据+value；store.dispatch(action);
    this.props.increment(this.state.value)
  }
  handleDecrement = () => {
    this.props.decrement(this.state.value)
  }
  handleOdd = () => {
    // 基数才加
    if (this.state.value % 2 !== 0) {
      this.props.increment(this.state.value)
    }
  }
  handleAsync = () => {
    this.props.incrementAsync(this.state.value)
  }
  render() {
    const number = this.props.number;
    return (
      <div>
        <div className='times'>click {number} times</div>
        <select className='select' onChange={this.handleChange}>
          {
            this.state.optionArr.map((item) => {
              return <option key={item} value={item}>{item}</option>
            })
          }
        </select>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleOdd}>increment if odd</button>{/* 是偶数就计算 */}
        <button onClick={this.handleAsync}>increment async</button>
      </div>
    );
  }
}

export default App