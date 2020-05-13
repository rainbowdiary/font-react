import React, { Component } from "react";
// 引入antd的表单
import { Form, Icon, Input, Button } from "antd";
// 引入图片
import logo from "../../assets/imgs/logo.png";
// 引入样式文件
import "./index.less";
// 引入请求后台的API方法
import { connect } from "react-redux";
import { getUserAsync } from "../../redux/action-creator/user";
import { setItem } from '../../utils/storage';
// 引入登陆检测的高阶函数
import withCheckLogin from '../with-checkLogin'
const { Item } = Form;

// 高阶函数
@withCheckLogin
@Form.create() //antd高阶组件
@connect(null, { getUserAsync }) //react-redux高阶组件
class Login extends Component {
  // 输入框校验
  checkValidator = (rule, value, callback) => {
    // rule: {field: "password", fullField: "password", type: "string", validator: ƒ}
    // value:用户输入的内容
    // callback 不管校验成功还是失败 必须调用的函数: callback() 代表校验成功, callback('xxx') 代表校验失败
    const name = rule.field === "username" ? "用户名" : "密码";
    if (!value) {
      callback(`请输入${name}!`);
    } else if (value.length < 4) {
      callback(`${name}长度至少大于4位`);
    } else if (value.length > 15) {
      callback(`${name}长度必须小于15位`);
    } else if (!/\w/.test(value)) {
      callback(`${name}必须是英文字母数字或下划线`);
    } else {
      callback();
    }
  };
  // console.log(checkValidator);
  handleSubmit = e => {
    // 检验是否验证通过
    // 检验通过发送ajax请求
    // 出错处理
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const form = this.props.form;
      // err获取所有的错误,如果检验通过就是null
      // value 获取所有表单项的内容,为对象{username: "admin", password: "admin"}
      if (!err) {
        // 如果检验通过,发送ajax请求,使用封装的请求方法,传入用户名和密码
        const { username, password } = values;
        this.props
          .getUserAsync(username, password)
          .then(response => {
            // 验证成功,
            //设置本地存储用户数据
            setItem("user", response)
            //跳转页面
            this.props.history.push("/");

          })
          .catch(err => {
            form.resetFields(["password"]);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          {/* <div>234</div> */}
          <img src={logo} alt="暂无加载" />
          <h2>React项目: 后台管理系统</h2>
        </header>

        <section className="login-secion">
          <div className="login-container">
            <h3>用户登录</h3>
            <Form
              onSubmit={this.handleSubmit}
              className="login-form login-form"
            >
              <Item>
                {getFieldDecorator("username", {
                  rules: [{ validator: this.checkValidator }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Item>
              <Item>
                {getFieldDecorator("password", {
                  rules: [{ validator: this.checkValidator }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Item>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button login-btn"
                >
                  登陆
                </Button>
              </Item>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

export default Login; //使用高阶组件得到一个this.props.form属性
