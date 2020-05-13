/* 封装发送请求的request() */
import axios from "axios";
import { cloneDeep } from "lodash";
import pathToRegexp from "path-to-regexp";
import { message } from "antd";
import { CANCEL_REQUEST_MESSAGE } from "./constant";

const { CancelToken } = axios
window.cancelRequest = new Map()
/* 
request({url,method,data})
*/
export default function request(options) {
  let { data, url, method = "get" } = options;
  const cloneData = cloneDeep(data);
  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/) //match匹配正则
    if (urlMathc) {
      ;[domain] = urlMatch;
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url); //返回[]
    url = pathToRegexp.compile(url)(data) //将data转为url路径

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }

    url = domain + url;
  } catch (error) {
    message.error(e.message)
  }


  options.url = url;
  options.params = cloneData;
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel
    })
  })

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response;
      let result = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result
      })
    })
    .catch(error => {
      const { response, message } = error
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return { success: false }
      };
      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || "Network Error"
      }

      return Promise.reject({
        success: false,
        statusCode,
        message: msg
      })
    })
}