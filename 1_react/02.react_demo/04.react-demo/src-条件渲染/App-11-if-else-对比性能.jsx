import React from "react";

/* 条件渲染 
  优化：封装高阶组件

  参考: https://juejin.im/post/5b3e34905188251b1f223ad3#heading-9
*/


/* 使用 if/else 来控制 SubHeader 组件的显示/隐藏： */
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
    if (this.state.isToggleOn) {
      return (
        // 隐藏的时候:根标签div,p,button,都重新渲染 ,显示的时候:div, Subheader,p,button都重新渲染
        <div>
          <Header />
          <Subheader />
          <Content />
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Content />
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        </div>
      );
    }
  }
}



