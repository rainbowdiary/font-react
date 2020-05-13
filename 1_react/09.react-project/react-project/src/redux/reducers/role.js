import { GET_ROLES_MESSAGE, ADD_ROLES_MESSAGE, UPDATE_ROLES_MESSAGE } from "../action-types"

const initValue = []
export default function roles(prevState = initValue, action) {
  switch (action.type) {
    case GET_ROLES_MESSAGE:
      return action.data
    case ADD_ROLES_MESSAGE:
      return [...prevState, action.data]
    case UPDATE_ROLES_MESSAGE:
      return prevState.map((role) => {
        if (role._id === action.data._id) {
          return action.data
        }
        return role
      }) // 更新之前的权限状态
    default:
      return prevState
  }
}