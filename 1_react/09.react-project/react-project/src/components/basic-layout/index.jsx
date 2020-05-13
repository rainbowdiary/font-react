import React, { Component } from "react";
import { Layout } from "antd";
import LeftNav from "./left-nav";
import withCheckout from '../../containers/with-checkLogin';
import HeaderMain from './header-main';
import { authRoutes } from "../../config/route";
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux";
import ThemePicker from "../theme-picker";

const { Header, Content, Footer, Sider } = Layout;

// 在Layout父组件进行登陆检测，其下子组件无需全部添加
@withCheckout
@connect(state => ({ menus: state.user.user.menus }))
class BasicLayout extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    // 控制点击收缩菜单栏，展开为false
    const { collapsed } = this.state;
    const { menus } = this.props;
    const filterAuthRoutes = authRoutes.filter((authRoute) => {
      // return menus.indexOf(authRoute.path) !== -1 //值是否一样，需要一模一样，但是我们有product开头的多个文件，所以使用find过滤
      /* 解析：
      !authRoute.path 就是notFind组件，没有path属性（没有path，就是404，直接放回）
      menu => authRoute.path === menu 匹配全部相等的
      product开头的三个路由都是在一个页面
      */
      if (!authRoute.path) {
        return true
      } else if (menus.find(menu => authRoute.path === menu || menu.startsWith("product"))) {
        return true
      }
      return false
    })
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <LeftNav collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: "70px 16px 16px 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {/* {this.props.children} 即Switch中Route组件的内容 */}
              {/**让Route组件成为BasicLayout的子组件,BasicLayout菜单可以显示指定的组件,但是无法查看到组件内容 */}
              <Switch>  {/* 直接将Switch组件从App拿过来，在这里过滤路由*/}
                {/* 需要验证的路由组件放在Layout中显示 */}
                {filterAuthRoutes.map((route, index) => {
                  // return <Route path={item.path} component={item.component}></Route>;
                  return <Route {...route} key={index}></Route>;
                })}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
          <ThemePicker />
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
