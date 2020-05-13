/* 封装发送请求的request() */
import axios from 'axios'
import { cloneDeep } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import qs from 'qs'

const { CancelToken } = axios //取消请求
window.cancelRequest = new Map()

export default function request(options) {//{url:/api/v1/user/:id,data,method:"/api/v1/DELETE"}
  let { data, url, method = 'get' } = options //url='/api/v1/user/:id'
  const cloneData = cloneDeep(data)
  // console.log("request.js", url);  url传进来的时候参数已经带进来了/api/v1/user/:id ==》 url:/api/v1/user/123
  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/) //匹配带了域名的url"http://baidu.com/api/v1/user/:id".match(/[a-zA-z]+:\/\/[^/]*/)

    if (urlMatch) { //如果url带了域名，去除域名，拿到不带域名的url
      ;[domain] = urlMatch
      url = url.slice(domain.length) //url=/api/v1/user/123
    }

    const match = pathToRegexp.parse(url) //parse返回一个路径数组["/api/v1/users/:id",{name:"id",}]

    url = pathToRegexp.compile(url)(data)  //转换参数为有效路径,将传入的data的参数给url转化为有效的路径

    /* 
   url = /api/v1/user:id/ data={id:123,a:"a"}
   match = {"/api/v1/user",{name:"id",prefix:"/",}} 
   删掉重复的id cloneData={a:"a"} 
    */
    for (const item of match) { //匹配url中带:id data中也有id， 则去掉data中的id
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    console.log('cloneData', url, cloneData);

    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  /* 将转换好的url，cloneData，整合到option对象 */

  options.url = url
  options.params = cloneData
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })


  return axios(options) //发送请求
    .then(response => {
      const { statusText, status, data } = response //请求响应回来的数据

      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText, //来自服务器响应的 HTTP 状态信息
        statusCode: status,
        ...result,
      })
    })
    .catch(error => {
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })

}
