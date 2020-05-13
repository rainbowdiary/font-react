# dva
dva = React-Router + Redux + Redux-saga（异步） + elm

# 没完成 ?
1. subscription没测试
2. umi和dva的结合
   
# 坑:
  model中的每个关键字都不可以写错，不然dva无法检测到

* 参考: 
  - Redux-saga & generator
  - effects使用到
  - https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
* 参考教程
  * https://juejin.im/entry/5879a63c1b69e600582da314

* connect作用 ? 
  - dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。
  - state数据也是一样，通过connect第一个参数mapStateToProps传给组件；
  - connect也将组件dispatch的action传给model
  
# dva数据怎么管理的? 
## 1. 设计model模型；
   1. namespace： 全局state用的key
      1. 组件使用dispatch({ type: '"namepace"/"add"' }) 
      2. 在本model中调用action是不用加namespace，如果加上甚至会抛出警告，跨model调用才要加上namespace区分
   2. state dva中初始化的数据
      1. 使用connect传递state为props/参数，展示dva中state数据
   3. subscriptions 订阅一个数据源，然后根据条件 dispatch 需要的 action。（自于 elm）
      ```
        import key from "keymaster";
        subscriptions: {  //订阅数据源，还没测试
        keyboardWatcher({ dispatch }) {
          key('⌘+up, ctrl+up', () => { dispatch({ type: 'count/add' }) });
        }
        },
      ```
   4. effects 处理异步任务，使用的generator语法，参考redux-saga提供了方法{call,put,select}
      1. (action,{call,put,select})
      2.  redux-saga提供的方法
          - call（阻塞）调用一个异步函数
          - put（不阻塞） dispatch action，用来触发reducer改变state
            - 可以使用载荷获取参数
            - 组件使用dispatch(action,载荷参数)传递
          - put.resolve（阻塞）功能和put一样，区别是put.resolve是阻塞的，执行完才会进入下一步
          - select（不阻塞）用来从state里获取数据
            ```const {args} = yield select(state=>state[namespace])```
          - take（阻塞）dva封装了take，监听action从开始和结束的阶段。take会阻塞到监听的事件触发，才执行下一步
          - fork
          - cancel
          - effect触发规则:
            - takeEvery: 默认每次都触发（不阻塞），启动一个新的action
            - takeLatest 
            - throttle（不阻塞）
            - watcher监听事件，不过只能执行一次
            - take自定义
      3. 使用
         1. 使用call处理需要处理的异步函数，yield暂停表达式返回一个promise
         2. 成功后，使用put dispatch一个同步的reducers中的action
         3. 这样才能使用effects处理异步任务
         4. 组件使用：使用connect传递state为props/参数，拿到state和dispatch
            1. dispatch action来改变数据
            2. 组件dispatch可以是effects的action也可以是reducers（优先看effects）
   5. reducers 处理同步任务
      1. (state,action)=>newState
      ```
      import key from "keymaster";
      app.model({
          namespace: 'count',  //全局state用的key
          state: {
            record: 0,
            current: 0  //当前的速度 
          },
          subscriptions: {  //订阅数据源，还没测试
            keyboardWatcher({ dispatch }) {
              key('⌘+up, ctrl+up', () => { dispatch({ type: 'count/add' }) });
            }
          },
          effect: { 
            *add(action, { call, put }) {
              yield call(delay, 1000)
              yield put({ type: 'minus' })
              function delay(timeout) {
                return new Promise(resolve => {
                  setTimeout(resolve, timeout);
                })
              }
            }
          },
          reducers: { //(state, action) => newState
            add(state) {
              const newCurrent = state.current + 1;
              return {
                ...state,
                record: newCurrent > state.record ? newCurrent : state.record,
                current: newCurrent
              }
            },
            minus(state) {
              return { ...state, current: state.current - 1 };
            }
          },
        })
      ```
  6. actions
     1. {type: "namespace"/sagas} //types规范为model定义的namespace和effects下定义的sagas或reducers
## 2. 组件
   1. dispatch一个action给model
   2. 使用connect方法连接model和组件
      1. 组件才能使用model里定义的数据
      2. model才能接收组件里dispatch的action
      3. 组件中使用connet方法传递过去
         1. dispatch一个action，action使用全局命名指定
         2. dispatch({ type: 'count/add' }) type为全局的model中state的命名名称
            1. count为model中namespace
            2. add为reducer中的方法名称
    ```
    const CountApp = ({ count, dispatch }) => {/可以使用dispatch一个action改变数据了
        <button onClick={() => { dispatch({ type: 'count/add' }) }}>+</button>
    /}
    function mapStateToProps(state, ownProps) {  //state=>props，注册了一个dispatch
      return { count: state.count }
    }
    export default connect(mapStateToProps)(CountApp);
    ```

# 路由怎么做到的?
app.router(require('路由组件路径').default);  将history等路由方法传递给组件当做参数

路由组件:
  ```
  import React from 'react';
  import { Router, Route, Switch } from 'dva/router';  //dva提供了路由功能
  import IndexPage from './routes/IndexPage';

  function RouterConfig({ history }) {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
        </Switch>
      </Router>
    );
  }

  export default RouterConfig;
  ```

## dva提供的方法
import { Router, Route, Switch } from 'dva/router'
import { connect } from 'dva'

# 渲染到根标签
app.start('#root');