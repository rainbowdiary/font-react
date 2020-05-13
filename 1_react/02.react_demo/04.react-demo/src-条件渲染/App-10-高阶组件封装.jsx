import React, { Component } from "react";

/* 条件渲染 
  优化：封装高阶组件

  参考: https://juejin.im/post/5b3e34905188251b1f223ad3#heading-9
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

/* 高阶组件 */
/* function withEither(conditionalRenderingFn, EitherComponent) {
  return function buildNewComponent(Component) {
    return function FinalComponent(props) {
      return conditionalRenderingFn(props)
        ? <EitherComponent {...props} />
        : <Component {...props} />;
    }
  }
} */
const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent {...props} />
    : <Component {...props} />;

const isViewConditionFn = (props) => props.mode === 'view';
const withEditContionalRendering = withEither(isViewConditionFn, EditComponent);
const EditSaveWithConditionalRendering = withEditContionalRendering(SaveComponent);



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
    return (
      <div>
        <p>Text: {this.state.text}</p>
        <EditSaveWithConditionalRendering
          mode={this.state.mode}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          text={this.state.inputText}
        />
      </div >
    )
  }
}



