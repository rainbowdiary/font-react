import React, { Component } from "react";

/* 条件渲染 
  优化：单独渲染input框和按钮
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
    if (this.state.mode === "view") {
      // return <div></div>   //渲染了空标签
      return null   //返回null比返回空标签性能会好。
    } else {
      return (<input onChange={this.handleChange} value={this.state.inputText}></input>)
    }
  }
  renderButton() { //专门做按钮显示与隐藏
    /* view模式下，显示Edit按钮， edit模式下显示Save按钮 */
    if (this.state.mode === "view") {
      return <button onClick={this.handleEdit}>Edit</button>
    } else {
      return <button onClick={this.handleSave}>Save</button>
    }
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