import React from "react";

/* 条件渲染 
  优化：封装高阶组件

  参考: https://juejin.im/post/5b3e34905188251b1f223ad3#heading-9
*/


/* 使用 && 来控制 SubHeader 组件的显示/隐藏： */
const Header = (props) => {
  return <h1>Header</h1>;
}

const Subheader = (props) => {
  return <h2>Subheader</h2>;
}

const Content = (props) => {
  return <p>Content</p>;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      // 隐藏Subheader时根元素div和button被重新渲染，显示的时候直接添加元素，根标签没有渲染，h2和button渲染
        // content都没有被渲染，所以性能好些
      <div>
        <Header />
        {this.state.isToggleOn && <Subheader />}
        <Content />
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    );
  }
}




