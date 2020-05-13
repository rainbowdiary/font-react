import React, { Component } from "react";

/* 条件渲染 
  优化：三元表达式进行条件渲染
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
    const view = this.state.mode === "view"
    console.log(view);
    return (
      // 隐藏的时候：根标签div，button重新渲染了， 显示的时候：input，button重新渲染
      <div>
         <p>Text: {this.state.text}</p>  {/* p标签只是初始化渲染被渲染一次*/}
        {view ? null : <input onChange={this.handleChange} value={this.state.inputText} />}
        <button onClick={view ? this.handleEdit : this.handleSave}>{view ? 'Edit' : 'Save'}</button>
      </div>
    )
  }
}