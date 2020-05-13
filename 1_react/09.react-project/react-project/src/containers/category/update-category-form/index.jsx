import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from "prop-types";

@Form.create()
class UpdateCategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  }
  // 自定义表单校验
  validator = (rule, value, callback) => {
    if (value === this.props.categoryName) {
      callback("与原商品名称一致，请修改商品名称");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form
    const { categoryName } = this.props
    return (
      <Form>
        <Form.Item label="修改分类">
          {
            getFieldDecorator("categoryName", {
              rules: [{ required: true, message: "请输入商品名称" }, { validator: this.validator }],
              initialValue: categoryName   //表单初始值
            },


            )(<Input
              placeholder="请输入商品名称"
            />)
          }
        </Form.Item>
      </Form>
    )
  }
}

export default UpdateCategoryForm
