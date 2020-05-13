import {
  GET_USERS_MESSAGE,
  REMOVE_USERS_MESSAGE
} from "../action-types/index";
import {
  reqLogin
} from '../../api'

const getUser = user => {
  return {
    type: GET_USERS_MESSAGE,
    data: user
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USERS_MESSAGE,
  };
};
// 定义异步的action - creator, 使用异步的thunk
export const getUserAsync = (username, password) => {
  return dispatch => {
    // 进行异步操作,发送axios请求
    return reqLogin(username, password)
      .then((response) => {
        // 成功登陆,更新store数据,
        const action = getUser(response)
        // console.log("response:", response);
        dispatch(action)
        return response; //决定下面一个.then方法是否有数据
      }) //.catch(err=>{
    //   console.log(err);
    // })
  }
}