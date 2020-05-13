import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import dayjs from "dayjs";

import AddUserForm from "./add-user-form";
import UpdateUserForm from "./update-user-form";
import { reqGetUsers, reqaddUsers, reqdeleteUser } from "../../api";
import { getRolesAsync } from "../../redux/action-creator/role"
import { connect } from "react-redux"

@connect(state => ({ roles: state.roles }), { getRolesAsync })
class User extends Component {
  state = {
    users: [], //用户数组
    addUserModalVisible: false, //是否展示创建用户的标识
    updateUserModalVisible: false //是否展示更新用户的标识
  };
  componentDidMount() {
    this.getUsers()
  }
  getUsers = () => {
    // 请求用户数据信息
    reqGetUsers().then((users) => {
      this.setState({
        users
      })
      //1. 根据角色id获取角色名称
      // - 角色处显示的是id,所有角色在redux中,使用connet获取roles;
      // - 如果this.props.roles没有数据,就发请求获取数据
      if (!this.props.roles.length) {
        this.props.getRolesAsync();
      }
      message.success("获取用户数据成功")
    })
  }

  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "phone"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "所属角色",
      dataIndex: "roleId",
      render: (roleId) => {
        const role = this.props.roles.find((role) => role._id === roleId);
        return role && role.name //有返回role.name,第一次没找到没有就显示空
      }
    },
    {
      title: "操作",
      render: user => {
        return (
          <div>
            <Button type="link" onClick={this.showUpdate(user)}>
              修改
            </Button>
            <Button type="link" onClick={this.deleteUser(user)}> {/* 需要一个函数 */}

              删除
            </Button>
          </div>
        );
      }
    }
  ];

  // 创建用户的回调函数
  addUser = () => {
    // 发送请求添加数据
    const { props: { form: { validateFields, resetFields } } } = this.addUserForm;
    validateFields(async (err, values) => {
      if (!err) {
        // console.log(values); //{username: "wangwu", password: "1234", phone: "13554454589", email: "2286355825@qq.com", roleId: "5ddf5f24b179a649189260c0"}
        const { username, password, phone, email, roleId } = values;
        const user = await reqaddUsers({ username, password, phone, email, roleId })
        resetFields();
        this.setState({
          addUserModalVisible: false,
          users: [...this.state.users, user]
        })
        message.success(`${username}创建成功!`)
      }
    })
  };

  newUpdateUser = '';
  // 更新用户的回调函数
  showUpdate = (user) => {
    return () => {
      this.switchModal("updateUserModalVisible", true)(); //返回还是一个函数，所以需要调用两次
      this.newUpdateUser = user;
    }
  }
  updateUser = () => {
    this.setState({
      updateUserModalVisible: false
    })
  };

  // 删除用户的回调函数
  deleteUser = (user) => {
    return () => {
      Modal.confirm({
        title: `确认要删除${user.username}这个账号吗?`,
        // content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          // 发送请求删除用户
          await reqdeleteUser(user.username)
          // 更新用户状态数据
          this.setState({
            users: this.state.users.filter((account) => account.username !== user.username)
          })
          message.success(`${user.username}账号删除成功`);
        },
        // onCancel: () => {
        // },
      });
    }
  }
  componentDidUpdate() {
    // 用户数据列表展示
  }
  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      });
    };
  };

  render() {
    const { users, addUserModalVisible, updateUserModalVisible } = this.state;

    return (
      <Card
        title={
          < Button
            type="primary"
            onClick={this.switchModal("addUserModalVisible", true)}
          >
            创建用户
          </Button >
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            showQuickJumper: true
          }}
        />

        <Modal
          title="创建用户"
          visible={addUserModalVisible}
          onOk={this.addUser}
          onCancel={this.switchModal("addUserModalVisible", false)}
        >
          <AddUserForm
            wrappedComponentRef={form => (this.addUserForm = form)}
            roles={this.props.roles}
          />
        </Modal>

        <Modal
          title="更新用户"
          visible={updateUserModalVisible}
          onOk={this.updateUser}
          onCancel={this.switchModal("updateUserModalVisible", false)}
        >
          <UpdateUserForm
            wrappedComponentRef={form => (this.updateUserForm = form)}
            user={this.newUpdateUser}
          />
        </Modal>
      </Card >
    );
  }
}
export default User;
