export default {
  namespace: 'number',
  initial: {
    number: 0
  },
  reducers: { //  state:当前仓库内的数据， action：组件dispatch过来的数据==>newState
    increment(state, action) {
      const payload = +action.payload;
      const number = state.number + payload
      return { ...state, number }
    },
    decrement(state, action) {
      const payload = +action.payload;
      const number = state.number - payload
      return { ...state, number }
    },
    oddIncrement(state, action) {
      const payload = +action.payload;
      if (payload % 2 !== 0) {
        const number = state.number + payload
        return { ...state, number }
      }
      return { ...state }
    }
  },
  asyncs: {   //getState()获取仓库数据，action:组件传入的action ， dispatch(action)
    async Loadlist(dispatch, getState, action) {
      await setTimeout(() => {
        dispatch({ type: 'number/increment', payload: action.payload })
      }, 1000);
    }
  }
}