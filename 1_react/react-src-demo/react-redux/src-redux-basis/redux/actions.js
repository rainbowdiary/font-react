import { INCREMENT, DECREMENT } from "./action-type";

export const increment = (data) => ({
  type: INCREMENT,
  data
})
export const decrement = (data) => ({
  type: DECREMENT,
  data
})