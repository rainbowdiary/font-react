import { reqGetRoles, reqAddRole, reqUpdateRole } from "../../api";
import { GET_ROLES_MESSAGE, ADD_ROLES_MESSAGE,UPDATE_ROLES_MESSAGE } from "../action-types"
//  获取角色
const getRoles = (roles) => ({ type: GET_ROLES_MESSAGE, data: roles })
export const getRolesAsync = () => {
  return dispatch => {
    return reqGetRoles()
      .then((response) => {
        dispatch(getRoles(response))
      })
  }
}
// 添加角色
const addRoles = (role) => ({ type: ADD_ROLES_MESSAGE, data: role })
export const addRolesAsync = (name) => {
  return dispatch => {
    return reqAddRole(name)
      .then((response) => {
        dispatch(addRoles(response))
      })
  }
}

// 修改角色
const updateRoles = (role) => ({ type: UPDATE_ROLES_MESSAGE, data: role })
export const updateRolesAsync = ({ roleId, authName, menus }) => {
  return dispatch => {
    return reqUpdateRole({ roleId, authName, menus })
      .then((response) => {
        dispatch(updateRoles(response))
      })
  }
} 