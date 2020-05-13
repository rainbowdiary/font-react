import React, { Component } from 'react'
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
// 引入国际化高阶组件
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { removeItem } from '../../../utils/storage.js';
import { removeUser } from "../../../redux/action-creator/user.js";
import menus from "../../../config/left-nav-menu.js";

import "./index.less";
@withRouter
@withTranslation()
@connect(state => ({ username: state.user.user.username }), { removeUser })
class HeaderMain extends Component {
  // 切换全屏显示
  state = {
    isFullScreen: false,
    isEnglish: this.props.language === "en" ? true : false,
    title: "",  //主题内容的标题
    date: ""
  }
  // 定义时间格式转换
  formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = this.getZero(date.getDate());
    const hour = this.getZero(date.getHours());
    const min = this.getZero(date.getMinutes());
    const second = this.getZero(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${min}:${second}`
  }
  getZero = (num) => {
    if (num < 10) {
      return `0${num}`
    } else {
      return num;
    }
  }
  // 退出登陆
  exit = () => {
    Modal.confirm({
      title: "您确定要退出吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        // 退出登陆，清除LocalStorage和redux数据，跳转到登陆页
        removeItem("user");
        this.props.removeUser();
        console.log('确定');
      },
      onCancel: () => {
        console.log('取消');
      },
    });
  }
  changeLang = () => {
    const { i18n } = this.props;
    this.setState({
      isEnglish: !this.state.isEnglish
    })
    i18n.changeLanguage(this.state.isEnglish ? "zh" : "en");
  };
  // 点击切换全屏
  fullScreen = () => {
    screenfull.toggle();
  }
  // 定义全屏回调函数
  changeScreenCall = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }
  componentDidMount() {
    // screenfull的change变化的时候就会监听，而不只是点击的时候，包括esc
    screenfull.on("change", this.changeScreenCall);
    //  设置时间
    this.timer = setInterval(() => {
      this.setState({
        date: this.formatDate(new Date())
      })
    }, 1000)
  }

  componentWillUnmount() {
    // 解绑全屏事件
    screenfull.on("change", this.changeScreenCall);
    clearInterval(this.timer);
  }

  static getDerivedStateFromProps(nextProps, preState) {
    // 根据路径的变化加载不同的title标题；不想this.setState更新title，只想location.pathname变化才更新title
    //获取当前路径
    const { pathname } = nextProps.location;
    if (pathname === preState.pathname) {
      return preState
    }
    let title = "";

    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find(cmenu => pathname.startsWith(cmenu.path))
        if (cMenu) {
          title = cMenu.title;
        }
      } else {
        if (menu.path === pathname) {
          title = menu.title;
        }
      }
    }

    return { //返回一个新状态
      pathname,
      title: "layout.leftNav." + title
    }
  }

  render() {
    const { t, username } = this.props
    const { isFullScreen, title, date } = this.state;

    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.fullScreen}><Icon type={isFullScreen ? "fullscreen-exit" : "fullscreen"} /></Button>
          <Button size="small" className="lang-btn" onClick={this.changeLang}>
            {this.state.isEnglish ? "中文" : "English"}
          </Button>
          <span className="hello-btn">hello,&nbsp;{username}</span>
          <Button type="link" size="small" onClick={this.exit}>退&nbsp;出</Button>
        </div>
        <div className="header-main-bottom">
          <h3 className="bottom-text">{t(title)}</h3>
          <span className="bottom-date">{date}</span>
        </div>
      </div>
    )
  }
}

export default HeaderMain