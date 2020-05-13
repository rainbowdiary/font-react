import React, { Component } from "react";

/* 条件渲染 
  优化：立即执行函数
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
    const view = this.state.mode === "view";
    console.log(view);
    return (
      <div>
        <p>Text: {this.state.text}</p>
        {/* &&运算符进行条件渲染 */}
        {!view && (<input type="text" onChange={this.handleChange} value={this.state.inputText} />)}
        {/* 函数子调进行条件渲染 */}
        {
          (() => {
            const handle = view ? this.handleEdit : this.handleSave;
            const inner = view ? "Edit" : "Save"
            return <button onClick={handle}>{inner}</button>
          })()
        }
      </div >
    )
  }
}