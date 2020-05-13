import React from "react";

/* 条件渲染 
  优化：避免空标签，而是返回null，性能会好些
*/
class Number extends React.Component {
  componentDidUpdate() {
    console.log('componentDidUpdate'); //不管render返回是不是null都会被触发
  }
  render() {
    if (this.props.number % 2 === 0) {
      return (
        <div>
          <h1>{this.props.number}</h1>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }

  onClick(e) {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <div>
        <Number number={this.state.count} />
        <button onClick={this.onClick.bind(this)}>Count</button>
      </div>
    )
  }
}

