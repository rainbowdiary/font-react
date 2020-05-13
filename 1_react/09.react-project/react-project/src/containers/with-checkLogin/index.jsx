import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
/**
 * 封装检测用户是否登录的高阶组件
 */
const withCheckLogin = WrappedComponent => {
  return connect(
    //组件内部使用connect获取redux数据
    state => ({ token: state.user.token }), //返回一个对象,state是redux中管理的数据;这样就可以使用this.props拿到token
    null
  )(
    class extends Component {
      static displayName = `CheckLogin(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;
      render() {
        /**
         * 登陆检测: 跳转地址,并清空redux中数据
         * 如果用户在/login
         * 用户登录过 去 /
         * 用户没有登陆过 不动
         *
         * 用户在非/login
         * 用户登录过 不动
         * 用户没有登陆过 去/login
         */
        // 获取用户所在地址;因为最后层包裹的是Route所以是路由组件,但是下一层将没有这个属性
        const { location, token, ...rest } = this.props;
        if (location.pathname === "/login") {
          // 判断用户是否登陆过,查看token,在redux中,使用connect获取
          if (token) {
            // 登陆过,跳转到 /,使用路由的重定向
            return <Redirect to="/" />;
          }
        } else {
          if (!token) {
            // 没登陆过,跳转到 /login,使用路由的重定向
            return <Redirect to="/login" />;
          }
        }
        return <WrappedComponent {...rest} location={location} />;
      }
    }
  );
};

export default withCheckLogin;
