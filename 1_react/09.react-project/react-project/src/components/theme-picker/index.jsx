import React, { Component } from 'react';
import { Icon, Drawer, Divider, Button } from "antd";
import { SketchPicker } from 'react-color';
import { setItem, getItem } from "../../utils/storage"

import "./index.less";

/**
改颜色: 
  不能直接改antd配置文件,配置文件在运行之前就已经设置了主题,运行中改了也没用
  可以创建style标签,我们的样式覆盖前面的
  方法:
  1. 创建style标签,
  2. 写入样式
  3. 插入页面中,放header标签中
 */

export default class ThemePicker extends Component {
  initColor = getItem("themeColor") || "#4d9f84"
  state = {
    visibleDrawerDrawer: false,
    background: this.initColor,
    preColor: this.initColor
  };

  // 为了提高性能，尽量避免DOM操作
  componentDidMount() {
    // 设置并判断标签
    this.styleEl = document.getElementById("color-picker");
    if (!this.styleEl) {
      this.styleEl = document.createElement("style");
      this.styleEl.id = "color-picker";
    }
    // 获取head标签
    this.headEl = document.querySelector("head");
    // 初始化主题色
    this.setColor()
  }
  showDrawer = () => {
    this.setState({
      visibleDrawer: true,
      background: this.state.preColor
    });
  };
  // 点击取消
  close = () => {
    this.setState({
      visibleDrawer: false,
      background: this.state.preColor
    });
  };

  // 颜色改变触发
  handleChangeComplete = (color) => {
    this.setState({
      background: color.hex,
    });
  };


  // 点击确认按钮 设置颜色
  setColor = () => {
    // 创建style标签
    const { background } = this.state;
    console.log("set", background);

    const style = `
    .ant-btn ant-btn-primary{
      background-color: ${background},
      border-color:${background}
    }
    .ant-btn ant-btn-primary{
      background-color: ${background},
      border-color:${background}
    }
    .theme-picker{
      background-color: ${background}
    }
    .ant-btn-link{
      color: ${background}
    }
    .ant-menu.ant-menu-dark .ant-menu-item-selected{
      background-color: ${background}
    }
    `
    // 样式写入元素中
    this.styleEl.innerHTML = style;
    // 添加到head中
    this.headEl.appendChild(this.styleEl);
    // 将抽屉隐藏
    this.setState({
      visibleDrawer: false,
      preColor: background
    })
    // 持久化存储设置后的颜色
    setItem("themeColor", background)
  }

  resetColor = () => {
    // 点击重置按钮 重置颜色
    setItem("themeColor", "#4d9f84");
    this.initColor = "#4d9f84";
    this.setState({
      background: "#4d9f84",
      preColor: "#4d9f84"
    })

    console.log("reset", this.state.background);

    this.setColor()
  }

  render() {
    return (
      <div>
        <div className="theme-picker" onClick={this.showDrawer}>
          <Icon type="setting" className="theme-picker-icon" />
        </div>
        <Drawer
          title="主题颜色选择"
          placement="right"
          closable={false}
          onClose={this.close}
          visible={this.state.visibleDrawer}
        >
          <SketchPicker
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete}
          />
          <Divider />
          <Button type="primary" className="ok-btn" onClick={this.setColor}>确认</Button>
          <Button type="primary" className="cancle-btn" onClick={this.close}>取消</Button>
          <Button type="primary" onClick={this.resetColor}>重置</Button>
        </Drawer>
      </div>
    )
  }
}
