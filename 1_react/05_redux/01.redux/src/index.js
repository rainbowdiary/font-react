import React from 'react';
import ReactDOM from 'react-dom';
import store from "./redux/store"
import { Provider } from "react-redux";
import App from './App';

// Provider组件给里面组件传递store对象
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));