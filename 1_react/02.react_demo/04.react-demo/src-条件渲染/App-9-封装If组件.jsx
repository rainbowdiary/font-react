import React, { Component } from "react";

/* 条件渲染 
  优化：子组件化的基础上封装<If condition then else>组件

  专门的库： jsx-control-statements
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
/* If组件 */
const If = (props) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;
  return condition ? positive : negative
}
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
    const editComponent = <EditComponent handleEdit={this.handleEdit} />;
    const saveComponent = <SaveComponent handleChange={this.handleChange} text={this.state.inputText} handleSave={this.handleSave} />
    return (
      <div>
        <p>Text: {this.state.text}</p>
        <If condition={view} then={editComponent} else={saveComponent} />
      </div >
    )
  }
}