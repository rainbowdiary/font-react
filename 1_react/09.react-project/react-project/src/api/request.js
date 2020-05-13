/***
@说明:
封装axios发送的请求:请求后端API接口,
发送API请求数据的时候使用
 */
import axios from "axios";
// 使用antd的错误提示
import {
  message
} from 'antd';
// 引入错误信息
import {
  errCodeMessage
} from '../config/errCodeMessage';
//  引入操作redux
import store from '../redux/store';
import {
  removeUser
} from '../redux/action-creator/user';
// 删除LocalStorage方法
import {
  removeItem
} from '../utils/storage'
//  引入获取路径的history方法
import history from '../utils/history';
// 创建axios实例,提供公共信息
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  headers: {
    // 公共请求头
  }
});
// 请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.method === "post") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      //将传过来的对象全部转换为urlencoded写法 //
      config.data = Object.keys(config.data)
        .reduce((p, c) => {
          let value = config.data[c];
          //但是如果数组拼穿就会转化toString,判断value是否为数组或者对象
          // 检测数据类型 
          const type = Object.prototype.toString.call(value).slice(8, -1)
          //如果值是对象或者数组,转成json格式传输 
          if (type === 'Array' || type === 'Object') {
            value = JSON.stringify(value)
          }
          return (p += `&${c}=${value}`);
        }, "")
        .substring(1); //username=admin&password=admin
    }
    // token  从redux中获取token
    const { user: { token } } = store.getState("user")
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
axiosInstance.interceptors.response.use(
  ({
    data
  }) => { //data从reponse中抽取出来
    // 响应成功
    if (data.status === 0) {
      return data.data; //决定下一个reqLogin的.then方法是否有数据
    } else {
      // 功能失败
      message.error(data.msg); //给用户提示
      return Promise.reject("网络错误");
    }
  },
  error => {
    // 响应失败
    let errorMessage = "";
    if (error.response) {
      errorMessage = errCodeMessage[error.response.status] || "位置错误";
      // 响应验证token失败,会返回401的错误码
      if (error.response.status === 401) {
        // 说明token有问题,清空LocalStorage和redux中的用户数据,
        removeItem("user");
        store.dispatch(removeUser());
        // 跳转登陆页
        history.replace("/login");
      }

    } else if (error.message.indexOf("Network Error") !== -1) {
      errorMessage = "请检查网络连接";
    } else if (error.message.indexOf("timeout") !== -1) {
      errorMessage = "网络太卡了，请连上wifi重试";
    }
    message.error(errorMessage); //给用户提示
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;