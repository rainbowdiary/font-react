import React, { Component } from "react";

/* 条件渲染 
  优化：子组件化，将功能模块拆分为子组件，对子组件进行条件渲染，条理更清洗
*/
const SaveComponent = (props) => {
  return (
    <div>
      <input
        onChange={props.handleChange}
        value={props.text}
      />
      <button onClick={props.handleSave}>
        Save
      </button>
    </div>
  );
};
const EditComponent = (props) => {
  return (
    <button onClick={props.handleEdit}>
      Edit
    </button>
  );
};
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
        {view ? <EditComponent handleEdit={this.handleEdit} /> : <SaveComponent handleChange={this.handleChange} text={this.state.inputText} handleSave={this.handleSave} />}
      </div >
    )
  }
}