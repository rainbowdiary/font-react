
export default {

  namespace: 'example', //model的名称

  state: [],  //状态数据，不可变

  subscriptions: { //订阅一个数据源，然后根据条件 dispatch 需要的 action。 自于 elm
    setup({ dispatch, history }) {
    },
  },
  /* 
  call调用一个异步函数
  put dispatch action
  select
  take
  fork
  cancel
  effect触发规则:
    默认每次都触发(takeEvery)
    takeLatest 
    take自定义
   */
  effects: { //异步操作，也是通过reducer更新state,generator语法
    *fetch(state, { call, put }) {  // 接口两个参数action，{call,put} redux-saga语法
      yield put({ type: 'add' });   //generat语法，发出一个action，类似于dispatch
    },
    *addRemote({ payload: todo }, { call, put, select }) {
      const todos = yield select(state => state.todos) //全局的state，select提供获取全局state的能力；如果你有需要其他 model 的数据，则完全可以通过 state.modelName 来获取
      yield call(todos, todo);//用于调用异步逻辑
      yield put({ type: 'add', payload: todo }) // 用于触发 action 。这边需要注意的是，action 所调用的 reducer 或 effects 来源于本 model 那么在 type 中不需要声明命名空间，如果需要触发其他非本 model 的方法，则需要在 type 中声明命名空间，如 yield put({ type: 'namespace/fuc', payload: xxx });
    }
  },

  reducers: { //处理同步操作
    add(state, { payload: todo }) { //(state,action)根据老的state和传入的action，返回新的state
      return state.concat(todo);
    },
  },

};

/* 需要model和组件结合起来，
  组件才能使用model里定义的数据
  model才能接收组件里dispatch的action
  组件中使用connet方法传递过去
*/