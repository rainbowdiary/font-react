import React, { Component } from "react";

/* 条件渲染 
  优化：避免一个函数中出现多个return，使用元素变量优化
       等同于返回null的方法
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

  renderInputField() { //专门做输入框显示与隐藏
    /* view模式，不显示input输入框，edit模式显示input输入框 */
    let input;
    if (this.state.mode !== "view") {
      return (<input onChange={this.handleChange} value={this.state.inputText}></input>)
    }
    return input;
  }
  renderButton() { //专门做按钮显示与隐藏
    let button;
    /* view模式下，显示Edit按钮， edit模式下显示Save按钮 */
    if (this.state.mode === "view") {
      button = (<button onClick={this.handleEdit}>Edit</button>)
    } else {
      button = (<button onClick={this.handleSave}>Save</button>)
    }
    return button
  }

  render() {
    return (
      <div>
        <p>Text: {this.state.text}</p>
        {this.renderInputField()}
        {this.renderButton()}
      </div>
    )
  }
}