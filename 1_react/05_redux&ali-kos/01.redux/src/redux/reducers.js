import { INCREMENT, DECREMENT } from "./action-types";

function number(prevState = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return prevState + action.data
    case DECREMENT:
      return prevState - action.data
    default:
      return prevState
  }
}

export default number;