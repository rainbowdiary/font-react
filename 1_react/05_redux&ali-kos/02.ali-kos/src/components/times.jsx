import React, { Component } from 'react';
import KOS from "kos-core";
import model from "../kos/model";
class Times extends Component {
  state = {
    value: 1,
    optionArr: [1, 2, 3]
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  handleIncrement = () => {
    this.props.dispatch({ type: 'number/increment', payload: this.state.value });
  }
  handleDecrement = () => {
    this.props.dispatch({ type: 'number/decrement', payload: this.state.value });
  }
  handleOddIncrement = () => {
    this.props.dispatch({ type: 'number/oddIncrement', payload: this.state.value });
  }
  handleAsync = () => {
    this.props.dispatch({ type: 'number/Loadlist', payload: this.state.value });
  }
  render() {
    return (
      <div>
        <p>click {this.props.number} times</p>
        <select onChange={this.handleChange}>
          {this.state.optionArr.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleOddIncrement}>increment if odd</button>
        <button onClick={this.handleAsync}>increment async</button>
      </div>
    )
  }
}
export default KOS.Wrapper({ model })(Times)
