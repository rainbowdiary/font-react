import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRolesAsync } from "../../../redux/action-creator/role"

const Item = Form.Item;
const Option = Select.Option;

@connect(state => ({ roles: state.roles }), { getRolesAsync })
@Form.create()
class UpdateUserForm extends Component {
  state = {
    role: {}
  }
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  componentDidMount() {
    const { roles, getRolesAsync, user } = this.props
    this.setState({
      role: roles.find((role) => role._id === user.roleId)
    })
    if (!roles.length) {
      getRolesAsync()
        .then((res) => {
          const role = res.find((role) => role._id === user._id)
          console.log(role);
        })
    }
  }
  render() {
    const { form: { getFieldDecorator }, user, roles } = this.props;
    // console.log(user._id); //获取到角色id，不是角色名，角色信息都在redux中
    // const { role } = this.state;

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="用户名">
          {getFieldDecorator("username", { initialValue: user.username })(
            <Input placeholder="请输入用户名" />
          )}
        </Item>
        <Item label="手机号">
          {getFieldDecorator("phone", { initialValue: user.phone })(
            <Input placeholder="请输入手机号" />
          )}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email", { initialValue: user.email })(
            <Input placeholder="请输入邮箱" />
          )}
        </Item>
        <Item label="角色">
          {getFieldDecorator("roleId")(
            <Select placeholder="请选择分类" >
              {roles.map((role) => {
                return <Option key={role._id} value={role._id}>{role.name}</Option>
              })}
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default UpdateUserForm;
