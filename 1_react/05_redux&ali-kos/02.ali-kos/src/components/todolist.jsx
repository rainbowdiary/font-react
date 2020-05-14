import React, { Component } from "react"
import KOS from "kos-core";
import model from "./lists";
class TodoList extends Component {
  state = {
    value: ''
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value.trim()
    })
  }
  handlekeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.dispatch({ type: 'lists/add', payload: this.state.value })
    }
  }
  render() {
    console.log([{ content: "hello111" }].map(item => item));
    let arr = this.props.lists
    return (
      <div>
        <input type="text" onKeyDown={this.handlekeyDown} onChange={this.handleChange} />
        <ul>
          {arr && arr.map((list, index) => {
            console.log(list);
            return (<li key={index}>
              {list.content}
              <button>删除</button>
              <button>修改</button>
            </li>)
          })}
        </ul>
      </div>
    )
  }
}

export default KOS.Wrapper({ model })(TodoList)
// export default TodoList