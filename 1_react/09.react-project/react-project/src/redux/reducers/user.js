/**
定义函数,根据之前的值prevState和现在的值action,得到新的状态值
同时更新store中管理的状态数据
 */
import {
  GET_USERS_MESSAGE,
  REMOVE_USERS_MESSAGE,
} from '../action-types'
import {
  getItem
} from '../../utils/storage'
// redux中应该初试有用户数据.从localstorage中获取
const initUser = getItem("user") || {}
// const initUser = "user: {token: 1234}"
function user(prevState = initUser, action) {
  switch (action.type) {
    case REMOVE_USERS_MESSAGE:
      return {};
    case GET_USERS_MESSAGE:
      return action.data
    default:
      return prevState
  }
}

export default user;