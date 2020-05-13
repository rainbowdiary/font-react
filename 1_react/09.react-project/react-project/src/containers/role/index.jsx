import React, { Component } from "react";
import { Card, Button, Table, Radio, Modal, message } from "antd";
import dayjs from "dayjs"
import AddRoleForm from "./add-role-form";
import UpdateRoleForm from "./update-role-form";
import { connect } from "react-redux"
import { getRolesAsync, addRolesAsync, updateRolesAsync } from "../../redux/action-creator/role"
const RadioGroup = Radio.Group;

@connect(state => ({ roles: state.roles, username: state.user.user.username }), { getRolesAsync, addRolesAsync, updateRolesAsync })
class Role extends Component {
  state = {
    value: "", //单选的默认值，也就是选中的某个角色的id值
    roles: [], //权限数组
    addRoleModalVisible: false, //是否展示创建角色的标识
    updateRoleModalVisible: false, //是否展示设置角色的标识
    isDisabled: true
  };

  columns = [
    {
      dataIndex: "_id",
      render: id => <Radio value={id} />
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "授权时间",
      dataIndex: "authTime", //授权时间有可能是空
      render: time => time && dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRolesAsync()
    }
  }
  onRadioChange = e => {
    // console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  };

  switchModal = (key, value) => {
    return () => {
      this.setState({ [key]: value });
    };
  };

  //创建角色的回调函数
  addRole = () => {
    const { validateFields } = this.addRoleForm.props.form
    validateFields(async (err, values) => {
      if (!err) {
        console.log(values);  //{name: "cai zeng"}
        await this.props.addRolesAsync(values.name)
        this.setState({
          addRoleModalVisible: false
        })
        message.success("创建用户成功")
        console.log(this.state.addRoleModalVisible);

      }

    })
  };
  //设置角色权限的回调函数
  updateRole = () => {
    const form = this.updateRoleForm.props.form
    form.validateFields(async (err, values) => {
      if (!err) {
        const { menus } = values
        const roleId = this.state.value;
        const authName = this.props.username
        // 发送修改数据请求 需要{ roleId, authName, menus} 数据在redux中,所以走redux流程
        await this.props.updateRolesAsync({ roleId, authName, menus })
        this.setState({ updateRoleModalVisible: false })
        form.resetFields()
        message.success("更新权限成功")
        // console.log(menus); //["/category"] 发送的menus是数组

      }
    })
  };


  render() {
    const {
      value,
      isDisabled,
      addRoleModalVisible,
      updateRoleModalVisible
    } = this.state;

    const { roles } = this.props
    // value是当前列表的id值,获取选中的列表项
    const role = roles.find((role) => role._id === value);

    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchModal("addRoleModalVisible", true)}
            >
              创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={this.switchModal("updateRoleModalVisible", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <RadioGroup
          onChange={this.onRadioChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showQuickJumper: true
            }}
          />
        </RadioGroup>

        <Modal
          title="创建角色"
          visible={addRoleModalVisible}
          onOk={this.addRole}
          onCancel={this.switchModal("addRoleModalVisible", false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={updateRoleModalVisible}
          onOk={this.updateRole}
          onCancel={this.switchModal("updateRoleModalVisible", false)}
        >
          <UpdateRoleForm
            wrappedComponentRef={form => (this.updateRoleForm = form)}
            role={role}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
