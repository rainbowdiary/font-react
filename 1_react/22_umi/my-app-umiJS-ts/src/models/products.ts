export default {
  namespace: "products",
  state: {
    products: [
      { name: "dva", id: "dva" },
      { name: "antd", id: "antd" }
    ]
  },
  reducers: {
    delete(state: any, { payload: id }) {
      return state.products.filter(item => item.id !== id)
    }
  }
}