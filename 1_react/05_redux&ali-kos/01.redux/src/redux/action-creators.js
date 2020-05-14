import { INCREMENT, DECREMENT } from "./action-types"

export const increment = data => ({
  type: INCREMENT,
  data
})

export const decrement = data => ({
  type: DECREMENT,
  data
})

export const incrementAsync = data => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(data))
    }, 1000)
  }
}