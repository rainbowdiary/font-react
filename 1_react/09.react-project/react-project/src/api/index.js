//说明: 封装请求方法api的方法
import axiosInstance from './request';
// 登陆请求
export const reqLogin = (username, password) => axiosInstance({
  method: 'POST',
  url: '/login',
  data: {
    username,
    password
  }
})

// 获取商品分类
export const reqCategories = () => axiosInstance({
  method: 'GET',
  url: '/category/get',
})

// 添加商品分类
export const reqAddCategory = (categoryName) => axiosInstance({
  method: 'POST',
  url: '/category/add',
  data: {
    categoryName
  }
})

// 修改商品分类
export const reqUpdateCategory = (categoryId, categoryName) => axiosInstance({
  method: 'POST',
  url: '/category/update',
  data: {
    categoryId,
    categoryName
  }
})
// 删除商品分类
export const reqDeleteCategory = (categoryId) => axiosInstance({
  method: 'POST',
  url: '/category/delete',
  data: {
    categoryId
  }
})
// 请求获取单个商品数据
export const reqGetOneProduct = (productId) => axiosInstance({
  method: 'GET',
  url: '/product/get',
  params: {
    productId
  }
})

// 获取商品列表
export const reqGetProducts = (pageNum, pageSize) => axiosInstance({
  method: 'GET',
  url: '/product/list',
  params: {
    pageNum,
    pageSize
  }
})

// 添加商品
export const reqAddProduct = ({ categoryId, name, price, desc, detail }) => axiosInstance({
  method: 'POST',
  url: '/product/add',
  data: {
    categoryId, name, price, desc, detail
  }
})

// 搜索商品
export const reqSearchProduct = ({ searchType, searchName, pageNum, pageSize }) => axiosInstance({
  method: 'GET',
  url: '/product/search',
  params: {
    [searchType]: searchName, //productName: 'aaa'
    pageNum,
    pageSize,
  }
})

//  修改商品
export const reqUpdateProduct = ({ productId, categoryId, name, price, desc, detail }) => axiosInstance({
  method: "POST",
  url: "/product/update",
  data: {
    productId,
    categoryId,
    name,
    price,
    desc,
    detail
  }
})
console.log('redux-reqUpdateProduct', reqUpdateProduct);
//  删除商品
export const reqDeleteProduct = (productId) => axiosInstance({
  method: "POST",
  url: "/product/delete",
  data: {
    productId
  }
})

//  修改商品状态
export const reqUpdateProductStatus = (productId, status) => axiosInstance({
  method: "POST",
  url: "/product/update/status",
  data: {
    productId,
    status
  }
})
// 获取角色
export const reqGetRoles = () => axiosInstance({
  method: 'GET',
  url: '/role/get',
})

// 添加角色
export const reqAddRole = (name) => axiosInstance({
  method: 'POST',
  url: '/role/add',
  data: { name }
})
// 更新角色
export const reqUpdateRole = ({ roleId, authName, menus }) => axiosInstance({
  method: 'POST',
  url: '/role/update',
  data: { roleId, authName, menus }
})

// 获取用户
export const reqGetUsers = () => axiosInstance({
  method: 'GET',
  url: '/user/get',
})

// 添加用户
export const reqaddUsers = ({ username, password, phone, email, roleId }) => axiosInstance({
  method: 'POST',
  url: '/user/add',
  data: { username, password, phone, email, roleId }
})

// 删除用户
export const reqdeleteUser = (username) => axiosInstance({
  method: 'POST',
  url: '/user/delete',
  data: { username }
})
