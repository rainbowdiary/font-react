import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store";

render();

store.subscribe(render) // 简写

// store.subscribe(() => {
//一旦store对象发生改变，就会触发回调函数，重新渲染组件  
//   render()
// })

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

