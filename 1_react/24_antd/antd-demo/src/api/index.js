//说明: 封装请求方法api的方法
import axiosInstance from './request';
// 登陆请求
export const uploadFile = (chunk) => axiosInstance({
  method: 'POST',
  url: '/upload',
  data: {
    chunk
  }
})

