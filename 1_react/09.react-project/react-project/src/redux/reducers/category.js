/**
定义函数,根据之前的值prevState和现在的值action,得到新的状态值
同时更新store中管理的状态数据
 */
import {
  GET_CATEGORIES_MESSAGE, ADD_CATEGORY_MESSAGE, UPDATE_CATEGORY_MESSAGE, DELETE_CATEGORY_MESSAGE
} from '../action-types'
// redux中应该初试有用户数据.从localstorage中获取
const initUser = []
function categories(prevState = initUser, action) {
  switch (action.type) {
    case GET_CATEGORIES_MESSAGE:
      return action.data;
    case ADD_CATEGORY_MESSAGE:
      return [...prevState, action.data]    //在之前的基础上添加一条商品数据，不改变原数组
    case UPDATE_CATEGORY_MESSAGE:
      return prevState.map((category) => { //修改原来的数据，生成新的数组，按照唯一的_id属性来判断
        if (category._id === action.data._id) {
          return action.data
        }
        return category
      })
    case DELETE_CATEGORY_MESSAGE:
      return prevState.filter((category) => {
        console.log(action.data);
        return category._id !== action.data
      })
    default:
      return prevState
  }
}

export default categories;