/* 布局1 Login： 非登录状态，直接进入登录页面
   布局2 Logged： 已登录状态，拥有side，header，main区域划分布局
*/

import React, { Fragment } from "react"
export default (props) => {
  const { children, location, user } = props;
  let Container = ((getCookieToken() || user.token) && location.pathname.indexOf('/login') === -1) ? Logged : Login;

  return (
    <Fragment>
      <Container>{children}</Container>
    </Fragment>
  )
}