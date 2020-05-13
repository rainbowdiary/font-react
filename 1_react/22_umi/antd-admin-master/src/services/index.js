import request from 'utils/request'
import { apiPrefix } from 'utils/config'
/* 如果其中一个api: {removeUser: 'DELETE /user/:id',} */
import api from './api'

const gen = params => { //params='DELETE /user/:id'
  let url = apiPrefix + params //url='/api/v1/DELETE /user/:id' 
  let method = 'GET'

  const paramsArray = params.split(' ') // paramsArray=["/api/v1/DELETE", "/user/:id"]
  if (paramsArray.length === 2) {
    method = paramsArray[0] //method="/api/v1/DELETE"
    url = apiPrefix + paramsArray[1] // url=/api/v1/user/:id
  }

  return function (data) {
    console.log("services.js", url);
    return request({ //拿到request返回值
      url, //url=/api/v1/user/:id
      data, //传进来的
      method, //method="/api/v1/DELETE"
    })
  }
}

const APIFunction = {}
for (const key in api) { //api: {removeUser: 'DELETE /user/:id',}
  APIFunction[key] = gen(api[key]) // APIFunction.removeUser = gen('DELETE /user/:id')
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}
/*  APIFunction={
           queryRouteList:fn(data)
           removeUser: fn(data), 调用的时候传入data参数，返回响应的结果数据
           queryWeather:fn()
          }   
*/
export default APIFunction
