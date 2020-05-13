/*  
  根据prevState和action来生成newState的函数
*/
import {
  combineReducers
} from 'redux';
import {
  INCREMENT,
  DECREMENT
} from './action-types';

// reducers函数名称和要管理的状态数据名称一样
function number(prevState = 0, action) {
  console.log(prevState, action);

  switch (action.type) {
    case INCREMENT:
      return prevState + action.data;
    case DECREMENT:
      return prevState - action.data;
    default:
      return prevState;
  }
}

function user(prevState = 0, action) {

  switch (action.type) {
    default:
      return prevState;
  }
}

// 最终redux管理的状态数据：number
// export default number;

// 最终redux管理的状态数据：{ number, user }
export default combineReducers({
  number,
  user
})