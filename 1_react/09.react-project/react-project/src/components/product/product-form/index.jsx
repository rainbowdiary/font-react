import React, { Component } from 'react'
import { Card, Form, Input, Icon, Button, Select, message } from 'antd'
// 引入富文本编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { connect } from "react-redux";
import { getCategoriesAsync } from "../../../redux/action-creator/category";
import { reqAddProduct, reqUpdateProduct, reqGetOneProduct } from "../../../api"
import "./index.less";


@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync })

class ProductForm extends Component {
  state = {
    product: {}  //当前选中的商品信息
  }
  // 校验填写的信息
  validator = (rule, value, callback) => {
    console.log(value);
    if (!value || value.isEmpty()) {
      callback('请输入商品详情')
    } else {
      callback()
    }
  }

  componentDidMount() {
    const { categories, getCategoriesAsync } = this.props
    if (!categories.length) {
      getCategoriesAsync() //发送请求会触发redux更新
    }

    // 内存中没有父组件传递过来的商品信息
    if (!this.props.location.state) {
      // 发送请求获取当前商品信息
      reqGetOneProduct(this.props.match.params.id)
        .then((res) => {
          this.setState({
            product: res
          })
        })
    }
  }

  // 点击提交
  handleSubmit = (e) => {
    // 阻止默认事件
    e.preventDefault();
    // 获取验证后的数据
    const { form: { validateFields }, location: { state, pathname }, } = this.props;
    let content = "添加"
    validateFields(async (err, values) => {
      if (!err) {
        const { name, desc, categoryId, price, editorState } = values
        // 转换富文本编辑器数据为html格式
        const detail = editorState.toHTML() //<p>content</p>

        // 修改商品操作
        if (pathname.startsWith("/product/update")) {
          const productId = state ? state._id : this.state.product._id
          await reqUpdateProduct({ productId, categoryId, name, price, desc, detail })
          content = "更新"
        } else {
          // 添加商品操作
          await reqAddProduct({ name, desc, categoryId, price, detail })
        }

        // 请求成功后
        message.success(`${name}${content}商品成功~`);
        this.props.history.push("/product")
      }
    })
  }
  // 点击回退到商品列表
  goBack = () => {
    this.props.history.goBack("/product")
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { categories, location: { state, pathname } } = this.props //0(pin):{_id:'5dda77097bea542578db31fc…快餐',__v:0}
    // let isUpdateProduct = false; 全部修改为使用地址栏判断是否为修改操作
    let product = null;
    if (pathname.startsWith("/product/update")) {
      // 是修改操作
      // isUpdateProduct = true;  全部修改为使用地址栏判断是否为修改操作
      product = state || this.state.product;
    }
    return (
      <Card
        title={
          <div className="add-product" onClick={this.goBack}>
            <Icon type="arrow-left" />添加商品
          </div>
        }
        bordered
      >
        <Form
          labelCol={{ span: 2 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="商品名称"  >
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请输入商品名称!' }
              ],
              initialValue: product ? product.name : ''
            })(<Input placeholder="请输入商品名称!" style={{ width: 200 }} />)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              rules: [
                { required: true, message: '请输入商品描述!' }
              ],
              initialValue: product ? product.desc : ''
            })(<Input placeholder="请输入描述!" style={{ width: 200 }} />)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryId', {
              rules: [
                { required: true, message: '请输入商品分类!' }
              ],
              initialValue: product ? product.categoryId : ''
            })(<Select style={{ width: 200 }}>{
              categories.map((category) => {
                return <Select.Option key={category._id}>{category.name}</Select.Option>
              })
            }</Select>)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              rules: [
                { required: true, message: '请输入商品价格!' }
              ],
              initialValue: product ? product.price : ''
            })(<Input prefix="￥" suffix="RMB" style={{ width: 130 }} />)}
          </Form.Item >
          <Form.Item label="商品详情" wrapperCol={{ span: 22 }}>
            {getFieldDecorator('editorState', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: this.validator
              }],
              initialValue: product ? BraftEditor.createEditorState(product.detail) : ""
            })(
              <BraftEditor
                className="rich-text-editor"
                // controls={controls}
                placeholder="请输入商品详情"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card >
    )
  }
}

export default ProductForm