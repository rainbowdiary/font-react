import React, { Component } from 'react';
import { Card, Icon, Descriptions } from "antd";
import { connect } from "react-redux";
import { getCategoriesAsync } from "../../../redux/action-creator/category";
import { reqGetOneProduct } from "../../../api";

@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class ProductDetail extends Component {
  state = {
    product: {} // 防止找不到报错
  }
  goBack = () => {
    this.props.history.goBack()
  }
  componentDidMount() {
    console.log(this.props.categories);

    const { categories, getCategoriesAsync } = this.props;
    // 如果redux中没有数据
    if (!categories.length) {
      getCategoriesAsync() //会更新redux中数据
    }

    // 防止再次输入url获取不到商品信息
    reqGetOneProduct(this.props.match.params.id)
      .then((res) => {
        this.setState({
          product: res
        })
      })
  }
  render() {
    const { location: { state }, categories } = this.props;
    const { desc, detail, status, name, price, categoryId } = state || this.state.product || {};
    console.log(state);
    // 商品分类，状态，详情需要修改
    // 商品分类数据在redux中  // 如果redux中有商品分类数据
    const category = categories.find((category) => category._id === categoryId);
    console.log('category-detail', category);
    const categoryName = category && category.name  //必须写与运算，第一次请求为空，请求后才有数据，不然一直报错
    return (
      <Card
        title={
          <div><Icon type="arrow-left" onClick={this.goBack} />&nbsp;&nbsp;商品详情</div>
        }
      >
        <Descriptions
          bordered
        // column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }} //设置一行列树（响应式）
        // span={3} 设置上一行，下一行才有效果
        >
          <Descriptions.Item label="商品名称">{name}</Descriptions.Item>
          <Descriptions.Item label="商品描述">{desc}</Descriptions.Item>
          <Descriptions.Item label="商品价格">￥{price}</Descriptions.Item>
          <Descriptions.Item label="商品分类">{categoryName}</Descriptions.Item>
          <Descriptions.Item label="商品状态" span={2}>{status === 1 ? "上架" : "下架"}</Descriptions.Item>
          <Descriptions.Item label="商品详情" >
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </Descriptions.Item>
        </Descriptions>

      </Card >
    )
  }
}

export default ProductDetail