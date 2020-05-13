# react-router #
库: history
模式:
  hash: 路径带#号, 会导致部分功能失效
  history: 正常路径, 兼容性不好

定义路由:
	一个路由定义一个组件

使用:
  - react-router-dom
  - BrowserRouter as Router 路由器
  - Route 路由 key:value 显示组件内容
  - Link to 添加浏览历史记录, 不会发送请求, 不会刷新页面
  - Navlink activeClassName 选中多一个active类名
  - Redirect from(从哪个路径来) to exact 默认匹配所有路径, 修改浏览器记录(配Switch使用)
  - Switch 配合Redirect, 切换显示
  - exact属性: 严格匹配, 加载二级路由需要去掉exact属性

##　路由组件属性
props属性:
	1.history(跳转相关方法)
    1). this.props.history.push("/"); //跳转页面
     上面有路由所有的跳转方法： 
        push replace go goBack goForward
    2). this.props.history.location = this.props.location
	2. location(当前路径信息)
     location.pathname  获取当前地址
     location: {pathname: "/chris", search: "", hash: "", state: undefined, key: "0x5xxa"}
	3. match(获取params属性)
     match:{path:"/:user",url:"/chris",isExact:true,params:{user:"chris"}}
     路由匹配： <Route path="/:user"/>
     url路径：http://localhost:3001/chris

## Switch中路由组件路径匹配顺序
1. 不管是模糊匹配还是exact匹配，只要匹配到第一条，就不会看下面的了，匹配的方法按照Switch中的先后顺序有关
2. Switch中
   1).可以接<Route>组件
   2).也可以接收其他非Route组件，只要匹配不上就会显示非Route组件

     ```
    <Router>
     <Switch>
      <Route path="" component={About}>
      <Other/>
    </Switch>
    </Router>
     ```
## 路由组件的高阶组件
import { Link, withRouter } from "react-router-dom";
@withRouter //子组件可以拿到路由组件的三大属性、给非路由组件传递路由组件的三大属性

## 路由组件之间通信 ##
	子路由获取:this.props.match.params
	路径  :id
	无障碍阅读属性:
    aria-current:可以播放文字

## 跳转页面的方法
  1. 使用路由组件的属性： this.props.history.push("/"); //跳转页面
  2. 实现点击页面跳转:<Link to="path">组件(react-router-dom)
  3. 在普通js文件中跳转 
    BrowserRouter上面有一个组件和一个history属性(查看BrowserRouter源码得到)
    ``` 源码:
      import { Router } from "react-router";
      import {createBrowserHistory} from 'history'
      const history = createBrowserHistory(); 将history作为属性传入到组件中
    ```
    
    * 封装history.js文件
    ```
    import {
        createBrowserHistory
    } from "history";
    export default createBrowserHistory();
    ```
    
    * 使用: 跳转登陆页 history.replace("/login");


### 案例nav
不同链接显示不同的组件
二级组件nav显示三级组件
1,2,3页面
### 案例router-juejin

路由配置文件
config/router.js为