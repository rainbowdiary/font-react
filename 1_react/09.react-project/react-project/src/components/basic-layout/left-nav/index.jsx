import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/imgs/logo.png";
import "./index.less";
import menus from "../../../config/left-nav-menu";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// 引入国际化库
import { withTranslation } from 'react-i18next';
const { SubMenu } = Menu;
// 需求：给非路由组件传递路由组件的三大属性
// 解决：withRouter是一个高阶组件
@withTranslation()
@withRouter
@connect(state => ({ menus: state.user.user.menus }), null)

class LeftNav extends Component {

  createCmenus = menu => {
    const { t } = this.props;
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{t("layout.leftNav." + menu.title)}</span>
        </Link>
      </Menu.Item>
    );
  };
  createMenus = menus => {
    return menus.map(menu => {
      const { t } = this.props;
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type="user" />
                <span>{t("layout.leftNav." + menu.title)}</span>
              </span>
            }
          >
            {menu.children.map(cmenu => {
              return this.createCmenus(cmenu);
            })}
          </SubMenu>
        );
      } else {
        return this.createCmenus(menu);
      }
    });
  };
  // 获取当前子菜单父级菜单的key
  getOpenKeys = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        // 找到当前的菜单栏
        const cmenu = menu.children.find((cmenu) => { return cmenu.path === pathname })
        if (cmenu) {
          return menu.path;
        }
      }

    }
  }
  render() {

    let { pathname } = this.props.location;
    pathname = pathname.startsWith("/product") ? "/product" : pathname
    // menus: 解构赋值中：可以重命名属性
    const { collapsed, t, menus: authMenus } = this.props;

    // console.log(this.props.menus); //当前用户的权限 ["charts", "/charts/line", "/charts/bar", "/charts/pie"]
    // 在生成菜单之前，将没有权限访问的菜单项给过滤掉
    // - 判断menus中的菜单是否在authMenus中，在就显示，不在就过滤

    const filterMenus = menus.reduce((p, menu) => { //值和长度都有可能变用reduce方法过滤 
      // 判断权限菜单中是否包含当前菜单的path
      // 包含就要显示 / 不包含就要过滤掉
      if (authMenus.indexOf(menu.path) !== -1) {
        // 包含 说明子菜单全选了
        return [...p, menu]
      }
      // 不包含, 可能子菜单只选中一个，还要检查子菜单，
      if (menu.children) {
        // 子菜单只有一层，可以用filter方法
        const newMenu = { ...menu }; //为了不改变原数组
        newMenu.children = menu.children.filter((cMenu) => authMenus.indexOf(cMenu.path) !== -1)
        if (!newMenu.children.length) {
          return p;
        }
        return [...p, newMenu]
      }
      // 不包含
      return p;
    }, [])

    const fatherKey = this.getOpenKeys(filterMenus, pathname);
    // 重复调用
    const menuList = this.createMenus(filterMenus);
    return (
      <div>
        <div className="layout">
          <img src={logo} alt="logo" className="layout-logo" />
          <h3 className="layout-h2" style={{ display: collapsed ? "none" : "block" }}>{t("layout.leftNav.title")}</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[fatherKey]} mode="inline">
          {menuList}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;