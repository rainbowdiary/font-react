import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menus from "../../../config/left-nav-menu"
const Item = Form.Item;
const { TreeNode } = Tree;

const treeData = [{
  title: "平台权限",
  key: "0",
  children: menus.map((menu) => {
    if (menu.children) {
      return {
        title: menu.title,
        key: menu.path,
        children: menu.children.map((cmenu) => ({ title: cmenu.title, key: cmenu.path }))
      }

    }
    return { title: menu.title, key: menu.path }
  })
}]


@Form.create()
class UpdateRoleForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  }
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: []
  };


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const { form: { getFieldDecorator }, role } = this.props;
    let { menus } = role //menu变成了字符串,发送请求是发送数组
    //经过请求拦截器处理,请求回来的是JSON字符串格式
    //["/user,charts,/charts/line,/charts/bar,/charts/pie"] ==>["0","/","production","/category","/product"
    // menus = JSON.parse(menus) || [] //服务端响应回来的数据是数组，无需处理了
    return (
      <Form>
        <Item label="角色名称">
          {getFieldDecorator("name", {
            initialValue: role.name
          })(<Input placeholder="请输入角色名称" disabled />)}
        </Item>
        <Item>
          {getFieldDecorator("menus", {
            trigger: "onCheck",  //收集子节点值的时机
            valuePropName: "checkedKeys", //收集子节点值的属性
            initialValue: menus
          })(<Tree
            checkable //前面有个复选框
            defaultExpandAll={true} //非受控
          >
            {this.renderTreeNodes(treeData)}
          </Tree>)
          }
        </Item>
      </Form>
    );
  }
}

export default UpdateRoleForm;
