import key from "keymaster";
export default {
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
  effects: { //组件dispatch可以是effects的action也可以是reducers
    *remove(action, { call, put }) {

      console.log(action);  //{type: "count/remove"}
      function delay(timeout) {  //模拟异步操作
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        })
      }

      yield call(delay, 1000)
      yield put({
        type: 'count/minus',
      })
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
}