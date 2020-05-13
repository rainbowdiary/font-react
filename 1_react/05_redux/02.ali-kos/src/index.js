// import React from 'react';
// import ReactDOM from 'react-dom';
import KOS from "kos-core"
import App from './App';
import number from "./kos/model"

KOS.registeModel(number)
/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */
KOS.Provider(App)  //获取Provider包裹的高阶组件，并完成store的初始化等动作

KOS.start(App, "#root")

