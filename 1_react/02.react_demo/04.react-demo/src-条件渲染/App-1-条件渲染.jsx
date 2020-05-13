import React, { Component } from "react";

/* 条件渲染 if/else
   这种渲染并不是很好的实现方式，只适用于简单的案例
*/
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      inputText: "", //正在被标记的文本
      mode: " view" // edit、view模式
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleChange(e) {
    this.setState({ inputText: e.target.value })
  }
  handleSave() {
    this.setState({ text: this.state.inputText, mode: "view" })
  }
  handleEdit() {
    this.setState({ mode: "edit" })
  }

  render() {
    if (this.state.mode === "view") {
      return (
        <div>
          <p>Text:{this.state.text}</p>
          <button onClick={this.handleEdit}>Edit</button>
        </div>
      )
    } else {
      return (<div>
        <p>Text: {this.state.text}</p>
        <input onChange={this.handleChange} value={this.state.inputText} />
        <button onClick={this.handleSave}>Save</button>
      </div>)
    }
  }
}