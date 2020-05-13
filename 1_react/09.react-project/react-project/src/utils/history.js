/**
BrowserRouter上面有一个组件和一个history属性
源码:
 import { Router } from "react-router";
 import {createBrowserHistory} from 'history'
 const history = createBrowserHistory(); 将history作为属性传入到组件中

查看BrowserRouter源码得到,获取history方法
 */
import {
    createBrowserHistory
} from "history";

export default createBrowserHistory();