export default {
  namespace: "lists",
  initial: {
    lists: [{ content: 'rainbow' }]
  },
  reducers: {
    add(state, action) {
      console.log('state,action', state, action);
      let payload = action.payload;
      const lists = state.lists.push({ content: payload })
      return { ...state, lists }
    }
  },
  asyncs: {

  }
}