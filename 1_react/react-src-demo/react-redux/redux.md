# 两个以上组件通信redux 
* redux是什么?
  - 是一个状态机

* redux作用:
  * 集中管理状态

* 组件使用redux
  - 读取redux中状态
  - 更新redux中状态

* 三大模块:
   ```
    action creators--------------------------->store--------------------------------->reducers
    作用:                           作用:
      用来创建action                   用来集中性的管理状态数据
      的工厂函数模式模块                身上有读取/更新状态的方法  
    {                               
      type: 状态名称  				            - store.getState()			                 根据prevState和action来生成newState
      data:更新的数据                     - store.dispatch(action)		             交给store对象管理
    }		                                 - store.subscribe(listener)	
             
                           组件:  store.subscribe(listener)	store更新状态数据
  ```
* 理解流程:
  - 见redux流程图

## redux流程理解
* 组件从redux中读取状态:
	调用action函数生成action
	store.getState()
  
* 组件从redux中更新数据
  1.  action-creators创建action函数
      - 用来创建action对象的工厂函数模块
        - 分为同步和异步:
          - 同步:返回action对象
          - 异步:返回一个函数
      ```
      action对象：
      {
        type: 操作类型,
        data: 操作数据
      }
      ```
  2. 定义store对象
      ```
        import { createStore } from 'redux';
        import reducer from "./reducer"；
        const store = createStore(reducer);
        export default store;
      ```
  3. 调用action creator创建新的state对象（组件）（组件）
  4. 调用store.dispatch(action)更新数据（组件）
  5. 自动调用reducers,reducer根据(preState,aciton)，生成newState并传入store（redux）
  6. store中数据自动更新（redux）
  7. 调用store.subscribe(()=>{})方法拿到store中的数据重新渲染数据到页面（组件）

* redux组件使用
  * 定义action-creators/store/reducers
  * 组件
    * 引入store，会默认调用reducer，reducer的返回值就是状态的初始值: reducer中的preState
      * 所以需要在reducer中做状态初始化，不然默认就是undefined
    * 引入action creators生成action对象，并传入新的状态数据
      * const action = actionFn(newStateVal) //返回action对象
    * 调用store.dispatch(action)触发更新 
        - （reducer会根据action中的状态数据生成新的newState给Store）
  * 调用sunscribe方法重新渲染组件
    * 在最外面的index.js定义的渲染组件的位置引入store对象
    ```
    store.subscribe(()=>{
      //一旦store对象状态发生改变,就会触发当前函数
      //触发当前函数,重新渲染组件
      ReactDOM.render(<App />,document.getElementById('root'))
    })
    ```

## 案例increment
1. 确定变化的数据是什么
	功能都是加或者减
	变化的值是number
2. 定义redux三个模块
	store.js
		createStore
	action-creators
	reducers.js
		switch-case
3. 组件:
	1. 一开始显示初始值
		1. 初始值默认是1,需要从redux中获取初始值
		2. 调用store.getState();返回被管理的状态值,switch default默认为preState的值,为undefined
		3. 给reducer中preState初始值1
	2. 点击+按钮的时候更新state值
		1. 获取下拉列表的数值(定义组件state.value)
		2. 点击的时候更新页面数据
			1. 获取redux-action对象
				1. 调用定义的action工厂函数获取
			2. store.dispatch(action)更新redux中的状态值
			3. 获取新的状态值,重新渲染更新页面
				store.subscribe(listener)  listener是一个回调函数; store状态改变,就会触发
				定义在index.js中,重新渲染
知识点:		
	组件调用store.getState();
		1. 默认调用reducer函数,返回初试值为preState
		2. 返回值为data,就是store对象管理的状态值
	更新store.dispatch(action): 
		1. 调用action生成对象
		2. 调用store.dispatch

奇数运算符:
	位运算:性能好一点
		& 1 ===1 :奇数
		& 1 ===0 :偶数
抽取出:
	action-types.js

任务:
	将之前的练习改成redux版本

### react-redux
传递一般数据和函数
count计数案例
1. index.js 引入
	 使用react-redux提供的Provider方法,传递store给子组件
     `import { Provider } from "react-redux";
		ReactDOM.render(
		  <Provider store={store}>
		    <App />
		  </Provider>,
		  document.getElementById("root")
		);`
2. App.jsx
	1. 引入connect方法
	 `import { connect } from "react-redux";`
	2. 写法1:将状态数据转换为props属性,
	 	定义两个方法:mapStateToProps/mapDispatchToProps
		// 遍历返回redux中初始值为属性,返回一个reducers初始值的对象(可能是多个reducers)
		// 使用:this.props.number;
		`const mapStateToProps = state => {
		  return {
		    number: state.number
		    // user: state.user
		  };
		};`
		// 遍历redux更新状态数据的方法为属性并更新数据,返回值是对象;参数为要修改的状态数据;调用的时候传入
		// 调用: this.props.increment(需要更新的值)
		`const mapDispatchToProps = dispatch => {
		  return {
		    increment: value => {
		      const action = increment(value);
		      dispatch(action);
		    },
		    decrement: value => {
		      const action = decrement(value);
		      dispatch(action);
		    }
		  };
		};`
	3.	调用connec方法,返回一个新的组件
		`export default connect(mapStateToProps, mapDispatchToProps)(App);`
3. 测试一样能正常访问

4. 写法2:封装了简单写法
	1. mapStateToProps, mapDispatchToProps定义的方法直接简化
	`export default connect(state => ({ number: state.number }), {
	  increment,
	  decrement
	})(App);`

reducer函数可以合并成一个暴露出去:
	使用redux方法:combineReducers
    `combineComponent返回一个对象
		export default combineReducers({
		  number,
		  user
		});`

缺点: 做不了异步操作
### 异步中间件
库:redux-thunk
作用: 在redux中使用异步操作
使用:
1. store.js中
	1. 引入
		import { createStore, applyMiddleware } from "redux";
		import thunk from "redux-thunk";
	2. 配置
		export store = createStore(reducer, applyMiddleware(thunk));
2. action-creator
	同步操作的aciotn,返回值是对象
	异步操作的action,返回值是函数 (中间件需要执行的)
	命名:
		同步incrementSync
		异步increment
	返回函数:
		函数中完成异步操作
		`// 异步操作的action-creator
		export const incrementAsync = data => {
		  return dispatch => {
		    setTimeout(() => {
		      // 在函数中完成异步操作,更新redux状态数据
		      // 获取action对象
		      const action = increment(data);
		      // 调用dispatch更新数据
		      dispatch(action);
		    }, 1000);
		  };
		};`
3. 通过容器组件传给UI组件
	异步操作,直接调用即可
	1. 引入
    `import { increment, decrement, incrementAsync } from "./redux/action-creator";`
	2. 通过容器组件传入
	`export default connect(
	  //mapStateToProps
	  state => ({ number: state.number }),
	  //mapDispatchToProps
	  {
	    increment,
	    decrement,
	    incrementAsync
	  }
	)(App);`
   3. 直接使用this.props.incrementAsync(value)调用异步操作

### redux调试工具(dev环境)
1. 下载谷歌扩展程序:redux-devtools
2. store.js代码加配置(代码构建会被打包进去加上环境判断)
	1. 下载库:yarn add --dev redux-devtools-extension
	2. 配置store.js
		`import { composeWithDevTools } from "redux-devtools-extension";
		let store;
		if (process.env.NODE_ENV === "development") {
		  store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
		} else {
		  store = createStore(reducer, applyMiddleware(thunk));
		}
		export default store;`
