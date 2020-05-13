/**
 * LocalStorage
 * 当用户登录后刷新页面将用户信息存入localstorage
 */
// 设置localstorage
export function setItem(key, value) {
  //用户数据是对象类型,但是需要传入json类型数据
  value = JSON.stringify(value)
  window.localStorage.setItem(key, value)
}
// 获取
export function getItem(key) {
  // 获取到的是json字符串类型,需要转换成对象使用
  let value = window.localStorage.getItem(key)
  value = JSON.parse(value)
  return value;
}
// 获取
export function removeItem(key) {
  // 获取到的是json字符串类型,需要转换成对象使用
  window.localStorage.removeItem(key)
}