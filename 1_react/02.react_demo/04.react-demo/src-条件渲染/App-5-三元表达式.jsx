import React, { Component } from "react";

/* 条件渲染 
  优化：三元表达式进行条件渲染，替代if/else
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
    const view = this.state.mode
    return (
      <div>
        <p>Text: {this.state.text}</p>
        {view === "view" ?
          (<button onClick={this.handleEdit}>Edit</button>)
          : (<p>
            <input onChange={this.handleChange} value={this.state.inputText} />
            <button onClick={this.handleSave}>Save</button>
          </p>)
        }
      </div>
    )
  }
}